"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QualificationEngine_1 = require("../src/logic/QualificationEngine");
const types_1 = require("../src/types");
describe('QualificationEngine', () => {
    let engine;
    beforeEach(() => {
        engine = new QualificationEngine_1.QualificationEngine();
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
        expect(result.status).toBe(types_1.LeadStatus.QUALIFIED);
    });
    it('should nurture lead with low score', async () => {
        const leadData = {
            budget: 1000,
            authorityLevel: 'USER'
        };
        const result = await engine.scoreLead(leadData, 0.5);
        expect(result.score).toBeLessThan(40);
        expect(result.status).toBe(types_1.LeadStatus.NURTURING);
    });
});
//# sourceMappingURL=QualificationEngine.test.js.map