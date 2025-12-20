import { test, expect } from '@playwright/test';

test.describe('App Smoke Tests', () => {
    test('should load the app successfully', async ({ page }) => {
        await page.goto('/', { waitUntil: 'networkidle' });

        // Check if the welcome message is visible
        await expect(page.locator('text=Willkommen bei Anamatic!')).toBeVisible({ timeout: 10000 });

        // Check if the play button exists
        const playButton = page.locator('button:has-text("Spielen")');
        await expect(playButton).toBeVisible();
    });

    test('should navigate to game page', async ({ page }) => {
        await page.goto('/', { waitUntil: 'networkidle' });

        // Wait for the button to be visible and clickable
        const playButton = page.locator('button:has-text("Spielen")');
        await expect(playButton).toBeVisible({ timeout: 10000 });

        // Click the play button
        await playButton.click();

        // Wait for navigation
        await page.waitForURL('**/game');

        // Verify we're on the game page (check for game-specific elements)
        // The actual content will depend on your game component structure
        await expect(page).toHaveURL(/\/game/);
    });
});
