import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { PopupTrigger } from "./PopupTrigger";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: "UI",
    component: PopupTrigger,
} satisfies Meta<typeof PopupTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const PopupWithTrigger: Story = {};
