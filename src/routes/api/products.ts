import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { getDb } from '@/integrations/mongodb/client.server';
import { type ProductDocument, toPublicProduct, slugify } from '@/integrations/mongodb/models/product';
import { type ObjectId } from 'mongodb';
import { verifyToken } from '@/lib/jwt';
import { getRequest } from '@tanstack/react-start/server';

// ─── Auth guard helper ─────────────────────────────────────────
async function requireAdmin() {
  const request = getRequest();
  const authHeader = request?.headers.get('authorization') ?? '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) throw new Error('Unauthorized');
  const payload = await verifyToken(token);
  if (!payload) throw new Error('Unauthorized');
  // Check admin flag (set manually in DB on your user doc)
  const db = await getDb();
  const user = await db.collection('users').findOne({ _id: { $oid: payload.userId } as unknown });
  if (!user?.isAdmin) throw new Error('Forbidden: Admin only');
  return payload;
}

// ─── GET ALL ───────────────────────────────────────────────────
export const getAllProductsFn = createServerFn({ method: 'GET' }).handler(async () => {
  const db = await getDb();
  const docs = await db.collection<ProductDocument>('products')
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return docs.map((d) => toPublicProduct(d as ProductDocument & { _id: ObjectId }));
});

// ─── GET BY TYPE ───────────────────────────────────────────────
const typeSchema = z.object({ type: z.enum(['watches', 'glasses']) });
export const getProductsByTypeFn = createServerFn({ method: 'GET' })
  .validator(typeSchema)
  .handler(async ({ data }) => {
    const db = await getDb();
    const docs = await db.collection<ProductDocument>('products')
      .find({ type: data.type, inStock: true })
      .sort({ featured: -1, createdAt: -1 })
      .toArray();
    return docs.map((d) => toPublicProduct(d as ProductDocument & { _id: ObjectId }));
  });

// ─── GET BY SLUG ───────────────────────────────────────────────
const slugSchema = z.object({ slug: z.string() });
export const getProductBySlugFn = createServerFn({ method: 'GET' })
  .validator(slugSchema)
  .handler(async ({ data }) => {
    const db = await getDb();
    const doc = await db.collection<ProductDocument>('products').findOne({ slug: data.slug });
    if (!doc) throw new Error('Product not found');
    return toPublicProduct(doc as ProductDocument & { _id: ObjectId });
  });

// ─── CREATE (Admin) ────────────────────────────────────────────
const createSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  price: z.number().positive(),
  image: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['watches', 'glasses']),
  edition: z.string().optional(),
  colorOptions: z.array(z.string()).optional(),
  inStock: z.boolean().default(true),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
});

export const createProductFn = createServerFn({ method: 'POST' })
  .validator(createSchema)
  .handler(async ({ data }) => {
    await requireAdmin();
    const db = await getDb();
    const now = new Date();
    const slug = slugify(data.name);

    // Ensure unique slug
    const existing = await db.collection('products').findOne({ slug });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const result = await db.collection<ProductDocument>('products').insertOne({
      ...data,
      slug: finalSlug,
      createdAt: now,
      updatedAt: now,
    });

    return { id: result.insertedId.toHexString(), slug: finalSlug };
  });

// ─── UPDATE (Admin) ────────────────────────────────────────────
const updateSchema = z.object({
  id: z.string(),
  updates: createSchema.partial(),
});

export const updateProductFn = createServerFn({ method: 'POST' })
  .validator(updateSchema)
  .handler(async ({ data }) => {
    await requireAdmin();
    const db = await getDb();
    const { ObjectId: ObjId } = await import('mongodb');
    await db.collection<ProductDocument>('products').updateOne(
      { _id: new ObjId(data.id) },
      { $set: { ...data.updates, updatedAt: new Date() } }
    );
    return { success: true };
  });

// ─── DELETE (Admin) ────────────────────────────────────────────
const deleteSchema = z.object({ id: z.string() });
export const deleteProductFn = createServerFn({ method: 'POST' })
  .validator(deleteSchema)
  .handler(async ({ data }) => {
    await requireAdmin();
    const db = await getDb();
    const { ObjectId: ObjId } = await import('mongodb');
    await db.collection<ProductDocument>('products').deleteOne({ _id: new ObjId(data.id) });
    return { success: true };
  });

// ─── SEED (one-time migration from static products.ts) ────────
export const seedProductsFn = createServerFn({ method: 'POST' }).handler(async () => {
  await requireAdmin();
  const { allProducts } = await import('@/lib/products');
  const db = await getDb();
  const products = db.collection<ProductDocument>('products');
  const count = await products.countDocuments();
  if (count > 0) return { message: 'Already seeded', count };

  const now = new Date();
  const docs = allProducts.map((p) => ({
    name: p.name,
    category: p.category,
    price: p.price,
    image: p.image,
    description: p.description,
    edition: p.edition,
    type: p.type,
    inStock: true,
    featured: !!p.edition,
    slug: p.id,
    tags: [p.category.toLowerCase()],
    createdAt: now,
    updatedAt: now,
  }));

  await products.insertMany(docs);
  return { message: 'Seeded successfully', count: docs.length };
});
