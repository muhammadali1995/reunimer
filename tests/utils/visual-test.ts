import { expect, type Page } from '@playwright/test';

interface VisualTestOptions {
  /** URL path to navigate to, e.g. "/" or "/ui-preview" */
  path: string;
  /** CSS selector for the section to screenshot */
  selector: string;
  /** Name used for the screenshot file (must be unique per test) */
  name: string;
  /** Extra time in ms to wait after load (default: 500) */
  settleTime?: number;
}

/**
 * Reusable visual regression helper.
 *
 * 1. Navigates to `path`
 * 2. Waits for network idle + fonts + images to finish loading
 * 3. Scrolls the target `selector` into view
 * 4. Takes a screenshot of that element
 * 5. Compares against the stored reference snapshot (or creates one on first run)
 */
export async function visualTest(page: Page, options: VisualTestOptions) {
  const { path, selector, name, settleTime = 500 } = options;

  // Navigate and wait for network to settle
  await page.goto(path, { waitUntil: 'networkidle' });

  // Wait for all fonts to be loaded
  await page.evaluate(() => document.fonts.ready);

  // Wait for every <img> on the page to finish loading
  await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return Promise.all(
      imgs.map(
        (img) =>
          img.complete
            ? Promise.resolve()
            : new Promise<void>((resolve) => {
                img.addEventListener('load', () => resolve(), { once: true });
                img.addEventListener('error', () => resolve(), { once: true });
              }),
      ),
    );
  });

  // Small extra settle time for CSS transitions / paints
  await page.waitForTimeout(settleTime);

  // Find the element and scroll it into view
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible', timeout: 10_000 });
  await element.scrollIntoViewIfNeeded();

  // Another brief pause after scroll for any lazy-loaded content
  await page.waitForTimeout(200);

  // Screenshot comparison — creates reference on first run, compares on subsequent runs
  await expect(element).toHaveScreenshot(`${name}.png`, {
    animations: 'disabled',
  });
}
