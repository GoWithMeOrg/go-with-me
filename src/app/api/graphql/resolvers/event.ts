import EventModel, { IEvent } from "@/database/models/Event";
import UserModel from "@/database/models/User";

export const eventResolvers = {
    Query: {
        events: async (parent: any, { limit, offset, sort }: { limit: number; offset: number; sort?: string }) => {
            const events = await EventModel.find().sort(sort).limit(limit);
            return events;
        },
        event: async (parent: any, { id, ...rest }: { id: string }) => {
            return EventModel.findById(id);
        },

        search: async (parent: any, { text }: { text: string }) => {
            const events = await EventModel.find({ $text: { $search: text } });
            return [...events];
        },

        // eventsByDate: async (parrent: any, { date }, { date: any }) => {
        //     const startOfDay = new Date(date); // начало дня
        //     const endOfDay = new Date(date); // конец дня
        //     endOfDay.setDate(endOfDay.getDate() + 1);

        //     // MongoDB запрос с использованием диапазона
        //     return EventModel.find({
        //         date: {
        //             $gte: startOfDay.toISOString(),
        //             $lt: endOfDay.toISOString(),
        //         },
        //     });
        // },

        eventsByDate: async (parent: any, { date }: { date: any }) => {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            const events = await EventModel.find({
                startDate: { $gte: startOfDay, $lt: endOfDay },
            });
            return [...events];
        },
    },

    Event: {
        organizer: async (parent: IEvent) => {
            return await UserModel.findById(parent.organizer_id);
        },
    },

    Mutation: {
        createEvent: async (parent: any, { event }: { event: IEvent }) => {
            const newEvent = new EventModel(event);
            return await newEvent.save();
        },
        updateEvent: async (parent: any, { id, event }: { id: string; event: IEvent }) => {
            await EventModel.updateOne({ _id: id }, event);
            return await EventModel.findById(id).populate("organizer");
        },
        deleteEvent: async (parent: any, { id }: { id: string }) => {
            return await EventModel.deleteOne({ _id: id });
        },
    },
};
