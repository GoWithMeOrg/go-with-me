import EventModel from "@/database/models/Event";
import JoinedModel from "@/database/models/Joined";
import LikeModel from "@/database/models/Like";
import { IResolvers } from "@graphql-tools/utils";
import mongoose from "mongoose";

export const likedResolvers: IResolvers = {
    Query: {
        liked: async (parent: any, { event_id, user_id }: { event_id: string; user_id: string }) => {
            const eventObjectId = new mongoose.Types.ObjectId(event_id);
            const userObjectId = new mongoose.Types.ObjectId(user_id);

            return await LikeModel.findOne({ event_id: eventObjectId, user_id: userObjectId });
        },

        likedEvents: async (_: any, { user_id }: { user_id: string }) => {
            const userObjectId = new mongoose.Types.ObjectId(user_id);

            const likes = await LikeModel.find({ user_id: userObjectId, isLiked: true });
            const eventIds = likes.map((like) => like.event_id);

            const events = await EventModel.find({ _id: { $in: eventIds } });
            return events;
        },
    },

    Mutation: {
        like: async (parent: any, { event_id, user_id }: { event_id: string; user_id: string }) => {
            const userObjectId = new mongoose.Types.ObjectId(user_id);
            const eventObjectId = new mongoose.Types.ObjectId(event_id);

            const existingLike = await LikeModel.findOne({ event_id: eventObjectId, user_id: userObjectId });

            if (existingLike) {
                await LikeModel.deleteOne({ event_id: eventObjectId, user_id: userObjectId });
                return { acknowledged: true, deletedCount: 1 };
            } else {
                const newLike = new LikeModel({
                    event_id: eventObjectId,
                    user_id: userObjectId,
                    isLiked: true,
                });

                await newLike.save();

                return await LikeModel.findOne({ event_id: eventObjectId, user_id: userObjectId });
            }
        },
    },
};
