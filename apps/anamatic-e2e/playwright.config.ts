import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './src',
    fullyParallel: true,
    forbidOnly: !!process.env['CI'],
    retries: process.env['CI'] ? 2 : 0,
    workers: process.env['CI'] ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:4200/play-anamatic',
        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],

    // Comment out webServer since we'll run the app separately
    // webServer: {
    //     command: 'yarn start:frontend',
    //     url: 'http://localhost:4200',
    //     reuseExistingServer: !process.env['CI'],
    //     timeout: 120 * 1000,
    // },
});
