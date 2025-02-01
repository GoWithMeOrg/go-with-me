import EventModel, { IEvent } from "@/database/models/Event";
import UserModel from "@/database/models/User";

export const eventResolvers = {
    Query: {
        events: async (parent: any, { limit, offset, sort }: { limit: number; offset: number; sort?: string }) => {
            const events = await EventModel.find().sort(sort).limit(limit);
            return events;
        },

        event: async (parent: any, { id, ...rest }: { id: string }) => {
            return await EventModel.findById(id);
        },

        search: async (parent: any, { text }: { text: string }) => {
            return await EventModel.find({ $text: { $search: text } });
        },

        eventFilters: async (
            parent: any,
            {
                date,
                bounds,
                categories,
                types,
                tags,
            }: {
                date: Date;
                bounds: { south: number; west: number; north: number; east: number };
                categories: string[];
                types: string[];
                tags: string[];
            },
        ) => {
            const filters: any = {};

            if (date) {
                const startOfDay = new Date(date);
                const endOfDay = new Date(date);
                startOfDay.setHours(0, 0, 0, 0);
                endOfDay.setHours(23, 59, 59, 999);
                filters.startDate = { $gte: startOfDay, $lt: endOfDay };
            }

            if (bounds) {
                const { south, west, north, east } = bounds;
                filters.location = {
                    $geoWithin: {
                        $box: [
                            [west, south],
                            [east, north],
                        ],
                    },
                };
            }

            if (categories) filters.categories = { $in: categories };
            if (types) filters.types = { $in: types };
            if (tags) filters.tags = { $in: tags };

            return await EventModel.find(filters);
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
