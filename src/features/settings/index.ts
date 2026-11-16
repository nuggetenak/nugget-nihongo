// ══════════════════════════════════════════════════════════════════
//  src/features/settings/index.ts
//  Feature Domain: Settings & Profile (Identity, Audio, Sync, Backup)
// ══════════════════════════════════════════════════════════════════

export { SettingsPage, type SettingsTab } from '../../pages/SettingsPage';
export { ProfileSettingsTab } from '../../components/settings/ProfileSettingsTab';
export { AudioSettingsTab } from '../../components/settings/AudioSettingsTab';
export { SyncSettingsTab } from '../../components/settings/SyncSettingsTab';
export { AdvancedSettingsTab } from '../../components/settings/AdvancedSettingsTab';
export { LearnerMasteryReport } from '../../components/settings/LearnerMasteryReport';
export { DailyGoalSelector, DAILY_GOAL_TIERS, type DailyGoalTier } from '../../components/settings/DailyGoalSelector';
export { AchievementsBadgeShowcase } from '../../components/settings/AchievementsBadgeShowcase';
export { LearnerIdentityCard, CULTURAL_AVATARS, type CulturalAvatar } from '../../components/settings/LearnerIdentityCard';
export { ResetConfirmationModal } from '../../components/modals/ResetConfirmationModal';
