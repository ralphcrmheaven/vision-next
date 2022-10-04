export interface IMeetingRecord {
    User: string
    MeetingId: string,
    Title: string,
    Attendees: Attendees[]
    Password: string
    Topic: string
    TopicDetails: string
    StartDate: string
    StartTime: string
    DurationHrs: number
    DurationMins: number
    StartDateTimeUTC: string
    Url: string
    CreatedAt: string
    UpdatedAt: string
};
interface Attendees {
    Name: string
};