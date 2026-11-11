import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: '.',
    timeout: 30000,
    retries: 1,
    use: {
        baseURL: 'http://localhost:3000',
        headless: true,
        trace: 'retain-on-failure',
    },
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
    // В CI нужен html-отчёт для артефактов, локально достаточно списка.
    reporter: process.env.CI ? [['dot'], ['html', { open: 'never' }]] : 'list',
    // Проверяем production-сборку, а не dev-сервер: dev-режим скрывает
    // ошибки гидрации и отдаёт другой бандл.
    webServer: {
        command: 'pnpm start',
        port: 3000,
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
    },
});
