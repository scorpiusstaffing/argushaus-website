/**
 * Argushaus logo builder
 * Converts Switzer text -> SVG paths so logos are fully portable (no webfont dep)
 */
import opentype from 'opentype.js';
import fs from 'node:fs';
import path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const INK   = '#0A0A0C';
const CREAM = '#EFEBE1';
const RED   = '#C8362A';

const font = opentype.loadSync(path.join(__dirname, 'raw/switzer-600.ttf'));

// ---------- helpers ----------
function makePath(text, fontSize, x = 0, y = 0, fill = INK, letterSpacing = 0) {
  const glyphs = font.stringToGlyphs(text);
  const scale = (1 / font.unitsPerEm) * fontSize;
  let cursor = x;
  const parts = [];
  for (let i = 0; i < glyphs.length; i++) {
    const g = glyphs[i];
    const p = g.getPath(cursor, y, fontSize);
    p.fill = fill;
    parts.push(p.toPathData(3));
    cursor += g.advanceWidth * scale + letterSpacing;
  }
  return { paths: parts, advanceTo: cursor };
}

function buildWordmark({ text = 'Argushaus', fontSize = 100, dotColor = RED, textColor = INK }) {
  const ls = -fontSize * 0.005; // letter-spacing matches site (-0.005em)
  const baseline = fontSize * 0.78;

  const main = makePath(text, fontSize, 0, baseline, textColor, ls);
  const dot  = makePath('.', fontSize, main.advanceTo, baseline, dotColor, ls);

  const totalWidth  = dot.advanceTo;
  const totalHeight = fontSize;

  const mainD = main.paths.join(' ');
  const dotD  = dot.paths.join(' ');

  return { mainD, dotD, totalWidth, totalHeight };
}

function buildMonogram({ text = 'A', fontSize = 100, dotColor = RED, textColor = INK }) {
  const baseline = fontSize * 0.78;
  const main = makePath(text, fontSize, 0, baseline, textColor, 0);
  const dot  = makePath('.', fontSize, main.advanceTo, baseline, dotColor, 0);
  return {
    mainD: main.paths.join(' '),
    dotD:  dot.paths.join(' '),
    totalWidth:  dot.advanceTo,
    totalHeight: fontSize
  };
}

function wrapSvg({ width, height, viewBox, bg, content }) {
  const bgRect = bg ? `<rect width="100%" height="100%" fill="${bg}"/>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${viewBox}">
${bgRect}
${content}
</svg>
`;
}

// ---------- generate ----------
const out = path.join(__dirname);
const ensure = d => fs.mkdirSync(d, { recursive: true });

// 1. PRIMARY WORDMARK on transparent (ink black + red dot)
{
  const fs100 = 100;
  const w = buildWordmark({ fontSize: fs100, dotColor: RED, textColor: INK });
  const pad = fs100 * 0.2;
  const W = w.totalWidth + pad * 2;
  const H = fs100 + pad * 2;
  const svg = wrapSvg({
    width: W, height: H,
    viewBox: `0 0 ${W} ${H}`,
    content: `<g transform="translate(${pad}, ${pad})"><path d="${w.mainD}" fill="${INK}"/><path d="${w.dotD}" fill="${RED}"/></g>`
  });
  fs.writeFileSync(path.join(out, 'argushaus-wordmark.svg'), svg);
}

// 2. WORDMARK on cream (full bleed with bg)
{
  const fs100 = 100;
  const w = buildWordmark({ fontSize: fs100, dotColor: RED, textColor: INK });
  const pad = fs100 * 0.4;
  const W = w.totalWidth + pad * 2;
  const H = fs100 + pad * 2;
  const svg = wrapSvg({
    width: W, height: H, viewBox: `0 0 ${W} ${H}`,
    bg: CREAM,
    content: `<g transform="translate(${pad}, ${pad})"><path d="${w.mainD}" fill="${INK}"/><path d="${w.dotD}" fill="${RED}"/></g>`
  });
  fs.writeFileSync(path.join(out, 'argushaus-wordmark-on-cream.svg'), svg);
}

// 3. WORDMARK light (cream text + red dot) — for dark backgrounds
{
  const fs100 = 100;
  const w = buildWordmark({ fontSize: fs100, dotColor: RED, textColor: CREAM });
  const pad = fs100 * 0.2;
  const W = w.totalWidth + pad * 2;
  const H = fs100 + pad * 2;
  const svg = wrapSvg({
    width: W, height: H, viewBox: `0 0 ${W} ${H}`,
    content: `<g transform="translate(${pad}, ${pad})"><path d="${w.mainD}" fill="${CREAM}"/><path d="${w.dotD}" fill="${RED}"/></g>`
  });
  fs.writeFileSync(path.join(out, 'argushaus-wordmark-light.svg'), svg);
}

