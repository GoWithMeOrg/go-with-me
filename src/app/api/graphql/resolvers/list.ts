import ListModel from "@/database/models/List";
import { IListInput } from "@/database/types/List";

export const listResolvers = {
    Query: {
        lists: async (parent: any, args: any, context: any) => {
            const author_id = context.currentUser?._id;
            if (!author_id) {
                throw new Error("User not found");
            }
            return ListModel.find({ author_id }).populate("users").lean();
        },
        listItem: async (parent: any, { id }: { id: string }) => {
            return ListModel.findById(id);
        },
    },

    Mutation: {
        createList: async (parent: any, { list }: { list: IListInput }, context: any) => {
            // https://mongoosejs.com/docs/api/model.html#Model.create()
            // Shortcut for saving one or more documents to the database.
            // MyModel.create(docs) does new MyModel(doc).save() for every doc in docs.
            const author_id = context.currentUser?._id;
            if (!author_id) {
                throw new Error("User not found");
            }
            return ListModel.create({ ...list, author_id });
        },
        updateList: async (
            parent: any,
            { id, list }: { id: string; list: Omit<IListInput, "author_id"> },
            context: any,
        ) => {
            const author_id = context.currentUser?._id;
            if (!author_id) {
                throw new Error("User not found");
            }
            return ListModel.findByIdAndUpdate(
                id,
                {
                    name: list.name,
                    description: list.description,
                    users_id: list.users_id,
                },
                { new: true },
            );
        },
        deleteList: async (parent: any, { id }: { id: string }) => {
            return ListModel.findByIdAndDelete(id);
        },
    },
};
