import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "@/components/shared/Avatar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: "UI/Avatar",
    component: Avatar,
} satisfies Meta<typeof Avatar>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AvatarWithText: Story = {
    args: {
        name: "User",
        scale: 1,
    },
};

export const AvatarWithImage: Story = {
    args: {
        name: "User",
        scale: 3,
        image: "https://radiovan.fm/uploads/article/1935cb7c8dc5d25a_5cb7c8dc5a28f.jpg",
    },
};
