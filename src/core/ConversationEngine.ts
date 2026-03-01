import { IntentClassifier } from './IntentClassifier';
import { ConversationContext, InteractionType } from '../types';
import { v4 as uuidv4 } from 'uuid';

export class ConversationEngine {
    private intentClassifier: IntentClassifier;
    private sessionContext: Map<string, ConversationContext>;

    constructor() {
        this.intentClassifier = new IntentClassifier();
        this.sessionContext = new Map();
    }

    private getContext(sessionId: string): ConversationContext {
        if (!this.sessionContext.has(sessionId)) {
            this.sessionContext.set(sessionId, {
                sessionId,
                objectionsDetected: [],
                bookingStore: { stage: 'INIT', offeredSlots: [] },
                confidenceScore: 0,
            });
        }
        return this.sessionContext.get(sessionId)!;
    }

    async processInput(sessionId: string, text: string): Promise<{ response: string; actionRequested?: string }> {
        const context = this.getContext(sessionId);

        // 1. Classify Intent
        const { intent, confidence } = await this.intentClassifier.classify(text, context);
        context.currentIntent = intent;
        context.confidenceScore = confidence;

        // 2. Resolve Action & Generate Response (Simplified for now)
        let response = "I'm not sure how to help with that.";
        let actionRequested: string | undefined;

        if (confidence < 0.65 || intent === 'HUMAN_REQUEST' || intent === 'COMPLEX_OBJECTION') {
            response = "I'll connect you with a member of our team who can better assist you.";
            actionRequested = 'ESCALATE';
        } else if (intent === 'GREETING') {
            response = "Hello! I'm Thunder Core Agent. I'm here to help you get started. Are you looking to schedule a quick chat?";
        } else if (intent === 'BOOKING_REQUEST') {
            response = "I'd be happy to help you schedule a time. Would later today or tomorrow work best?";
            actionRequested = 'FETCH_AVAILABILITY';
        }

        // Update memory (mocked)
        context.previousQuestion = response;

        return { response, actionRequested };
    }
}
