import { LeadStatus } from '../types';
export interface LeadScoreResult {
    score: number;
    status: LeadStatus;
    reasoning: string;
}
export declare class QualificationEngine {
    /**
     * Lead Score = Weighted intent + Response confidence + Fit indicators
     */
    scoreLead(leadData: any, intentConfidence: number): Promise<LeadScoreResult>;
}
