import { MemoryStore } from './MemoryStore';
import { MemoryType } from '../types';

export class SessionStore extends MemoryStore {
    async storeSessionData(sessionId: string, key: string, value: any): Promise<void> {
        await this.store(sessionId, { key, value, type: MemoryType.SESSION });
    }
}

export class PersistentStore extends MemoryStore {
    async persistLeadData(leadId: string, key: string, value: any): Promise<void> {
        await this.store(leadId, { key, value, type: MemoryType.PERSISTED });
    }
}

export * from './MemoryStore';
