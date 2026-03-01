import { MemoryStore } from './MemoryStore';
export declare class SessionStore extends MemoryStore {
    storeSessionData(sessionId: string, key: string, value: any): Promise<void>;
}
export declare class PersistentStore extends MemoryStore {
    persistLeadData(leadId: string, key: string, value: any): Promise<void>;
}
export * from './MemoryStore';
