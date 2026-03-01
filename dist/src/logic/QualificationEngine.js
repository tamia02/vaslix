"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QualificationEngine = void 0;
const types_1 = require("../types");
class QualificationEngine {
    /**
     * Lead Score = Weighted intent + Response confidence + Fit indicators
     */
    async scoreLead(leadData, intentConfidence) {
        let score = 0;
        let reasoning = "";
        // 1. Budget indicators (Weight: 30%)
        if (leadData.budget > 5000) {
            score += 30;
            reasoning += "High budget indicator. ";
        }
        // 2. Urgency signals (Weight: 20%)
        if (leadData.urgency === 'HIGH') {
            score += 20;
            reasoning += "High urgency signal. ";
        }
        // 3. Authority level (Weight: 20%)
        if (leadData.authorityLevel === 'DECISION_MAKER') {
            score += 20;
            reasoning += "Decision maker authority. ";
        }
        // 4. Fit indicators (Weight: 20%)
        if (leadData.industry === 'TECHNOLOGY') {
            score += 20;
            reasoning += "Ideal industry fit. ";
        }
        // 5. Response confidence (Weight: 10%)
        score += (intentConfidence * 10);
        // Determine status based on thresholds
        let status = types_1.LeadStatus.NEW;
        if (score >= 80) {
            status = types_1.LeadStatus.QUALIFIED;
        }
        else if (score >= 40) {
            status = types_1.LeadStatus.QUALIFYING;
        }
        else {
            status = types_1.LeadStatus.NURTURING;
        }
        return { score, status, reasoning };
    }
}
exports.QualificationEngine = QualificationEngine;
//# sourceMappingURL=QualificationEngine.js.map