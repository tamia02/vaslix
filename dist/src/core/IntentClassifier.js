"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentClassifier = void 0;
const openai_1 = require("openai");
class IntentClassifier {
    constructor() {
        this.openai = new openai_1.OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    async classify(text, context) {
        const prompt = `
      You are an intent classifier for Thunder AI, an autonomous revenue operations agent.
      Current Context:
      - Session ID: ${context.sessionId}
      - Previous Question: ${context.previousQuestion}
      - Objections Detected: ${context.objectionsDetected.join(', ')}

      User Input: "${text}"

      Classify the user intent into one of the following categories:
      - GREETING: Initial hello/intro.
      - QUALIFICATION_RESPONSE: Answering a question about budget, urgency, authority, etc.
      - OBJECTION: Expressing a concern or reason for not moving forward.
      - BOOKING_REQUEST: Expressing desire to schedule a meeting.
      - HUMAN_REQUEST: Specifically asking for a person.
      - COMPLEX_OBJECTION: An objection that seems too technical or nuanced for an AI.
      - COMPLIANCE_SENSITIVE: Questions about data privacy, legal, or pricing that require exactness.
      - OTHER: Anything else.

      Return a JSON object with:
      {
        "intent": "CATEGORY",
        "confidence": 0.0 to 1.0,
        "reasoning": "Brief explanation"
      }
    `;
        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [{ role: 'system', content: prompt }],
                response_format: { type: 'json_object' },
            });
            const result = JSON.parse(response.choices[0].message.content || '{}');
            return {
                intent: result.intent || 'OTHER',
                confidence: result.confidence || 0,
            };
        }
        catch (error) {
            console.error('Error classifying intent:', error);
            return { intent: 'OTHER', confidence: 0 };
        }
    }
}
exports.IntentClassifier = IntentClassifier;
//# sourceMappingURL=IntentClassifier.js.map