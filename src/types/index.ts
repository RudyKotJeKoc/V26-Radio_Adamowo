// Type definitions for safety and crisis support features

export interface SafetyConfig {
  quickExitEnabled: boolean;
  stealthModeEnabled: boolean;
  anonymousSession: boolean;
  clearHistoryOnExit: boolean;
}

export interface CrisisContact {
  name: string;
  phone: string;
  available24h: boolean;
  type: 'helpline' | 'police' | 'shelter' | 'legal';
  description: string;
}

export interface SupportCategory {
  id: string;
  title: string;
  urgent: boolean;
  tracks: string[];
  icon?: string;
  description: string;
}

export interface SafetyPlan {
  id: string;
  trustedContacts: CrisisContact[];
  safeLocations: string[];
  emergencyBag: string[];
  warningSignals: string[];
  copingStrategies: string[];
  lastUpdated: Date;
}