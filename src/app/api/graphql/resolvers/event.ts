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
