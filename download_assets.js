import https from 'https';
import fs from 'fs';
import path from 'path';

const TEXTURES = {
  '2k_sun.jpg': 'https://www.solarsystemscope.com/textures/download/2k_sun.jpg',
  '2k_mercury.jpg': 'https://www.solarsystemscope.com/textures/download/2k_mercury.jpg',
  '2k_venus_atmosphere.jpg': 'https://www.solarsystemscope.com/textures/download/2k_venus_atmosphere.jpg',
  '2k_earth_daymap.jpg': 'https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg',
  '2k_mars.jpg': 'https://www.solarsystemscope.com/textures/download/2k_mars.jpg',
  '2k_jupiter.jpg': 'https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg',
  '2k_saturn.jpg': 'https://www.solarsystemscope.com/textures/download/2k_saturn.jpg',
  '2k_saturn_ring_alpha.png': 'https://www.solarsystemscope.com/textures/download/2k_saturn_ring_alpha.png',
  '2k_uranus.jpg': 'https://www.solarsystemscope.com/textures/download/2k_uranus.jpg',
  '2k_neptune.jpg': 'https://www.solarsystemscope.com/textures/download/2k_neptune.jpg',
  '2k_moon.jpg': 'https://www.solarsystemscope.com/textures/download/2k_moon.jpg'
};

const outputDir = './public/textures/solar';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function download(name, url) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(outputDir, name));
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${name}: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${name}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(path.join(outputDir, name), () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const [name, url] of Object.entries(TEXTURES)) {
    try {
      await download(name, url);
    } catch (e) {
      console.error(e.message);
    }
  }
}

run();
