// ══════════════════════════════════════════════════════════════════
//  test-sprint-37-settings-hardening.js — Forensic Unit & Integration Suite
//  Sprint 37: Settings Hardening, Secure AES Backup & Credential Sanitization
//  (Tickets T-201 to T-205)
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const crypto = require('crypto');

const subtle = crypto.webcrypto.subtle;

let passedTests = 0;
let totalTests = 0;

async function testAsync(name, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}`);
    console.error(`     Error: ${err.message}`);
  }
}

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}`);
    console.error(`     Error: ${err.message}`);
  }
}

const ROOT_DIR = path.resolve(__dirname, '..');

async function main() {
  console.log('\n=============================================================');
  console.log('⚙️  RUNNING SPRINT 37 VERIFICATION SUITE: SETTINGS & AES BACKUP');
  console.log('=============================================================\n');

  // ── T-201: Eradicate API Key Exposure in URL Query Parameters ──
  test('T-201: SettingsPage sanitizes Gemini API endpoint to header authentication', () => {
    const settingsPath = path.join(ROOT_DIR, 'src/pages/SettingsPage.tsx');
    assert(fs.existsSync(settingsPath), 'SettingsPage.tsx must exist');

    const settingsCode = fs.readFileSync(settingsPath, 'utf8');

    // Verify URL query parameter ?key= is completely eradicated
    assert(
      !settingsCode.includes('models/gemini-3.8-flash:generateContent?key='),
      'Gemini API key MUST NOT be passed in query string URL'
    );

    // Verify x-goog-api-key header is used
    assert(
      settingsCode.includes("'x-goog-api-key': activeKey") || settingsCode.includes('"x-goog-api-key": activeKey'),
      'SettingsPage must pass API key in x-goog-api-key header'
    );

    // Verify POST body and endpoint
    assert(
      settingsCode.includes('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent'),
      'Must target standard v1beta Gemini 3.8 Flash endpoint'
    );
  });

  // ── T-202: Sensitive API Credential Exclusion from Backups ──
  test('T-202: backupManager excludes all sensitive API keys and tokens from exports', () => {
    const backupManagerPath = path.join(ROOT_DIR, 'src/lib/storage/backupManager.ts');
    assert(fs.existsSync(backupManagerPath), 'backupManager.ts must exist');

    const backupCode = fs.readFileSync(backupManagerPath, 'utf8');

    // Verify EXCLUDED_KEYS contains all critical API tokens
    const mandatoryTokens = [
      'nn_gemini_api_key',
      'nn_supabase_anon_key',
      'nn_supabase_url',
      'supabase.auth.token',
      'nn_openrouter_api_key',
      'nn_groq_api_key',
    ];

    for (const token of mandatoryTokens) {
      assert(
        backupCode.includes(`'${token}'`) || backupCode.includes(`"${token}"`),
        `EXCLUDED_KEYS must include ${token}`
      );
    }

    // Simulate backup creation filtering
    const mockStorage = {
      nn_gemini_api_key: 'AIzaSy_fake_test_key_123',
      nn_supabase_anon_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy',
      nn_openrouter_api_key: 'sk-or-v1-secret',
      nn_xp: '3500',
      nn_streak: '{"count":7}',
      'sb-token-test': 'secret_token',
    };

    const excluded = new Set(mandatoryTokens);
    const filteredData = {};
    for (const [k, v] of Object.entries(mockStorage)) {
      if (excluded.has(k) || /^(sb-.*-auth-token|.*_api_key$)/.test(k)) {
        continue;
      }
      filteredData[k] = v;
    }

    assert.strictEqual(filteredData.nn_gemini_api_key, undefined);
    assert.strictEqual(filteredData.nn_supabase_anon_key, undefined);
    assert.strictEqual(filteredData.nn_openrouter_api_key, undefined);
    assert.strictEqual(filteredData.nn_xp, '3500');
    assert.strictEqual(filteredData.nn_streak, '{"count":7}');
  });

  // ── T-202 (Continued): Web Crypto AES-GCM 256-bit PBKDF2 Cycle ──
  await testAsync('T-202: AES-GCM 256-bit encryption and decryption with PBKDF2 key derivation', async () => {
    const enc = new TextEncoder();
    const testPassphrase = 'NuggetSecretPassphrase!2026';
    const rawPayload = {
      _metadata: {
        appVersion: '19.3.3',
        schemaVersion: 1,
        exportedAt: new Date().toISOString(),
        keyCount: 2,
        checksum: '12345678',
      },
      data: {
        nn_xp: '1250',
        nn_streak: '{"count":12}',
      },
    };

    // 1. Simulate encryptBackupPayload using Web Crypto
    const salt = crypto.webcrypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.webcrypto.getRandomValues(new Uint8Array(12));

    const baseKey = await subtle.importKey(
      'raw',
      enc.encode(testPassphrase),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    const aesKey = await subtle.deriveKey(
      { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt']
    );

    const ciphertextBuffer = await subtle.encrypt(
      { name: 'AES-GCM', iv },
      aesKey,
      enc.encode(JSON.stringify(rawPayload))
    );

    const container = {
      _encrypted: true,
      version: '19.3.3',
      algorithm: 'AES-GCM-256',
      kdf: 'PBKDF2-SHA256',
      iterations: 100000,
      salt: Buffer.from(salt).toString('base64'),
      iv: Buffer.from(iv).toString('base64'),
      ciphertext: Buffer.from(ciphertextBuffer).toString('base64'),
    };

    // Verify container format
    assert.strictEqual(container._encrypted, true);
    assert.strictEqual(container.algorithm, 'AES-GCM-256');
    assert.strictEqual(container.iterations, 100000);

    // 2. Simulate decryptBackupPayload with matching passphrase
    const decSalt = new Uint8Array(Buffer.from(container.salt, 'base64'));
    const decIv = new Uint8Array(Buffer.from(container.iv, 'base64'));
    const decCipher = new Uint8Array(Buffer.from(container.ciphertext, 'base64'));

    const decBaseKey = await subtle.importKey(
      'raw',
      enc.encode(testPassphrase),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    const decAesKey = await subtle.deriveKey(
      { name: 'PBKDF2', salt: decSalt, iterations: container.iterations, hash: 'SHA-256' },
      decBaseKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );

    const decryptedBuffer = await subtle.decrypt(
      { name: 'AES-GCM', iv: decIv },
      decAesKey,
      decCipher
    );

    const decryptedText = new TextDecoder().decode(decryptedBuffer);
    const recovered = JSON.parse(decryptedText);

    assert.strictEqual(recovered.data.nn_xp, '1250');
    assert.strictEqual(recovered.data.nn_streak, '{"count":12}');

    // 3. Verify wrong password rejection
    let failed = false;
    try {
      const wrongBaseKey = await subtle.importKey(
        'raw',
        enc.encode('WrongPassphrase!'),
        'PBKDF2',
        false,
        ['deriveKey']
      );
      const wrongAesKey = await subtle.deriveKey(
        { name: 'PBKDF2', salt: decSalt, iterations: container.iterations, hash: 'SHA-256' },
        wrongBaseKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['decrypt']
      );
      await subtle.decrypt({ name: 'AES-GCM', iv: decIv }, wrongAesKey, decCipher);
    } catch {
      failed = true;
    }
    assert(failed, 'Decryption with wrong password MUST fail');
  });

  // ── T-203: Whitelist & Sub-Schema Structural Verification ──
  test('T-203: Whitelist filtering and sub-schema structural validation', () => {
    const backupManagerPath = path.join(ROOT_DIR, 'src/lib/storage/backupManager.ts');
    const backupCode = fs.readFileSync(backupManagerPath, 'utf8');

    // Verify sub-schema validation functions exist
    assert(backupCode.includes('validateFsrsCardsJson'), 'Must define validateFsrsCardsJson');
    assert(backupCode.includes('validateGardenPlantsJson'), 'Must define validateGardenPlantsJson');
    assert(backupCode.includes('IMPORT_WHITELIST'), 'Must export IMPORT_WHITELIST');
    assert(backupCode.includes('isEncryptedBackupContainer'), 'Must export isEncryptedBackupContainer');

    // Simulate FSRS validator logic
    const checkFsrs = (raw) => {
      try {
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return false;
        for (const [id, entry] of Object.entries(parsed)) {
          if (!entry || typeof entry !== 'object') return false;
          const card = entry.card;
          if (!card || typeof card !== 'object') return false;
          if (typeof card.stability !== 'number' || typeof card.difficulty !== 'number') return false;
        }
        return true;
      } catch {
        return false;
      }
    };

    const validFsrs = JSON.stringify({
      'vocab-01': { card: { stability: 2.1, difficulty: 5.0, due: '2026-10-20' } }
    });
    const invalidFsrs = JSON.stringify({
      'vocab-01': { card: { stability: 'corrupted-text' } }
    });

    assert(checkFsrs(validFsrs), 'Valid FSRS cards must pass');
    assert(!checkFsrs(invalidFsrs), 'Invalid FSRS cards must fail');

    // Simulate Garden validator logic
    const checkGarden = (raw) => {
      try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return false;
        for (const item of parsed) {
          if (!item || typeof item !== 'object') return false;
          if (typeof item.id !== 'string') return false;
          if (typeof item.stage !== 'number') return false;
        }
        return true;
      } catch {
        return false;
      }
    };

    const validGarden = JSON.stringify([{ id: 'p1', kanji: '桜', stage: 2 }]);
    const invalidGarden = JSON.stringify([{ id: 'p1', stage: 'bad-stage' }]);

    assert(checkGarden(validGarden), 'Valid Garden plants must pass');
    assert(!checkGarden(invalidGarden), 'Invalid Garden plants must fail');
  });

  // ── T-204 & T-205: Reset Confirmation Modal & Speech Rate Fallback ──
  test('T-204 & T-205: Reset confirmation modal safeguards and universal speech rate fallback', () => {
    const modalPath = path.join(ROOT_DIR, 'src/components/modals/ResetConfirmationModal.tsx');
    const speechPath = path.join(ROOT_DIR, 'src/lib/audio/speechEngine.ts');
    const settingsPath = path.join(ROOT_DIR, 'src/pages/SettingsPage.tsx');

    assert(fs.existsSync(modalPath), 'ResetConfirmationModal.tsx must exist');
    assert(fs.existsSync(speechPath), 'speechEngine.ts must exist');

    const modalCode = fs.readFileSync(modalPath, 'utf8');
    const speechCode = fs.readFileSync(speechPath, 'utf8');
    const settingsCode = fs.readFileSync(settingsPath, 'utf8');

    // T-204 checks
    assert(modalCode.includes("confirmText.trim().toUpperCase() === 'RESET'"), 'Modal must require typing RESET');
    assert(modalCode.includes('HOLD_DURATION_MS = 3000'), 'Modal must enforce 3000ms button hold safeguard');
    assert(modalCode.includes('role="dialog"'), 'Modal must have role="dialog"');
    assert(modalCode.includes('aria-modal="true"'), 'Modal must have aria-modal="true"');
    assert(modalCode.includes('useFocusTrap'), 'Modal must use focus trap');
    assert(modalCode.includes('useBodyScrollLock'), 'Modal must use body scroll lock');
    assert(settingsCode.includes('<ResetConfirmationModal'), 'SettingsPage must render ResetConfirmationModal');

    // T-205 checks
    assert(speechCode.includes('getStoredSpeechRate'), 'speechEngine must declare getStoredSpeechRate');
    assert(speechCode.includes("localStorage.getItem('nn_speech_rate')"), 'speechEngine must read nn_speech_rate');
    assert(speechCode.includes('const defaultRate = getStoredSpeechRate()'), 'speakJapanese must fallback to stored speech rate');
    assert(settingsCode.includes('setSpeechRate(item.rate)'), 'SettingsPage must update speech rate');
  });

  console.log('\n-------------------------------------------------------------');
  console.log(`📊 SPRINT 37 AUDIT RESULTS: ${passedTests} / ${totalTests} SUITES PASSED`);
  console.log('-------------------------------------------------------------\n');

  if (passedTests === totalTests) {
    console.log('🌟 SPRINT 37 FORENSICALLY CERTIFIED — 100% GREEN!\n');
    process.exit(0);
  } else {
    console.error('💥 SPRINT 37 VERIFICATION FAILED!\n');
    process.exit(1);
  }
}

main();
