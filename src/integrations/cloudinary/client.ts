// Cloudinary URL builder — safe to import on both client and server
const CLOUD_NAME = typeof window !== 'undefined'
  ? import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  : process.env.CLOUDINARY_CLOUD_NAME;

export type CloudinaryTransform = {
  width?: number;
  height?: number;
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  crop?: 'fill' | 'fit' | 'scale' | 'thumb';
  gravity?: 'auto' | 'face' | 'center';
};

/**
 * Build an optimized Cloudinary URL
 * @param publicId — the Cloudinary public_id of the asset
 * @param transforms — optional transformations
 */
export function cloudinaryUrl(publicId: string, transforms: CloudinaryTransform = {}): string {
  if (!CLOUD_NAME) {
    console.warn('[Cloudinary] CLOUDINARY_CLOUD_NAME is not set. Returning raw publicId.');
    return publicId;
  }

  // If publicId is already a full URL (e.g., Unsplash), return as-is
  if (publicId.startsWith('http')) return publicId;

  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
  } = transforms;

  const parts: string[] = [];
  if (width) parts.push(`w_${width}`);
  if (height) parts.push(`h_${height}`);
  parts.push(`q_${quality}`);
  parts.push(`f_${format}`);
  parts.push(`c_${crop}`);
  parts.push(`g_${gravity}`);

  const transform = parts.join(',');
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transform}/${publicId}`;
}

/** Preset: Product card thumbnail (400×400) */
export const productThumb = (id: string) => cloudinaryUrl(id, { width: 400, height: 400 });

/** Preset: Product detail hero (800×600) */
export const productHero = (id: string) => cloudinaryUrl(id, { width: 800, height: 600 });
