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
                commentId: "1234",
                userName: "АдмиралИванФедоровичКурзенштерн",
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, voluptate, provident iste illo velit eius sed numquam porro similique, dolore quisquam saepe dolorum corrupti beatae quos deserunt nostrum laboriosam nihil earum libero. Esse delectus harum dignissimos quia molestias repellat, praesentium velit consectetur facilis non rerum eos rem officiis minima laudantium quas cumque quasi inventore nobis laborum atque dolorum! Nesciunt error temporibus nihil iure laboriosam officiis reprehenderit explicabo ex, dolores aut eum natus deleniti, debitis dolor labore eveniet impedit! Cumque labore voluptates quibusdam earum id praesentium asperiores dolore, vitae est in, possimus, aliquid sit. Perferendis neque ea veritatis mollitia sequi pariatur.",
                likesNumber: 999,
                date: new Date(),
                replies: [
                    {
                        commentId: "2345",
                        userName: "Человек и пароход-пароход",
                        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, voluptate, provident iste illo velit eius sed numquam porro similique, dolore quisquam saepe dolorum corrupti beatae quos deserunt nostrum laboriosam nihil earum libero. Esse delectus harum dignissimos quia molestias repellat, praesentium velit consectetur facilis non rerum eos rem officiis minima laudantium quas cumque quasi inventore nobis laborum atque dolorum! Nesciunt error temporibus nihil iure laboriosam officiis reprehenderit explicabo ex, dolores aut eum natus deleniti, debitis dolor labore eveniet impedit! Cumque labore voluptates quibusdam earum id praesentium asperiores dolore, vitae est in, possimus, aliquid sit. Perferendis neque ea veritatis mollitia sequi pariatur.",
                        likesNumber: 55555555555555,
                        date: new Date(),
                    },
                ],
            },
            {
                commentId: "3456",
                userName: "Федя",
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, voluptate, provident iste illo velit eius sed numquam porro similique, dolore quisquam saepe dolorum corrupti beatae quos deserunt nostrum laboriosam nihil earum libero. Esse delectus harum dignissimos quia molestias repellat, praesentium velit consectetur facilis non rerum eos rem officiis minima laudantium quas cumque quasi inventore nobis laborum atque dolorum! Nesciunt error temporibus nihil iure laboriosam officiis reprehenderit explicabo ex, dolores aut eum natus deleniti, debitis dolor labore eveniet impedit! Cumque labore voluptates quibusdam earum id praesentium asperiores dolore, vitae est in, possimus, aliquid sit. Perferendis neque ea veritatis mollitia sequi pariatur.",
                likesNumber: 55555555555555,
                date: new Date(),
                replies: [
                    {
                        commentId: "4567",
                        userName: "Петя",
                        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, voluptate, provident iste illo velit eius sed numquam porro similique, dolore quisquam saepe dolorum corrupti beatae quos deserunt nostrum laboriosam nihil earum libero. Esse delectus harum dignissimos quia molestias repellat, praesentium velit consectetur facilis non rerum eos rem officiis minima laudantium quas cumque quasi inventore nobis laborum atque dolorum! Nesciunt error temporibus nihil iure laboriosam officiis reprehenderit explicabo ex, dolores aut eum natus deleniti, debitis dolor labore eveniet impedit! Cumque labore voluptates quibusdam earum id praesentium asperiores dolore, vitae est in, possimus, aliquid sit. Perferendis neque ea veritatis mollitia sequi pariatur.",
                        likesNumber: 999,
                        date: new Date(),
                    },
                    {
                        commentId: "4567",
                        userName: "Петя",
                        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, voluptate, provident iste illo velit eius sed numquam porro similique, dolore quisquam saepe dolorum corrupti beatae quos deserunt nostrum laboriosam nihil earum libero. Esse delectus harum dignissimos quia molestias repellat, praesentium velit consectetur facilis non rerum eos rem officiis minima laudantium quas cumque quasi inventore nobis laborum atque dolorum! Nesciunt error temporibus nihil iure laboriosam officiis reprehenderit explicabo ex, dolores aut eum natus deleniti, debitis dolor labore eveniet impedit! Cumque labore voluptates quibusdam earum id praesentium asperiores dolore, vitae est in, possimus, aliquid sit. Perferendis neque ea veritatis mollitia sequi pariatur.",
                        likesNumber: 999,
                        date: new Date(),
                    },
                    {
                        commentId: "4567",
                        userName: "Петя",
                        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, voluptate, provident iste illo velit eius sed numquam porro similique, dolore quisquam saepe dolorum corrupti beatae quos deserunt nostrum laboriosam nihil earum libero. Esse delectus harum dignissimos quia molestias repellat, praesentium velit consectetur facilis non rerum eos rem officiis minima laudantium quas cumque quasi inventore nobis laborum atque dolorum! Nesciunt error temporibus nihil iure laboriosam officiis reprehenderit explicabo ex, dolores aut eum natus deleniti, debitis dolor labore eveniet impedit! Cumque labore voluptates quibusdam earum id praesentium asperiores dolore, vitae est in, possimus, aliquid sit. Perferendis neque ea veritatis mollitia sequi pariatur.",
                        likesNumber: 999,
                        date: new Date(),
                    },
                    {
                        commentId: "4567",
                        userName: "Петя",
                        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, voluptate, provident iste illo velit eius sed numquam porro similique, dolore quisquam saepe dolorum corrupti beatae quos deserunt nostrum laboriosam nihil earum libero. Esse delectus harum dignissimos quia molestias repellat, praesentium velit consectetur facilis non rerum eos rem officiis minima laudantium quas cumque quasi inventore nobis laborum atque dolorum! Nesciunt error temporibus nihil iure laboriosam officiis reprehenderit explicabo ex, dolores aut eum natus deleniti, debitis dolor labore eveniet impedit! Cumque labore voluptates quibusdam earum id praesentium asperiores dolore, vitae est in, possimus, aliquid sit. Perferendis neque ea veritatis mollitia sequi pariatur.",
                        likesNumber: 999,
                        date: new Date(),
                    },
                    {
                        commentId: "4567",
                        userName: "Петя",
                        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, voluptate, provident iste illo velit eius sed numquam porro similique, dolore quisquam saepe dolorum corrupti beatae quos deserunt nostrum laboriosam nihil earum libero. Esse delectus harum dignissimos quia molestias repellat, praesentium velit consectetur facilis non rerum eos rem officiis minima laudantium quas cumque quasi inventore nobis laborum atque dolorum! Nesciunt error temporibus nihil iure laboriosam officiis reprehenderit explicabo ex, dolores aut eum natus deleniti, debitis dolor labore eveniet impedit! Cumque labore voluptates quibusdam earum id praesentium asperiores dolore, vitae est in, possimus, aliquid sit. Perferendis neque ea veritatis mollitia sequi pariatur.",
                        likesNumber: 999,
                        date: new Date(),
                    },
                ],
            },
        ],
    },
};
