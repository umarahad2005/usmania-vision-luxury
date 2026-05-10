import { type ObjectId } from 'mongodb';

export interface ProductDocument {
  _id?: ObjectId;
  name: string;
  category: string;
  price: number;
  image: string;                // Cloudinary public_id or full URL
  description: string;
  edition?: string;
  type: 'watches' | 'glasses';
  colorOptions?: string[];      // e.g. ['Black', 'Gold', 'Silver']
  inStock: boolean;
  featured: boolean;
  slug: string;                 // URL-safe unique identifier
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductPublic {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  edition?: string;
  type: 'watches' | 'glasses';
  colorOptions?: string[];
  inStock: boolean;
  featured: boolean;
  slug: string;
  tags?: string[];
}

export function toPublicProduct(doc: ProductDocument & { _id: ObjectId }): ProductPublic {
  return {
    id: doc._id.toHexString(),
    name: doc.name,
    category: doc.category,
    price: doc.price,
    image: doc.image,
    description: doc.description,
    edition: doc.edition,
    type: doc.type,
    colorOptions: doc.colorOptions,
    inStock: doc.inStock,
    featured: doc.featured,
    slug: doc.slug,
    tags: doc.tags,
  };
}

export function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
