/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
    allowedDevOrigins: ['tribeplans.dev', 'dev.tribeplans.ru'],
    output: 'standalone',
    // Корень трассировки задаём явно: без него Next угадывает его по
    // маркерам вверх по дереву, и раскладка standalone может измениться
    // при появлении новых файлов рядом (лок-файл, workspace-конфиг).
    outputFileTracingRoot: path.join(__dirname, '../../'),
    // packages/shared поставляется TS-исходниками без шага сборки,
    // поэтому Next должен компилировать его сам.
    transpilePackages: ['@go-with-me/shared'],
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },

    // SVG обрабатывает Turbopack (см. turbopack.rules ниже): в Next 16 сборка
    // идёт через Turbopack по умолчанию, и кастомный webpack-конфиг игнорируется.
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
