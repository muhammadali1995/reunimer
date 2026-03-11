import { test } from '@playwright/test';
import { visualTest } from './utils/visual-test';

test('navbar renders correctly', async ({ page }) => {
  await visualTest(page, {
    path: '/',
    selector: '#navbar',
    name: 'navbar',
  });
});
