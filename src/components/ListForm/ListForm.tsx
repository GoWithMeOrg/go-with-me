"use client";

import { IList } from "@/database/models/List";
import { FindAndSelect } from "@/components/FindAndSelect/FindAndSelect";
import { gql } from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";

type ListFormProps = {
    list?: IList;
};

const READ_USERS = gql`
    #graphql
    query users {
        users {
            _id
            name
            email
            image
        }
    }
`;

const CREATE_LIST = gql`
    #graphql
    mutation CreateList($name: String!, $description: String, $users_id: [ID!]) {
        createList(list: { name: $name, description: $description, users_id: $users_id }) {
            _id
            name
            description
        }
    }
`;
const READ_LISTS = gql`
    #graphql
    query lists($id: ID!) {
        list(id: $id) {
            _id
            name
            description
            users_id
        }
    }
`;

const ListForm = ({ list }: ListFormProps) => {
    const [createList] = useMutation(CREATE_LIST);
    const { loading, error, data } = useQuery(READ_USERS);

    const handleDelete = (_id: string) => {
        console.log("_id: ", _id); // eslint-disable-line
    };

    const handleFind = async (_id: string) => {
        console.log("_id: ", _id); // eslint-disable-line
        return Promise.resolve([{ _id: "test found" }]);
    };

    const handeSave = async (list: IList) => {
        console.log("list: ", list); // eslint-disable-line
        createList({
            variables: {
                name: list.name,
                description: list.description,
                users_id: list.users_id,
            },
        });
    };

    return (
        <div>
            <form>
                <div>
                    <label htmlFor="name">Название</label>
                    <input type="text" defaultValue={list?.name} name="name" id="name" />
                </div>

                <div>
                    <label htmlFor="description">Описание</label>
                    <textarea name="description" defaultValue={list?.description} id="description"></textarea>
                </div>

                <div>
                    <p>Участники</p>
                    <FindAndSelect
                        items={list?.users_id.map((_id) => ({ _id }))}
                        deleter={handleDelete}
                        finder={handleFind}
                    />
                </div>

                <button type="submit">Сохранить</button>
            </form>
        </div>
    );
};

export { ListForm };
