/**
 * Argushaus logo PNG exports
 * Renders SVGs to PNG at standard sizes for social, email, presentations.
 */
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const exports = [
  // [source svg, output png, target width, fitTo]
  { src: 'argushaus-monogram-on-cream.svg',  out: 'png/argushaus-monogram-400.png',         width: 400 },
  { src: 'argushaus-monogram-on-cream.svg',  out: 'png/argushaus-monogram-1080.png',        width: 1080 },
  { src: 'argushaus-monogram-on-dark.svg',   out: 'png/argushaus-monogram-dark-1080.png',   width: 1080 },
  { src: 'argushaus-wordmark.svg',           out: 'png/argushaus-wordmark-2000.png',        width: 2000 },
  { src: 'argushaus-wordmark-on-cream.svg',  out: 'png/argushaus-wordmark-on-cream-2000.png', width: 2000 },
  { src: 'argushaus-wordmark-on-dark.svg',   out: 'png/argushaus-wordmark-on-dark-2000.png', width: 2000 },
  { src: 'argushaus-wordmark-light.svg',     out: 'png/argushaus-wordmark-light-2000.png',  width: 2000 },
  // Favicons
  { src: 'argushaus-favicon.svg',            out: 'png/favicon-32.png',                     width: 32 },
  { src: 'argushaus-favicon.svg',            out: 'png/favicon-180.png',                    width: 180 }, // apple-touch-icon
];

// OG image — special composition (1200x630 with wordmark centered on cream)
function buildOgSvg() {
  const ink = '#0A0A0C';
  const cream = '#EFEBE1';
  const red = '#C8362A';
  // Embed wordmark SVG inline at correct scale
  const wordmarkSvg = fs.readFileSync(path.join(__dirname, 'argushaus-wordmark.svg'), 'utf8');
  // Extract just the inner content (paths) of the wordmark
  const match = wordmarkSvg.match(/<svg[^>]*viewBox="([^"]+)"[^>]*>([\s\S]*?)<\/svg>/);
  if (!match) throw new Error('Could not parse wordmark SVG');
  const [, vb, inner] = match;
  const [, , vw, vh] = vb.split(' ').map(Number);

  // Scale to fit nicely in 1200x630
  const targetW = 900;
  const scale = targetW / vw;
  const scaledH = vh * scale;
  const offsetX = (1200 - targetW) / 2;
  const offsetY = (630 - scaledH) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${cream}"/>
  <g transform="translate(${offsetX}, ${offsetY}) scale(${scale})">${inner}</g>
  <text x="80" y="565" font-family="Switzer, Helvetica, sans-serif" font-size="22" font-weight="500" fill="${ink}" opacity="0.6" letter-spacing="3" text-transform="uppercase">SENIOR AI TALENT · GERMAN CONSULTANCIES</text>
</svg>`;
}

// Square 1080 social card with wordmark + tagline
function buildSocialSquareSvg() {
  const ink = '#0A0A0C';
  const cream = '#EFEBE1';
  const wordmarkSvg = fs.readFileSync(path.join(__dirname, 'argushaus-wordmark.svg'), 'utf8');
  const match = wordmarkSvg.match(/<svg[^>]*viewBox="([^"]+)"[^>]*>([\s\S]*?)<\/svg>/);
  const [, vb, inner] = match;
  const [, , vw, vh] = vb.split(' ').map(Number);
  const targetW = 800;
  const scale = targetW / vw;
  const scaledH = vh * scale;
  const offsetX = (1080 - targetW) / 2;
  const offsetY = (1080 - scaledH) / 2 - 40;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
  <rect width="1080" height="1080" fill="${cream}"/>
  <g transform="translate(${offsetX}, ${offsetY}) scale(${scale})">${inner}</g>
  <text x="540" y="${offsetY + scaledH + 80}" font-family="Switzer, Helvetica, sans-serif" font-size="26" font-weight="500" fill="${ink}" opacity="0.55" text-anchor="middle" letter-spacing="4">SENIOR AI TALENT · GERMAN CONSULTANCIES</text>
</svg>`;
}

// Ensure output dir
fs.mkdirSync(path.join(__dirname, 'png'), { recursive: true });

// Render simple exports
for (const e of exports) {
  const svgPath = path.join(__dirname, e.src);
  const outPath = path.join(__dirname, e.out);
  const svg = fs.readFileSync(svgPath);
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: e.width },
    background: 'rgba(0,0,0,0)',
  });
  const pngData = resvg.render().asPng();
  fs.writeFileSync(outPath, pngData);
  console.log(`✓ ${e.out}  ${e.width}px wide`);
}

// Render OG image
{
  const og = buildOgSvg();
  fs.writeFileSync(path.join(__dirname, 'argushaus-og.svg'), og);
  const resvg = new Resvg(og, { fitTo: { mode: 'original' } });
  const pngData = resvg.render().asPng();
  fs.writeFileSync(path.join(__dirname, 'png/argushaus-og-1200x630.png'), pngData);
  console.log('✓ png/argushaus-og-1200x630.png  1200x630 (Open Graph)');
}

// Render social square
{
  const sq = buildSocialSquareSvg();
  fs.writeFileSync(path.join(__dirname, 'argushaus-social-square.svg'), sq);
  const resvg = new Resvg(sq, { fitTo: { mode: 'original' } });
  const pngData = resvg.render().asPng();
  fs.writeFileSync(path.join(__dirname, 'png/argushaus-social-1080.png'), pngData);
  console.log('✓ png/argushaus-social-1080.png  1080x1080 (Instagram/LinkedIn post)');
}

console.log('\nDone. PNG exports in /logo/png/');
