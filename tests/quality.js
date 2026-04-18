#!/usr/bin/env node
// ══════════════════════════════════════════════════════════════════════════
// Nugget Nihongo — Quality Checker v3  (tests/quality.js)
// Run:  node tests/quality.js
//   --new-only   Only check v15 entries (skip legacy N5/N4 debt)
//   --legacy     Show full legacy issue list (default: summary line)
//   --errors-only Suppress WARN/INFO
//   --json       Machine-readable JSON
//
// Tiers:
//   CRIT   App-breaking data
//   ERROR  v15 schema violation — blocks merge
//   LEGACY Pre-v15 debt — separate migration task
//   WARN   Content quality — review queue
//   INFO   Coverage / distribution
//
// Exit: 0=clean, 1=CRIT/ERROR found
// ══════════════════════════════════════════════════════════════════════════
'use strict';
const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..');
const NEW_ONLY=process.argv.includes('--new-only');
const ERRORS_ONLY=process.argv.includes('--errors-only');
const SHOW_LEGACY=process.argv.includes('--legacy');
const JSON_OUTPUT=process.argv.includes('--json');

const crits=[],errors=[],legacy=[],warns=[],infos=[];
function crit(c,id,m){crits.push({code:c,id,msg:m});}
function err(c,id,m){errors.push({code:c,id,msg:m});}
function leg(c,id,m){legacy.push({code:c,id,msg:m});}
function warn(c,id,m){warns.push({code:c,id,msg:m});}
function info(c,m){infos.push({code:c,msg:m});}

global.window=global;
function loadFile(p){
  const f=path.join(ROOT,'public',p);
  if(!fs.existsSync(f))return false;
  try{eval(fs.readFileSync(f,'utf8'));return true;}
  catch(e){crit('LOAD_FAIL',p,`${e.message.split('\n')[0]}`);return false;}
}

const VOCAB_FILES=[
  ['data/vocab/vocab-n5.js','vocabN5','n5','vg-n5-'],
  ['data/vocab/vocab-n4.js','vocabN4','n4','vg-n4-'],
  ['data/vocab/vocab-n3.js','vocabN3','n3','vg-n3-'],
  ['data/vocab/vocab-n2.js','vocabN2','n2','vg-n2-'],
  ['data/vocab/vocab-n1.js','vocabN1','n1','vg-n1-'],
];
const GRAMMAR_FILES=[
  ['data/grammar/grammar-n5.js','grammarN5','n5','gn5-'],
  ['data/grammar/grammar-n4.js','grammarN4','n4','gn4-'],
  ['data/grammar/grammar-n3.js','grammarN3','n3','gn3-'],
  ['data/grammar/grammar-n2.js','grammarN2','n2','gn2-'],
  ['data/grammar/grammar-n1.js','grammarN1','n1','gn1-'],
];
for(const[f]of[...VOCAB_FILES,...GRAMMAR_FILES])loadFile(f);

