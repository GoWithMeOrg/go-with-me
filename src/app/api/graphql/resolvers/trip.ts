import EventModel from "@/database/models/Event";
import TripModel, { ITrip } from "@/database/models/Trip";
import UserModel from "@/database/models/User";

export const tripResolvers = {
    Query: {
        trips: async () => {
            return TripModel.find({});
        },

        trip: async (parent: any, { id, ...rest }: { id: string }) => {
            return TripModel.findById(id);
        },
    },

    Trip: {
        events: async (parent: ITrip) => {
            return await EventModel.find({ _id: { $in: parent.events_id } });
        },
        organizer: async (parent: ITrip) => {
            return await UserModel.findById(parent.organizer_id);
        },
    },

    Mutation: {
        createTrip: async (parent: any, { trip }: { trip: ITrip }) => {
            const newTrip = new TripModel(trip);
            return await newTrip.save();
        },
        updateTrip: async (parent: any, { id, trip }: { id: string; trip: ITrip }) => {
            await TripModel.updateOne({ _id: id }, trip);
            return await TripModel.findById(id);
        },
        deleteTrip: async (parent: any, { id }: { id: string }) => {
            return await TripModel.deleteOne({ _id: id });
        },
    },
};

export default tripResolvers;
