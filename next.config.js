/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        // remotePatterns: [
        //     {
        //         protocol: "https",
        //         hostname: "fra1.digitaloceanspaces.com",
        //         port: "",
        //         pathname: "/gowithme/**",
        //     },
        //     {
        //         protocol: "https",
        //         hostname: "lh3.googleusercontent.com",
        //         port: "",
        //         pathname: "/**",
        //     },
        //     {
        //         protocol: "https",
        //         hostname: "platform-lookaside.fbsbx.com",
        //         port: "",
        //         pathname: "/**",
        //     },
        //     {
        //         protocol: "https",
        //         hostname: "abs.twimg.com",
        //         port: "",
        //         pathname: "/**",
        //     },
        // ],
        // зарешаем загрузку изображений со всех доменов.
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },

    webpack(config) {
        const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));

        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },

            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: ["@svgr/webpack"],
            },
        );

        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },
};

module.exports = nextConfig;
