export declare class ConversationEngine {
    private intentClassifier;
    private sessionContext;
    constructor();
    private getContext;
    processInput(sessionId: string, text: string): Promise<{
        response: string;
        actionRequested?: string;
    }>;
}
