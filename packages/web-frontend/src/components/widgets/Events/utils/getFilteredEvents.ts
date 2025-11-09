import { IEvent } from "../types/events";

export const filterUpcoming = (events: IEvent[], now: Date) => {
    return events
        .filter((e) => e.startDate && new Date(e.startDate) >= now)
        .sort((a, b) => new Date(a.startDate as string).getTime() - new Date(b.startDate as string).getTime());
};

export const filterPast = (events: IEvent[], now: Date) => {
    return events
        .filter((e) => e.startDate && new Date(e.startDate) < now)
        .sort((a, b) => new Date(b.startDate as string).getTime() - new Date(a.startDate as string).getTime());
};

export const filterOrganizerByNewest = (events: IEvent[], now: Date) => {
    return [...events]
        .filter((e) => e.createdAt)
        .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
};
