/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
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
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

module.exports = nextConfig;