// 4. WORDMARK on dark (ink BG + cream text + red dot)
{
  const fs100 = 100;
  const w = buildWordmark({ fontSize: fs100, dotColor: RED, textColor: CREAM });
  const pad = fs100 * 0.4;
  const W = w.totalWidth + pad * 2;
  const H = fs100 + pad * 2;
  const svg = wrapSvg({
    width: W, height: H, viewBox: `0 0 ${W} ${H}`,
    bg: INK,
    content: `<g transform="translate(${pad}, ${pad})"><path d="${w.mainD}" fill="${CREAM}"/><path d="${w.dotD}" fill="${RED}"/></g>`
  });
  fs.writeFileSync(path.join(out, 'argushaus-wordmark-on-dark.svg'), svg);
}

// 5. MONOGRAM "A." — square, transparent
{
  const fs100 = 200;
  const m = buildMonogram({ fontSize: fs100, dotColor: RED, textColor: INK });
  const side = 280;
  const xOffset = (side - m.totalWidth) / 2;
  const yOffset = (side - fs100) / 2;
  const svg = wrapSvg({
    width: side, height: side, viewBox: `0 0 ${side} ${side}`,
    content: `<g transform="translate(${xOffset}, ${yOffset})"><path d="${m.mainD}" fill="${INK}"/><path d="${m.dotD}" fill="${RED}"/></g>`
  });
  fs.writeFileSync(path.join(out, 'argushaus-monogram.svg'), svg);
}

// 6. MONOGRAM "A." on cream (square)
{
  const fs100 = 200;
  const m = buildMonogram({ fontSize: fs100, dotColor: RED, textColor: INK });
  const side = 320;
  const xOffset = (side - m.totalWidth) / 2;
  const yOffset = (side - fs100) / 2;
  const svg = wrapSvg({
    width: side, height: side, viewBox: `0 0 ${side} ${side}`,
    bg: CREAM,
    content: `<g transform="translate(${xOffset}, ${yOffset})"><path d="${m.mainD}" fill="${INK}"/><path d="${m.dotD}" fill="${RED}"/></g>`
  });
  fs.writeFileSync(path.join(out, 'argushaus-monogram-on-cream.svg'), svg);
}

// 7. MONOGRAM "A." on ink (square)
{
  const fs100 = 200;
  const m = buildMonogram({ fontSize: fs100, dotColor: RED, textColor: CREAM });
  const side = 320;
  const xOffset = (side - m.totalWidth) / 2;
  const yOffset = (side - fs100) / 2;
  const svg = wrapSvg({
    width: side, height: side, viewBox: `0 0 ${side} ${side}`,
    bg: INK,
    content: `<g transform="translate(${xOffset}, ${yOffset})"><path d="${m.mainD}" fill="${CREAM}"/><path d="${m.dotD}" fill="${RED}"/></g>`
  });
  fs.writeFileSync(path.join(out, 'argushaus-monogram-on-dark.svg'), svg);
}

// 8. FAVICON optimized (16/32 ready)
{
  const fs100 = 24;
  const m = buildMonogram({ fontSize: fs100, dotColor: RED, textColor: INK });
  const side = 32;
  const xOffset = (side - m.totalWidth) / 2;
  const yOffset = (side - fs100) / 2 + 1;
  const svg = wrapSvg({
    width: side, height: side, viewBox: `0 0 ${side} ${side}`,
    bg: CREAM,
    content: `<g transform="translate(${xOffset}, ${yOffset})"><path d="${m.mainD}" fill="${INK}"/><path d="${m.dotD}" fill="${RED}"/></g>`
  });
  fs.writeFileSync(path.join(out, 'argushaus-favicon.svg'), svg);
}

// 9. WORDMARK WITHOUT DOT — for cases where the dot conflicts (eg. filename ext)
{
  const fs100 = 100;
  const w = buildWordmark({ fontSize: fs100, dotColor: 'transparent', textColor: INK });
  const pad = fs100 * 0.2;
  const main = makePath('Argushaus', fs100, 0, fs100 * 0.78, INK, -fs100 * 0.005);
  const W = main.advanceTo + pad * 2;
  const H = fs100 + pad * 2;
  const svg = wrapSvg({
    width: W, height: H, viewBox: `0 0 ${W} ${H}`,
    content: `<g transform="translate(${pad}, ${pad})"><path d="${main.paths.join(' ')}" fill="${INK}"/></g>`
  });
  fs.writeFileSync(path.join(out, 'argushaus-wordmark-nodot.svg'), svg);
}

console.log('All logo variants generated.');
console.log('Files:');
fs.readdirSync(out).filter(f => f.endsWith('.svg')).forEach(f => {
  const stat = fs.statSync(path.join(out, f));
  console.log(`  ${f}  (${stat.size} bytes)`);
});
