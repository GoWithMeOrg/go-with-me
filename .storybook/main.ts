import path from "path";

import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

    addons: [
        "@storybook/addon-onboarding",
        "@storybook/addon-links",
        "@storybook/addon-docs"
    ],

    framework: {
        name: "@storybook/nextjs",
        options: {},
    },

    staticDirs: ["../public"],

    webpackFinal: async (config) => {
        config.resolve = config.resolve || {};
        config.resolve.alias = {
            ...config.resolve.alias,
            "@/components": path.resolve(__dirname, "../src/components"),
        };

        return config;
    }
};
export default config;
