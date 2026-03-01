export interface Lead {
  id: string;
  externalId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  industry?: string;
  budget?: number;
  urgency?: 'HIGH' | 'MEDIUM' | 'LOW';
  authorityLevel?: string;
  leadScore: number;
  status: LeadStatus;
}

export enum LeadStatus {
  NEW = 'NEW',
  QUALIFYING = 'QUALIFYING',
  QUALIFIED = 'QUALIFIED',
  NURTURING = 'NURTURING',
  BOOKED = 'BOOKED',
  ESCAlATED = 'ESCAlATED',
  DISQUALIFIED = 'DISQUALIFIED'
}

export interface Interaction {
  id: string;
  leadId: string;
  type: InteractionType;
  direction: 'INBOUND' | 'OUTBOUND';
  duration?: number;
  transcript?: string;
  sentimentScore?: number;
  outcome?: string;
  metadata?: any;
  createdAt: Date;
}

export enum InteractionType {
  VOICE_CALL = 'VOICE_CALL',
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  FORM_SUBMISSION = 'FORM_SUBMISSION'
}

export interface ConversationContext {
  sessionId: string;
  leadId?: string;
  currentIntent?: string;
  previousQuestion?: string;
  objectionsDetected: string[];
  bookingStore: {
    stage: string;
    offeredSlots: string[];
    selectedSlot?: string;
  };
  confidenceScore: number;
}

export enum MemoryType {
  SHORT_TERM = 'SHORT_TERM',
  LONG_TERM = 'LONG_TERM',
  EPISODIC = 'EPISODIC',
  SEMANTIC = 'SEMANTIC',
  SYSTEM = 'SYSTEM',
  SESSION = 'SESSION',
  PERSISTED = 'PERSISTED'
}
