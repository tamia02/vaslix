import { MemoryType } from '../types';

export interface MemoryEntry {
    key: string;
    value: any;
    type: MemoryType;
}

export class MemoryStore {
    private memoryMap: Map<string, MemoryEntry[]> = new Map();

    async store(leadId: string, entry: MemoryEntry): Promise<void> {
        const memories = this.memoryMap.get(leadId) || [];
        // Update if exists, else append
        const index = memories.findIndex(m => m.key === entry.key);
        if (index > -1) {
            memories[index] = entry;
        } else {
            memories.push(entry);
        }
        this.memoryMap.set(leadId, memories);
        console.log(`Stored memory for lead ${leadId}: ${entry.key}=${entry.value}`);
    }

    async retrieve(leadId: string, key: string): Promise<any | undefined> {
        const memories = this.memoryMap.get(leadId) || [];
        return memories.find(m => m.key === key)?.value;
    }

    async getAllForLead(leadId: string): Promise<MemoryEntry[]> {
        return this.memoryMap.get(leadId) || [];
    }
}
