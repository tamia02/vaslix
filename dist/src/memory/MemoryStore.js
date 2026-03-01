"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryStore = void 0;
class MemoryStore {
    constructor() {
        this.memoryMap = new Map();
    }
    async store(leadId, entry) {
        const memories = this.memoryMap.get(leadId) || [];
        // Update if exists, else append
        const index = memories.findIndex(m => m.key === entry.key);
        if (index > -1) {
            memories[index] = entry;
        }
        else {
            memories.push(entry);
        }
        this.memoryMap.set(leadId, memories);
        console.log(`Stored memory for lead ${leadId}: ${entry.key}=${entry.value}`);
    }
    async retrieve(leadId, key) {
        const memories = this.memoryMap.get(leadId) || [];
        return memories.find(m => m.key === key)?.value;
    }
    async getAllForLead(leadId) {
        return this.memoryMap.get(leadId) || [];
    }
}
exports.MemoryStore = MemoryStore;
//# sourceMappingURL=MemoryStore.js.map