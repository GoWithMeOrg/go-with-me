import type { Meta, StoryObj } from "@storybook/react";
import { CommentsList } from "./CommentsList";

const meta = {
    title: "UI/CommentsList",
    component: CommentsList,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof CommentsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CommentsListComponent: Story = {
    args: {
        comments: [
            {
                _id: "1234",
                author: {
                    name: "АдмиралИванФедоровичКурзенштерн",
                },
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, voluptate, provident iste illo velit eius sed numquam porro similique, dolore quisquam saepe dolorum corrupti beatae quos deserunt nostrum laboriosam nihil earum libero. Esse delectus harum dignissimos quia molestias repellat, praesentium velit consectetur facilis non rerum eos rem officiis minima laudantium quas cumque quasi inventore nobis laborum atque dolorum! Nesciunt error temporibus nihil iure laboriosam officiis reprehenderit explicabo ex, dolores aut eum natus deleniti, debitis dolor labore eveniet impedit! Cumque labore voluptates quibusdam earum id praesentium asperiores dolore, vitae est in, possimus, aliquid sit. Perferendis neque ea veritatis mollitia sequi pariatur.",
                likesNumber: 999,
                createdAt: new Date(),
                replies: [
                    {
                        _id: "2345",
                        author: {
                            name: "Человек и пароход-пароход",
                        },
                        content:
                            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, voluptate, provident iste illo velit eius sed numquam porro similique, dolore quisquam saepe dolorum corrupti beatae quos deserunt nostrum laboriosam nihil earum libero. Esse delectus harum dignissimos quia molestias repellat, praesentium velit consectetur facilis non rerum eos rem officiis minima laudantium quas cumque quasi inventore nobis laborum atque dolorum! Nesciunt error temporibus nihil iure laboriosam officiis reprehenderit explicabo ex, dolores aut eum natus deleniti, debitis dolor labore eveniet impedit! Cumque labore voluptates quibusdam earum id praesentium asperiores dolore, vitae est in, possimus, aliquid sit. Perferendis neque ea veritatis mollitia sequi pariatur.",
                        likesNumber: 55555555555555,
                        createdAt: new Date(),
                    },
                ],
            },
            {
                _id: "3456",
                author: {
                    name: "Федя",
                },
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, voluptate, provident iste illo velit eius sed numquam porro similique, dolore quisquam saepe dolorum corrupti beatae quos deserunt nostrum laboriosam nihil earum libero. Esse delectus harum dignissimos quia molestias repellat, praesentium velit consectetur facilis non rerum eos rem officiis minima laudantium quas cumque quasi inventore nobis laborum atque dolorum! Nesciunt error temporibus nihil iure laboriosam officiis reprehenderit explicabo ex, dolores aut eum natus deleniti, debitis dolor labore eveniet impedit! Cumque labore voluptates quibusdam earum id praesentium asperiores dolore, vitae est in, possimus, aliquid sit. Perferendis neque ea veritatis mollitia sequi pariatur.",
                likesNumber: 55555555555555,
                createdAt: new Date(),
                replies: [
                    {
                        _id: "4567",
                        author: {
                            name: "Петя",
                        },
                        content:
                            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, voluptate, provident iste illo velit eius sed numquam porro similique, dolore quisquam saepe dolorum corrupti beatae quos deserunt nostrum laboriosam nihil earum libero. Esse delectus harum dignissimos quia molestias repellat, praesentium velit consectetur facilis non rerum eos rem officiis minima laudantium quas cumque quasi inventore nobis laborum atque dolorum! Nesciunt error temporibus nihil iure laboriosam officiis reprehenderit explicabo ex, dolores aut eum natus deleniti, debitis dolor labore eveniet impedit! Cumque labore voluptates quibusdam earum id praesentium asperiores dolore, vitae est in, possimus, aliquid sit. Perferendis neque ea veritatis mollitia sequi pariatur.",
                        likesNumber: 999,
                        createdAt: new Date(),
                    },
                    {
                        _id: "4567",
                        author: {
                            name: "Петя",
                        },
                        content:
                            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, voluptate, provident iste illo velit eius sed numquam porro similique, dolore quisquam saepe dolorum corrupti beatae quos deserunt nostrum laboriosam nihil earum libero. Esse delectus harum dignissimos quia molestias repellat, praesentium velit consectetur facilis non rerum eos rem officiis minima laudantium quas cumque quasi inventore nobis laborum atque dolorum! Nesciunt error temporibus nihil iure laboriosam officiis reprehenderit explicabo ex, dolores aut eum natus deleniti, debitis dolor labore eveniet impedit! Cumque labore voluptates quibusdam earum id praesentium asperiores dolore, vitae est in, possimus, aliquid sit. Perferendis neque ea veritatis mollitia sequi pariatur.",
                        likesNumber: 999,
                        createdAt: new Date(),
                    },
                    {
                        _id: "4567",
                        author: {
                            name: "Петя",
                        },
                        content:
                            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, voluptate, provident iste illo velit eius sed numquam porro similique, dolore quisquam saepe dolorum corrupti beatae quos deserunt nostrum laboriosam nihil earum libero. Esse delectus harum dignissimos quia molestias repellat, praesentium velit consectetur facilis non rerum eos rem officiis minima laudantium quas cumque quasi inventore nobis laborum atque dolorum! Nesciunt error temporibus nihil iure laboriosam officiis reprehenderit explicabo ex, dolores aut eum natus deleniti, debitis dolor labore eveniet impedit! Cumque labore voluptates quibusdam earum id praesentium asperiores dolore, vitae est in, possimus, aliquid sit. Perferendis neque ea veritatis mollitia sequi pariatur.",
                        likesNumber: 999,
                        createdAt: new Date(),
                    },
                    {
                        _id: "4567",
                        author: {
                            name: "Петя",
                        },
                        content:
                            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, voluptate, provident iste illo velit eius sed numquam porro similique, dolore quisquam saepe dolorum corrupti beatae quos deserunt nostrum laboriosam nihil earum libero. Esse delectus harum dignissimos quia molestias repellat, praesentium velit consectetur facilis non rerum eos rem officiis minima laudantium quas cumque quasi inventore nobis laborum atque dolorum! Nesciunt error temporibus nihil iure laboriosam officiis reprehenderit explicabo ex, dolores aut eum natus deleniti, debitis dolor labore eveniet impedit! Cumque labore voluptates quibusdam earum id praesentium asperiores dolore, vitae est in, possimus, aliquid sit. Perferendis neque ea veritatis mollitia sequi pariatur.",
                        likesNumber: 999,
                        createdAt: new Date(),
                    },
                    {
                        _id: "4567",
                        author: {
                            name: "Петя",
                        },
                        content:
                            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, voluptate, provident iste illo velit eius sed numquam porro similique, dolore quisquam saepe dolorum corrupti beatae quos deserunt nostrum laboriosam nihil earum libero. Esse delectus harum dignissimos quia molestias repellat, praesentium velit consectetur facilis non rerum eos rem officiis minima laudantium quas cumque quasi inventore nobis laborum atque dolorum! Nesciunt error temporibus nihil iure laboriosam officiis reprehenderit explicabo ex, dolores aut eum natus deleniti, debitis dolor labore eveniet impedit! Cumque labore voluptates quibusdam earum id praesentium asperiores dolore, vitae est in, possimus, aliquid sit. Perferendis neque ea veritatis mollitia sequi pariatur.",
                        likesNumber: 999,
                        createdAt: new Date(),
                    },
                ],
            },
        ],
    },
};
