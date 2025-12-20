import { test, expect } from '@playwright/test';

test.describe('Leaderboard Debug', () => {
    test('should debug what is on the page', async ({ page }) => {
        // Set a longer timeout
        test.setTimeout(60000);

        // Navigate to the app
        console.log('Navigating to home page...');
        await page.goto('http://localhost:4200/play-anamatic/', { waitUntil: 'networkidle' });

        // Take a screenshot
        await page.screenshot({ path: 'test-results/home-page.png' });

        // Print the page content
        const content = await page.content();
        console.log('Page HTML length:', content.length);
        console.log('Page title:', await page.title());

        // Try to find any text on the page
        const bodyText = await page.locator('body').textContent();
        console.log('Body text:', bodyText?.substring(0, 500));

        // Check what we can find
        const willkommenExists = await page.locator('text=Willkommen').count();
        const anamaticExists = await page.locator('text=Anamatic').count();
        console.log('Willkommen count:', willkommenExists);
        console.log('Anamatic count:', anamaticExists);

        // Try the leaderboard page
        console.log('\nNavigating to leaderboard page...');
        await page.goto('http://localhost:4200/play-anamatic/leaderboard', { waitUntil: 'networkidle' });
        await page.screenshot({ path: 'test-results/leaderboard-page.png' });

        const leaderboardContent = await page.locator('body').textContent();
        console.log('Leaderboard body text:', leaderboardContent?.substring(0, 500));
    });
});
