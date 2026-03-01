import { MemoryType } from '../types';
export interface MemoryEntry {
    key: string;
    value: any;
    type: MemoryType;
}
export declare class MemoryStore {
    private memoryMap;
    store(leadId: string, entry: MemoryEntry): Promise<void>;
    retrieve(leadId: string, key: string): Promise<any | undefined>;
    getAllForLead(leadId: string): Promise<MemoryEntry[]>;
}
