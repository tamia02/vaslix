export declare class SchedulingService {
    private calendarApiKey;
    constructor();
    getAvailability(startDate: Date, endDate: Date): Promise<string[]>;
    bookMeeting(leadEmail: string, slot: string): Promise<boolean>;
}
