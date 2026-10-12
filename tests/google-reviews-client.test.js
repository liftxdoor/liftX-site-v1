import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const scriptUrl = new URL('../google-reviews.js', import.meta.url);

test('homepage loads the live review client exactly once after its required markup', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const scripts = html.match(/<script\b[^>]*\bsrc=["']\/google-reviews\.js["'][^>]*>/g) || [];
  assert.equal(scripts.length, 1);
  assert.match(scripts[0], /\bdefer\b/);
  assert.ok(html.indexOf('id="google-review-carousel"') < html.indexOf(scripts[0]));
  assert.match(html, /id="google-review-summary"/);
});

test('homepage proof and review links are hydrated from the live reviews response', async () => {
  const source = await readFile(scriptUrl, 'utf8');

  assert.match(source, /\.google-proof-rating strong/);
  assert.match(source, /\.google-proof-rating > span:last-child/);
  assert.match(source, /compactRating\.textContent = rating\.toFixed\(1\)/);
  assert.match(source, /compactCount\.textContent =/);
  assert.match(source, /\.hero-google-proof/);
  assert.match(source, /setReviewLinks\(data\.googleMapsUri\)/);
  assert.match(source, /cache:\s*'no-store'/);
});

