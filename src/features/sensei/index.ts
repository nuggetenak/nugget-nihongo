// ══════════════════════════════════════════════════════════════════
//  src/features/sensei/index.ts
//  Feature Domain: Sensei AI (Tutor Studio & Contextual Assistance)
// ══════════════════════════════════════════════════════════════════

export { SenseiPage } from '../../pages/SenseiPage';
export { ContextualSenseiSheet } from '../../components/sensei/ContextualSenseiSheet';
export {
  sendSenseiMessage,
  streamSenseiResponse,
  buildSenseiSystemPrompt,
  inferSenseiExpression,
  sanitizeAndTrimChatHistory,
  loadChatHistory,
  saveChatHistory,
  clearChatHistory,
  type ChatMessage,
  type SenseiPersona,
  type SenseiMode,
  type ContextCardPayload,
  type SenseiSessionConfig,
} from '../../lib/ai/senseiClient';
export { senseiMemory, type SenseiMemoryItem, type MemoryCategory } from '../../lib/ai/senseiMemory';
export { rateLimiter, type RateLimitPolicy } from '../../lib/ai/rateLimiter';
