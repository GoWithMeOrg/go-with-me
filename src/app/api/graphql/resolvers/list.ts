import ListModel from "@/database/models/List";
import { IListInput } from "@/database/types/List";

export const listResolvers = {
    Query: {
        lists: async () => {
            return ListModel.find({});
        },
        listItem: async (parent: any, { id }: { id: string }) => {
            return ListModel.findById(id);
        },
    },

    Mutation: {
        createList: async (parent: any, { list }: { list: IListInput }) => {
            // https://mongoosejs.com/docs/api/model.html#Model.create()
            // Shortcut for saving one or more documents to the database.
            // MyModel.create(docs) does new MyModel(doc).save() for every doc in docs.
            return ListModel.create(list);
        },
        updateList: async (parent: any, { id, list }: { id: string; list: Omit<IListInput, "author_id"> }) => {
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
