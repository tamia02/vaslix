import { ConversationContext } from '../types';
export declare class IntentClassifier {
    private openai;
    constructor();
    classify(text: string, context: ConversationContext): Promise<{
        intent: string;
        confidence: number;
    }>;
}
