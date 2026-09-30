import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';

const homepage=new URL('../index.html',import.meta.url);

test('homepage keeps service primary and prominently routes to the V1 visualizer',async()=>{
  const html=await readFile(homepage,'utf8');

  assert.match(html,/class="btn btn-primary" href="\/contact">Get Garage Door Help<\/a>/);
  assert.match(html,/class="btn btn-outline hero-visualizer-btn" href="\/garage-door-brands#ai-visualizer">Visualize Your Door<\/a>/);
  assert.match(html,/class="home-visualizer" aria-labelledby="home-visualizer-heading"/);
  assert.match(html,/LIFTX AI Visualizer/);
  assert.match(html,/See It Before You Buy It\./);
  assert.match(html,/Visualize My Garage/);
  assert.match(html,/Upload your home/);
  assert.match(html,/See your concept \+ real product matches/);
  assert.match(html,/Send it to LIFTX for a quote/);
});
