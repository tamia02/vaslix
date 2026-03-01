export declare class ActionDispatcher {
    dispatch(action: string, metadata: any): Promise<void>;
    private handleEscalation;
    private handleFetchAvailability;
    private handleCRMUpdate;
    private handleBookMeeting;
}
