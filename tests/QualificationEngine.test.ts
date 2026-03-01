import { QualificationEngine } from '../src/logic/QualificationEngine';
import { LeadStatus } from '../src/types';

describe('QualificationEngine', () => {
    let engine: QualificationEngine;

    beforeEach(() => {
        engine = new QualificationEngine();
    });

    it('should qualify lead with high budget and decision maker authority', async () => {
        const leadData = {
            budget: 6000,
            authorityLevel: 'DECISION_MAKER',
            industry: 'TECHNOLOGY',
            urgency: 'HIGH'
        };
        const result = await engine.scoreLead(leadData, 1.0);
        expect(result.score).toBeGreaterThanOrEqual(80);
        expect(result.status).toBe(LeadStatus.QUALIFIED);
    });

    it('should nurture lead with low score', async () => {
        const leadData = {
            budget: 1000,
            authorityLevel: 'USER'
        };
        const result = await engine.scoreLead(leadData, 0.5);
        expect(result.score).toBeLessThan(40);
        expect(result.status).toBe(LeadStatus.NURTURING);
    });
});
