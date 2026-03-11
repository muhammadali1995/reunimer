/**
 * Pixel-perfect comparison script for Navbar.
 *
 * 1. Opens the Figma reference HTML, screenshots the #navbar element
 * 2. Opens the Astro dev server, screenshots the #navbar element
 * 3. Normalizes both to the same dimensions
 * 4. Runs pixelmatch, saves diff image, reports percentage
 */

import { chromium } from '@playwright/test';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIGMA_REF = resolve(__dirname, 'screenshots/figma/navbar-reference.html');
const ACTUAL_PATH = resolve(__dirname, 'screenshots/actual/navbar.png');
const FIGMA_PATH = resolve(__dirname, 'screenshots/figma/navbar.png');
const DIFF_PATH = resolve(__dirname, 'screenshots/diff/navbar.png');

// Ensure dirs
for (const p of [ACTUAL_PATH, FIGMA_PATH, DIFF_PATH]) {
  mkdirSync(dirname(p), { recursive: true });
}

async function captureElement(page, selector, saveTo) {
  const el = page.locator(selector);
  await el.waitFor({ state: 'visible', timeout: 10000 });
  await el.screenshot({ path: saveTo, animations: 'disabled' });
  console.log(`  Saved: ${saveTo}`);
}

async function main() {
  const browser = await chromium.launch();

  // --- 1. Capture Figma reference ---
  console.log('\n1. Capturing Figma reference...');
  const ctxFigma = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const pageFigma = await ctxFigma.newPage();
  await pageFigma.goto(`file://${FIGMA_REF}`, { waitUntil: 'networkidle' });
  await pageFigma.evaluate(() => document.fonts.ready);
  await pageFigma.waitForTimeout(1000);
  await captureElement(pageFigma, '#navbar', FIGMA_PATH);
  await ctxFigma.close();

  // --- 2. Capture actual implementation ---
  console.log('\n2. Capturing actual implementation...');
  const ctxActual = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const pageActual = await ctxActual.newPage();
  await pageActual.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await pageActual.evaluate(() => document.fonts.ready);
  await pageActual.waitForTimeout(1000);
  await captureElement(pageActual, '#navbar', ACTUAL_PATH);
  await ctxActual.close();

  await browser.close();

  // --- 3. Compare ---
  console.log('\n3. Comparing...');
  const imgFigma = PNG.sync.read(readFileSync(FIGMA_PATH));
  const imgActual = PNG.sync.read(readFileSync(ACTUAL_PATH));

  // Resize to match (use the larger dimensions)
  const width = Math.max(imgFigma.width, imgActual.width);
  const height = Math.max(imgFigma.height, imgActual.height);

  function padImage(img, w, h) {
    const padded = new PNG({ width: w, height: h });
    // Fill with white
    for (let i = 0; i < padded.data.length; i += 4) {
      padded.data[i] = 255;
      padded.data[i + 1] = 255;
      padded.data[i + 2] = 255;
      padded.data[i + 3] = 255;
    }
    PNG.bitblt(img, padded, 0, 0, img.width, img.height, 0, 0);
    return padded;
  }

  const figmaPadded = padImage(imgFigma, width, height);
  const actualPadded = padImage(imgActual, width, height);
  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(
    figmaPadded.data,
    actualPadded.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 }
  );

  writeFileSync(DIFF_PATH, PNG.sync.write(diff));

  const totalPixels = width * height;
  const diffPercent = ((numDiffPixels / totalPixels) * 100).toFixed(2);

  console.log(`\n========================================`);
  console.log(`  Figma size:  ${imgFigma.width}x${imgFigma.height}`);
  console.log(`  Actual size: ${imgActual.width}x${imgActual.height}`);
  console.log(`  Canvas size: ${width}x${height}`);
  console.log(`  Diff pixels: ${numDiffPixels} / ${totalPixels}`);
  console.log(`  Diff:        ${diffPercent}%`);
  console.log(`  Diff image:  ${DIFF_PATH}`);
  console.log(`========================================\n`);

  if (parseFloat(diffPercent) > 10) {
    console.log('❌ FAIL: Diff > 10%. Needs fixes.\n');
    process.exit(1);
  } else {
    console.log('✅ PASS: Diff ≤ 10%.\n');
    process.exit(0);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
