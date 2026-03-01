import { Lead, LeadStatus } from '../types';
export declare class CRMService {
    private crmApiKey;
    constructor();
    syncLead(lead: Lead): Promise<void>;
    createLeadEntry(lead: Partial<Lead>): Promise<string>;
    updateLeadStatus(externalId: string, status: LeadStatus): Promise<void>;
}
