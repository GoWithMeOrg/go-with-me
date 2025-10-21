import React from "react";
import type { Preview } from "@storybook/nextjs";
import { Inter } from "next/font/google";

import "../src/styles/global.css";

const inter = Inter({
    style: ["normal"],
    subsets: ["latin"],
    display: "swap",
});

const preview: Preview = {
    decorators: [
        (Story, context) => {
            console.log(context);
            return (
                <div className={inter.className}>
                    <Story />
                </div>
            );
        },
    ],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
