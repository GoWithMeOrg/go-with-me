import type { Meta, StoryObj } from "@storybook/react";
import { Comment } from "./Comment";

const meta = {
    title: "UI/Comment",
    component: Comment,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof Comment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CommentComponent: Story = {
    args: {
        commentId: "1234",
        userName: "АдмиралИванФедоровичКурзенштерн",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, voluptate, provident iste illo velit eius sed numquam porro similique, dolore quisquam saepe dolorum corrupti beatae quos deserunt nostrum laboriosam nihil earum libero. Esse delectus harum dignissimos quia molestias repellat, praesentium velit consectetur facilis non rerum eos rem officiis minima laudantium quas cumque quasi inventore nobis laborum atque dolorum! Nesciunt error temporibus nihil iure laboriosam officiis reprehenderit explicabo ex, dolores aut eum natus deleniti, debitis dolor labore eveniet impedit! Cumque labore voluptates quibusdam earum id praesentium asperiores dolore, vitae est in, possimus, aliquid sit. Perferendis neque ea veritatis mollitia sequi pariatur.",
        likesNumber: 999,
    },
};
