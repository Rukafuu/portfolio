import * as THREE from 'three';

const loader = new THREE.TextureLoader(THREE.DefaultLoadingManager);
const textureCache: Record<string, THREE.Texture> = {};

export const loadTexture = (path: string): THREE.Texture => {
  const fullPath = `/textures/solar/${path}`;
  if (textureCache[fullPath]) return textureCache[fullPath];

  // Configure loader options before loading to avoid immutability issues in WebGL2
  const texture = loader.load(
    fullPath,
    (tex) => {
      // Success callback
      tex.needsUpdate = true;
    },
    undefined,
    (err) => {
      console.warn(`Failed to load texture: ${fullPath}`, err);
    }
  );

  // Set properties immediately on the proxy texture object
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;

  textureCache[fullPath] = texture;
  return texture;
};

export const createFallbackTexture = (color: string) => {
  const canvas = document.createElement('canvas');
  canvas.width = 64; canvas.height = 64;
  const context = canvas.getContext('2d')!;
  context.fillStyle = color;
  context.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};
