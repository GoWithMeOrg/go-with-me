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

        eventSearchByLocation: async (
            parent: any,
            { bounds }: { bounds: { south: number; west: number; north: number; east: number } },
        ) => {
            const { south, west, north, east } = bounds;

            const query = {
                location: {
                    $geoWithin: {
                        $box: [
                            [west, south],
                            [east, north],
                        ],
                    },
                },
            };

            const events = await EventModel.find(query);

            return [...events];
        },

        eventsByDate: async (parent: any, { date }: { date: any }) => {
            const startOfDay = new Date(date);
            const endOfDay = new Date(date);

            startOfDay.setHours(0, 0, 0, 0);
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