const VALID_POS=new Set(['verb-ru','verb-u','verb-suru','verb-kuru','verb-aru','verb-irr','verb-potential-lexical','i-adj','na-adj','no-adj','pre-noun-adj','noun','noun-suru','noun-temporal','noun-formal','pronoun','counter','numeral','proper-noun','adverb-degree','adverb-frequency','adverb-manner','adverb-conjunctive','adverb-sentence','particle-case','particle-topic','particle-conj','particle-final','particle-compound','conj-coord','conj-adversative','conj-causal','conj-temporal','expr-greeting','expr-set','expr-onomatopoeia','interjection','suffix-honorific','suffix-nominal','prefix-honorific']);
const VALID_CAT=new Set(['copula','existence','predicate-adjective','te-form-use','negative','past-tense','progressive-state','potential','passive','causative','volitional-intention','permission-prohibition','obligation-necessity','desire-want','conjecture-possibility','hearsay-report','conditional-to','conditional-ba','conditional-tara','conditional-nara','reason-cause','contrast-concession','purpose','sequential-temporal','listing-addition','limitation-only','extent-degree','comparison','nominalization','quotation-thought','relative-clause','completion-regret','inception-continuation','directional-aspect','sonkeigo-pattern','kenjougo-pattern','teineigo-pattern','sentence-final-modality','sentence-final-request']);
const VALID_DOMAIN=new Set(['kehidupan-sehari','keluarga','pertemanan','percintaan','pendidikan','pekerjaan','bisnis','perjalanan','belanja','kesehatan','makanan-minuman','olahraga','hiburan','teknologi','alam-lingkungan','budaya','bahasa-komunikasi','emosi','emosi-positif','emosi-negatif','emosi-sosial','pikiran-opini','keputusan','karakter','waktu','ruang-arah','kuantitas','kualitas','perubahan','hubungan-konsep','sebab-akibat','sopan-santun','keigo-vocabulary','hukum-aturan','politik-masyarakat','ekonomi-keuangan','ilmu-pengetahuan','seni-budaya','sastra','media','umum','onomatope','konsep-jepang','klasik']);
const VALID_REGISTER=new Set(['formal','neutral','casual','written','spoken','literary',null,undefined]);
const VALID_CONJ=new Set(['godan','ichidan','suru','kuru','adj-i','adj-na',null,undefined]);
const POS_CONJ={'verb-ru':'ichidan','verb-u':'godan','verb-suru':'suru','verb-kuru':'kuru','i-adj':'adj-i','na-adj':'adj-na'};
const NUANCE_MARKERS=['berbeda','dibanding','sering','tidak','lebih','hanya','konteks','formal','kasual','transitif','intransitif','pasangan','konotasi','beda','umumnya','biasanya','khusus','hindari','jangan','walaupun','meskipun','sedangkan','lawan','kebalikan','sinonim','berlawanan','dibandingkan','cenderung','digunakan','cocok','hati-hati','bukan','tidak bisa','tidak dipakai','catatan','perlu'];
const ENGLISH_LEAK=[/\bthe\b/i,/\bto\b/i,/\bof\b/i,/\band\b/i,/\bor\b/i,/\bis\b/i,/\bare\b/i,/\bwas\b/i,/\bwere\b/i,/\bhave\b/i,/\bhas\b/i,/\bwith\b/i,/\bfor\b/i,/\bthat\b/i,/\bthis\b/i,/\bfrom\b/i,/\bcan\b/i,/\bwill\b/i,/\bnot\b/i];
const CJK=/[\u3000-\u9fff\uf900-\ufaff\u3400-\u4dbf]/;
const HIRA=/[\u3041-\u3096]/;
const KATA=/[\u30a1-\u30f6]/;
const KANJI=/[\u4e00-\u9fff\u3400-\u4dbf]/;
const LATIN=/^[a-z\u00c0-\u024f\s\-'.,~:;!?()\[\]0-9\/]+$/i;

// Indexes
const vocabById=new Map(),grammarById=new Map();
for(const[,v]of VOCAB_FILES)for(const e of(global[v]||[]))if(e&&e.id)vocabById.set(e.id,e);
for(const[,v]of GRAMMAR_FILES)for(const e of(global[v]||[]))if(e&&e.id)grammarById.set(e.id,e);

const wordLevelMap=new Map(),patternLevelMap=new Map(),nuanceSeen=new Map(),exJpSeen=new Map(),meaningIdSeen=new Map();
const lStats={};
for(const lv of['n5','n4','n3','n2','n1'])lStats[lv]={v:{total:0,f2:0,umum:0,rge:0},g:{total:0,cpe:0,sve:0}};

const seenVocabIds=new Set();
// ── VOCAB PASS ────────────────────────────────────────────────────────────
for(const[,varName,level,prefix]of VOCAB_FILES){
  const entries=global[varName]||[];
  const nums=[];
  for(const e of entries){
    if(!e||typeof e!=='object')continue;
    const isLeg=!e.added_v||e.added_v!=='v15';
    if(NEW_ONLY&&isLeg)continue;
    const id=String(e.id||'');
    if(!id){crit('MISSING_ID',varName,'Entry missing id');continue;}
    if(!id.startsWith(prefix)||!/^\d{5}$/.test(id.slice(prefix.length)))crit('BAD_ID_FORMAT',id,`Expected ${prefix}XXXXX`);
    if(seenVocabIds.has(id))crit('DUP_VOCAB_ID',id,'Duplicate vocab ID');
    seenVocabIds.add(id);
    nums.push(parseInt(id.slice(prefix.length),10));
    const issue=isLeg?leg:err;
    // cross-level word dup
    const word=String(e.word||'');
    if(word){
      if(wordLevelMap.has(word)&&wordLevelMap.get(word).level!==level)
        (isLeg?warn:err)('CROSSLEVEL_DUP_WORD',id,`'${word}' also at ${wordLevelMap.get(word).level} (${wordLevelMap.get(word).id})`);
      else if(!wordLevelMap.has(word))wordLevelMap.set(word,{id,level});
    }
    if(e.jlpt&&e.jlpt!==level)issue('JLPT_MISMATCH',id,`entry.jlpt='${e.jlpt}' but file is ${level}`);
    // POS
    if(e.pos!==undefined){
      if(!VALID_POS.has(e.pos))issue('INVALID_POS',id,`pos='${e.pos}'`);
      else if(!isLeg){
        const expConj=POS_CONJ[e.pos];
        if(expConj!==undefined&&e.conj_type!==expConj&&e.conj_type!==null)
          warn('CONJ_TYPE_MISMATCH',id,`pos='${e.pos}' expects conj_type='${expConj}' got '${e.conj_type}'`);
        if(expConj!==undefined&&e.conj_type===null&&!['verb-irr','verb-aru','verb-potential-lexical'].includes(e.pos))
          warn('CONJ_TYPE_NULL',id,`pos='${e.pos}' should have conj_type set`);
      }
    }
    for(const d of(e.domain||[]))if(!VALID_DOMAIN.has(d))issue('INVALID_DOMAIN',id,`domain='${d}'`);
    if('register'in e&&!VALID_REGISTER.has(e.register))issue('INVALID_REGISTER',id,`register='${e.register}'`);
    const fv=e.formalitas;
    if(fv===undefined||fv===null||typeof fv!=='number'||fv<0||fv>5)issue('INVALID_FORMALITAS',id,`formalitas=${JSON.stringify(fv)}`);
    else{
      if(fv===2)lStats[level].v.f2++;
      if(!isLeg&&e.register==='formal'&&fv<=2)warn('FORMALITAS_REGISTER_MISMATCH',id,`register='formal' but formalitas=${fv}`);
      if(!isLeg&&e.register==='casual'&&fv>=4)warn('FORMALITAS_REGISTER_MISMATCH',id,`register='casual' but formalitas=${fv}`);
    }
    if('common'in e&&typeof e.common!=='boolean')issue('INVALID_COMMON',id,'common must be boolean');
    if(e.provenance!==undefined&&e.provenance!=='jlpt-corpus')issue('WRONG_PROVENANCE',id,`provenance='${e.provenance}'`);
    if(e.added_v!==undefined&&e.added_v!=='v15')issue('WRONG_ADDED_V',id,`added_v='${e.added_v}'`);
    if(!word||word.trim().length===0)err('EMPTY_WORD',id,'word is empty');
    // reading
    if(e.reading!==undefined&&e.reading!==null){
      const r=String(e.reading);
      if(r.trim().length===0)err('EMPTY_READING',id,'reading is empty');
      if(KANJI.test(r))issue('READING_HAS_KANJI',id,`reading '${r}' contains kanji — should be kana only`);
      if(!HIRA.test(r)&&!KATA.test(r))warn('READING_NO_KANA',id,`reading '${r}' has no kana`);
    }
    // romaji
    if(e.romaji!==undefined&&e.romaji!==null){
      const rom=String(e.romaji);
      if(rom.trim().length===0)err('EMPTY_ROMAJI',id,'romaji is empty');
      if(!LATIN.test(rom))warn('ROMAJI_NON_LATIN',id,`romaji '${rom}' has non-Latin`);
      if(rom!==rom.toLowerCase())warn('ROMAJI_UPPERCASE',id,`romaji '${rom}' has uppercase`);
    }
    // meaning_id
    const mid=String(e.meaning_id||'');
    if(!mid||mid.trim().length===0)issue('EMPTY_MEANING_ID',id,'meaning_id is empty');
    else{
      if(CJK.test(mid)||HIRA.test(mid)||KATA.test(mid))err('MEANING_ID_HAS_JAPANESE',id,`meaning_id contains Japanese: '${mid.slice(0,50)}'`);
      if(e.meaning_en&&mid===e.meaning_en)err('MEANING_ID_EQ_EN',id,'meaning_id === meaning_en (copy-paste)');
      for(const re of ENGLISH_LEAK)if(re.test(mid)){warn('ENGLISH_IN_MEANING_ID',id,`meaning_id has English: '${mid}'`);break;}
      if(!isLeg){
        const norm=mid.toLowerCase().trim();
        if(meaningIdSeen.has(norm))warn('DUP_MEANING_ID',id,`meaning_id identical to ${meaningIdSeen.get(norm)}: '${mid}'`);
        else meaningIdSeen.set(norm,id);
      }
    }
    // nuance
    const nuance=String(e.nuance||'');
    if(!nuance||nuance.trim().length===0)warn('EMPTY_NUANCE',id,'nuance is empty');
    else{
      if(nuance.length<30)warn('NUANCE_TOO_SHORT',id,`nuance ${nuance.length} chars: '${nuance}'`);
      if(!NUANCE_MARKERS.some(m=>nuance.toLowerCase().includes(m))&&!isLeg)warn('NUANCE_NO_MARKER',id,`no differential marker: '${nuance.slice(0,70)}'`);
      if(mid&&nuance.toLowerCase().trim()===mid.toLowerCase().trim())warn('NUANCE_EQ_MEANING',id,'nuance === meaning_id');
      if((CJK.test(nuance)||HIRA.test(nuance))&&!/[a-z]{3,}/i.test(nuance)&&!isLeg)warn('NUANCE_NO_INDONESIAN',id,`nuance appears to be only Japanese: '${nuance.slice(0,60)}'`);
      if(!isLeg){const nn=nuance.trim();if(nuanceSeen.has(nn))warn('NUANCE_DUPLICATE',id,`identical to ${nuanceSeen.get(nn)}`);else nuanceSeen.set(nn,id);}
    }
    // required fields
    const REQ_V15=['word','reading','romaji','meaning_id','jlpt','pos','common','formalitas','domain','register','nuance','conj_type','examples','synonyms','antonyms','see_also','provenance','added_v'];
    const REQ_ANY=['id','word','jlpt','meaning_id','examples'];
    for(const f of(isLeg?REQ_ANY:REQ_V15))if(!(f in e))issue('MISSING_FIELD',id,`Missing '${f}'`);
    // examples
    const exs=e.examples||[];
    if(exs.length<2)issue('INSUFFICIENT_EXAMPLES',id,`${exs.length} example(s), need ≥2`);
    for(let i=0;i<exs.length;i++){
      const ex=exs[i];
      const jp=String(ex.jp||''),tr=String(ex.id||'');
      if(!jp)err('EXAMPLE_MISSING_JP',id,`example[${i}] missing jp`);
      if(!tr)err('EXAMPLE_MISSING_ID',id,`example[${i}] missing id (Indonesian)`);
      if(jp&&tr&&jp===tr)err('EXAMPLE_JP_EQ_ID',id,`example[${i}] jp===id`);
      if(jp.length>0&&jp.length<8)warn('EXAMPLE_JP_SHORT',id,`example[${i}] jp only ${jp.length} chars: '${jp}'`);
      if(tr.length>0&&tr.length<5)warn('EXAMPLE_ID_SHORT',id,`example[${i}] id only ${tr.length} chars: '${tr}'`);
      if(jp&&!CJK.test(jp)&&!HIRA.test(jp)&&!KATA.test(jp))warn('EXAMPLE_JP_NO_JAPANESE',id,`example[${i}] jp has no Japanese: '${jp}'`);
      if(tr&&(CJK.test(tr)||HIRA.test(tr)||KATA.test(tr)))warn('EXAMPLE_ID_HAS_JAPANESE',id,`example[${i}] Indonesian field has Japanese: '${tr.slice(0,50)}'`);
      if(jp){if(exJpSeen.has(jp))warn('EXAMPLE_JP_DUPLICATE',id,`example[${i}] jp identical to ${exJpSeen.get(jp)}`);else exJpSeen.set(jp,id);}
      for(const t of(ex.tags||[]))if(!VALID_DOMAIN.has(t))warn('EXAMPLE_INVALID_TAG',id,`example[${i}] tag='${t}'`);
    }
    // xrefs
    for(const ref of(e.related_grammar||[]))if(!grammarById.has(ref))err('DEAD_GRAMMAR_REF',id,`related_grammar '${ref}' not found`);
    for(const field of['synonyms','antonyms','see_also']){
      for(const ref of(e[field]||[])){
        if(ref===id)err('SELF_REFERENCE',id,`${field} contains own ID`);
        if(typeof ref==='string'&&ref.startsWith('vg-')&&!vocabById.has(ref))err('DEAD_VOCAB_REF',id,`${field} '${ref}' not found`);
      }
    }
    lStats[level].v.total++;
    if((e.domain||[]).length===1&&e.domain[0]==='umum')lStats[level].v.umum++;
    if(!e.related_grammar||e.related_grammar.length===0)lStats[level].v.rge++;
  }
  // sequence
  if(nums.length>0){
    const s=[...nums].sort((a,b)=>a-b),seen2=new Set();
    for(const n of nums){if(seen2.has(n))err('DUP_ID_IN_FILE',`${prefix}${String(n).padStart(5,'0')}`,`Dup in ${varName}`);seen2.add(n);}
    for(let i=1;i<s.length;i++)if(s[i]-s[i-1]>1)warn('ID_GAP',`${prefix}${String(s[i-1]+1).padStart(5,'0')}`,`Gap after ${prefix}${String(s[i-1]).padStart(5,'0')}`);
  }
}

// ── GRAMMAR PASS ──────────────────────────────────────────────────────────
const seenGrammarIds=new Set(),cpMap=new Map();
for(const[,varName,level,prefix]of GRAMMAR_FILES){
  const entries=global[varName]||[];
  const nums=[];
  for(const e of entries){
    if(!e||typeof e!=='object')continue;
    const isLeg=!e.added_v||e.added_v!=='v15';
    if(NEW_ONLY&&isLeg)continue;
    const id=String(e.id||'');
    if(!id){crit('MISSING_ID',varName,'Grammar entry missing id');continue;}
    if(!id.startsWith(prefix)||!/^\d{5}$/.test(id.slice(prefix.length)))crit('BAD_ID_FORMAT',id,`Expected ${prefix}XXXXX`);
    if(seenGrammarIds.has(id))crit('DUP_GRAMMAR_ID',id,'Duplicate grammar ID');
    seenGrammarIds.add(id);
    nums.push(parseInt(id.slice(prefix.length),10));
    const issue=isLeg?leg:err;
    // cross-level pattern
    const pat=String(e.pattern||'');
    if(pat){
      if(patternLevelMap.has(pat)&&patternLevelMap.get(pat).level!==level)warn('CROSSLEVEL_DUP_PATTERN',id,`pattern '${pat}' also at ${patternLevelMap.get(pat).level} (${patternLevelMap.get(pat).id})`);
      else if(!patternLevelMap.has(pat))patternLevelMap.set(pat,{id,level});
    }
    if(!isLeg&&pat&&!pat.startsWith('〜')&&!pat.startsWith('～')&&!pat.startsWith('V')&&!pat.startsWith('N')&&!pat.startsWith('S'))
      warn('PATTERN_FORMAT',id,`pattern doesn't start with 〜/V/N: '${pat}'`);
    if(e.level&&e.level!==level)issue('JLPT_MISMATCH',id,`entry.level='${e.level}' but file is ${level}`);
    if(e.cat!==undefined&&!VALID_CAT.has(e.cat))issue('INVALID_CAT',id,`cat='${e.cat}'`);
    if(e.provenance!==undefined&&e.provenance!=='jlpt-corpus')issue('WRONG_PROVENANCE',id,`provenance='${e.provenance}'`);
    if(e.added_v!==undefined&&e.added_v!=='v15')issue('WRONG_ADDED_V',id,`added_v='${e.added_v}'`);
    // meaning
    const meaning=String(e.meaning||'');
    if(!meaning||meaning.trim().length===0)err('EMPTY_MEANING',id,'meaning is empty');
    else if((CJK.test(meaning)||HIRA.test(meaning))&&!/[a-z]{3,}/i.test(meaning))
      warn('MEANING_NO_INDONESIAN',id,`meaning appears to be only Japanese: '${meaning.slice(0,60)}'`);
    // desc
    const desc=String(e.desc||'');
    if(!desc||desc.trim().length===0)err('EMPTY_DESC',id,'desc is empty');
    else{
      if(desc.length<40)warn('DESC_TOO_SHORT',id,`desc only ${desc.length} chars`);
      if(!isLeg&&!desc.includes('<b>'))warn('DESC_NO_HIGHLIGHT',id,'desc has no <b>pattern</b> highlight');
    }
    // nuance
    const nuance=String(e.nuance||'');
    if(['n2','n1'].includes(level)){
      if(!nuance||nuance.trim().length===0)warn('NUANCE_MISSING_N2N1',id,'nuance null/empty — required for N2/N1');
      else{
        if(nuance.length<20)warn('NUANCE_TOO_SHORT',id,`nuance only ${nuance.length} chars: '${nuance}'`);
        if(!NUANCE_MARKERS.some(m=>nuance.toLowerCase().includes(m))&&!isLeg)warn('NUANCE_NO_MARKER',id,`no differential marker: '${nuance.slice(0,70)}'`);
        if(!isLeg){const nn=nuance.trim();if(nuanceSeen.has(nn))warn('NUANCE_DUPLICATE',id,`identical to ${nuanceSeen.get(nn)}`);else nuanceSeen.set(nn,id);}
      }
    }
    if(!isLeg&&(!e.connection||String(e.connection).trim().length===0))warn('EMPTY_CONNECTION',id,'connection field is empty');
    // required fields
    const REQ_G=['id','level','pattern','reading','meaning','cat','connection','desc','examples','see_also_grammar','see_also_vocab','confusion_pairs','register','exceptions','notes','provenance','added_v'];
    const REQ_ANY=['id','level','pattern','meaning','examples'];
    for(const f of(isLeg?REQ_ANY:REQ_G))if(!(f in e))(isLeg?leg:err)('MISSING_FIELD',id,`Missing '${f}'`);
    // examples
    const exs=e.examples||[];
    if(exs.length<2)(isLeg?leg:err)('INSUFFICIENT_EXAMPLES',id,`${exs.length} example(s), need ≥2`);
    for(let i=0;i<exs.length;i++){
      const ex=exs[i];
      const jp=String(ex.jp||''),tr=String(ex.id||'');
      if(!jp)err('EXAMPLE_MISSING_JP',id,`example[${i}] missing jp`);
      if(!tr)err('EXAMPLE_MISSING_ID',id,`example[${i}] missing id`);
      if(jp&&tr&&jp===tr)err('EXAMPLE_JP_EQ_ID',id,`example[${i}] jp===id`);
      if(jp.length>0&&jp.length<8)warn('EXAMPLE_JP_SHORT',id,`example[${i}] jp ${jp.length} chars: '${jp}'`);
      if(tr.length>0&&tr.length<5)warn('EXAMPLE_ID_SHORT',id,`example[${i}] id ${tr.length} chars: '${tr}'`);
      if(!isLeg&&i===0&&jp&&!jp.includes('<b>'))warn('EXAMPLE_NO_HIGHLIGHT',id,'example[0] jp has no <b>pattern</b> highlight');
      if(tr&&(CJK.test(tr)||HIRA.test(tr)||KATA.test(tr)))warn('EXAMPLE_ID_HAS_JAPANESE',id,`example[${i}] Indonesian has Japanese: '${tr.slice(0,50)}'`);
      if(jp){if(exJpSeen.has(jp))warn('EXAMPLE_JP_DUPLICATE',id,`example[${i}] jp identical to ${exJpSeen.get(jp)}`);else exJpSeen.set(jp,id);}
    }
    // confusion_pairs
    const cp=e.confusion_pairs||[];
    cpMap.set(id,cp);
    if(['n2','n1'].includes(level)&&cp.length===0)warn('CONFUSION_PAIRS_EMPTY_N2N1',id,`N${level.slice(1)} grammar has empty confusion_pairs`);
    for(const ref of cp){
      if(ref===id)err('SELF_REFERENCE',id,'confusion_pairs contains own ID');
      if(!grammarById.has(ref))err('DEAD_CONFUSION_REF',id,`confusion_pairs '${ref}' not found`);
    }
    for(const ref of(e.see_also_grammar||[])){if(ref===id)err('SELF_REFERENCE',id,'see_also_grammar=own ID');if(!grammarById.has(ref))err('DEAD_GRAMMAR_SEEREF',id,`see_also_grammar '${ref}' not found`);}
    for(const ref of(e.see_also_vocab||[]))if(!vocabById.has(ref))err('DEAD_VOCAB_SEEREF',id,`see_also_vocab '${ref}' not found`);
    lStats[level].g.total++;
    if(!cp||cp.length===0)lStats[level].g.cpe++;
    if(!e.see_also_vocab||e.see_also_vocab.length===0)lStats[level].g.sve++;
  }
  if(nums.length>0){
    const s=[...nums].sort((a,b)=>a-b),seen2=new Set();
    for(const n of nums){if(seen2.has(n))err('DUP_ID_IN_FILE',`${prefix}${String(n).padStart(5,'0')}`,`Dup in ${varName}`);seen2.add(n);}
    for(let i=1;i<s.length;i++)if(s[i]-s[i-1]>1)warn('ID_GAP',`${prefix}${String(s[i-1]+1).padStart(5,'0')}`,`Gap after ${prefix}${String(s[i-1]).padStart(5,'0')}`);
  }
}

// confusion_pairs bidirectionality
for(const[id,refs]of cpMap)
  for(const ref of refs)
    if(grammarById.has(ref)&&!(cpMap.get(ref)||[]).includes(id))
      err('CONFUSION_NOT_BIDIR',id,`${id}→${ref} not reciprocal`);

// distribution checks
for(const[level,st]of Object.entries(lStats)){
  const vt=st.v.total,gt=st.g.total;
  if(vt>10&&st.v.f2/vt>0.80)warn('FORMALITAS_UNIFORM',level,`vocab-${level}: ${st.v.f2}/${vt} (${Math.round(st.v.f2/vt*100)}%) formalitas=2`);
  if(vt>10&&st.v.umum/vt>0.40)warn('DOMAIN_UMUM_OVERUSE',level,`vocab-${level}: ${st.v.umum}/${vt} (${Math.round(st.v.umum/vt*100)}%) domain=['umum'] only`);
  if(vt>0)info('VOCAB_LINK',`vocab-${level}: related_grammar empty ${Math.round(st.v.rge/vt*100)}% (${st.v.rge}/${vt})`);
  if(gt>0)info('GRAMMAR_LINK',`grammar-${level}: see_also_vocab empty ${Math.round(st.g.sve/gt*100)}% | confusion_pairs empty ${Math.round(st.g.cpe/gt*100)}%`);
}
info('TOTALS',`vocab=${seenVocabIds.size} grammar=${seenGrammarIds.size}`);

// ── OUTPUT ────────────────────────────────────────────────────────────────
const ts=new Date().toISOString().slice(0,19).replace('T',' ');
if(JSON_OUTPUT){console.log(JSON.stringify({ts,crits,errors,legacy,warns,infos},null,2));process.exit((crits.length+errors.length)>0?1:0);}

function group(items){const m={};for(const i of items){if(!m[i.code])m[i.code]=[];m[i.code].push(i);}return m;}
function printG(g,indent='  '){for(const[code,items]of Object.entries(g)){console.log(`${indent}[${code}] (${items.length})`);for(const i of items)console.log(`${indent}  ${String(i.id).padEnd(20)} ${i.msg}`);}}

const note=NEW_ONLY?' [--new-only]':'';
console.log('\n══════════════════════════════════════════════════════════════');
console.log('  NUGGET NIHONGO — QUALITY REPORT v3'+note);
console.log(`  Generated: ${ts}`);
console.log(`  vocab=${seenVocabIds.size}  grammar=${seenGrammarIds.size}`);
console.log('══════════════════════════════════════════════════════════════');

if(crits.length===0)console.log('\n  ✅  No critical issues.\n');
else{console.log(`\n━━━ CRITICAL (${crits.length}) ━━━\n`);printG(group(crits));}

if(errors.length===0)console.log('\n  ✅  No errors.\n');
else{console.log(`\n━━━ ERRORS (${errors.length}) — blocks merge ━━━\n`);printG(group(errors));}

if(!ERRORS_ONLY){
  if(SHOW_LEGACY&&legacy.length>0){console.log(`\n━━━ LEGACY DEBT (${legacy.length}) ━━━\n`);printG(group(legacy));}
  else if(legacy.length>0){
    const s=Object.entries(group(legacy)).map(([c,v])=>`${c}(${v.length})`).join(', ');
    console.log(`\n  📦  Legacy debt (${legacy.length}): ${s}\n      → run --legacy to expand | run --new-only to hide\n`);
  }
  if(warns.length===0)console.log('\n  ✅  No warnings.\n');
  else{console.log(`\n━━━ WARNINGS (${warns.length}) ━━━\n`);printG(group(warns));}
  console.log('\n━━━ COVERAGE ━━━\n');
  for(const i of infos)console.log(`  ${i.msg}`);
}

const blocking=crits.length+errors.length;
console.log('\n══════════════════════════════════════════════════════════════');
console.log(`  CRIT:${crits.length} ERROR:${errors.length} LEGACY:${legacy.length} WARN:${warns.length}`);
console.log(`  ${blocking>0?'❌  '+blocking+' blocking issue(s). Fix before merge.':'✅  No blockers.'+(legacy.length?' Legacy debt tracked separately.':'')}`);
console.log('══════════════════════════════════════════════════════════════\n');
process.exit(blocking>0?1:0);
