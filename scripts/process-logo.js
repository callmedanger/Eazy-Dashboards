import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function processLogos() {
  const inputPath = path.resolve('public/logo.jpg');
  if (!fs.existsSync(inputPath)) {
    console.error('public/logo.jpg not found');
    return;
  }

  const image = sharp(inputPath);
  const { data, info } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Let's create transparent version:
  // Convert near-white pixels (r, g, b > 235) to transparent alpha with soft edge anti-aliasing
  const transparentBuffer = Buffer.from(data);
  const whiteBuffer = Buffer.from(data);

  for (let i = 0; i < transparentBuffer.length; i += channels) {
    const r = transparentBuffer[i];
    const g = transparentBuffer[i + 1];
    const b = transparentBuffer[i + 2];

    // Check if background (near white)
    const brightness = (r + g + b) / 3;
    if (brightness > 240) {
      transparentBuffer[i + 3] = 0; // Fully transparent
      whiteBuffer[i + 3] = 0;
    } else if (brightness > 215) {
      // Soft antialiasing edge
      const alpha = Math.round(((240 - brightness) / 25) * 255);
      transparentBuffer[i + 3] = Math.min(transparentBuffer[i + 3], alpha);
      whiteBuffer[i + 3] = Math.min(whiteBuffer[i + 3], alpha);
    }

    // For white version: convert non-transparent pixels to white, preserving alpha
    if (whiteBuffer[i + 3] > 0) {
      whiteBuffer[i] = 255;
      whiteBuffer[i + 1] = 255;
      whiteBuffer[i + 2] = 255;
    }
  }

  await sharp(transparentBuffer, { raw: { width, height, channels } })
    .png()
    .toFile(path.resolve('public/logo-transparent.png'));

  await sharp(whiteBuffer, { raw: { width, height, channels } })
    .png()
    .toFile(path.resolve('public/logo-white.png'));

  console.log('Successfully generated public/logo-transparent.png and public/logo-white.png');
}

processLogos().catch(console.error);
