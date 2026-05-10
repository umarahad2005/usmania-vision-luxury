import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { getDb } from '@/integrations/mongodb/client.server';
import { type UserDocument } from '@/integrations/mongodb/models/user';
import { signToken } from '@/lib/jwt';
import { createHash } from 'crypto';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

function hashPassword(password: string): string {
  return createHash('sha256').update(password + (process.env.JWT_SECRET || 'salt')).digest('hex');
}

export const signupFn = createServerFn({ method: 'POST' })
  .validator(schema)
  .handler(async ({ data }) => {
    const db = await getDb();
    const users = db.collection<UserDocument>('users');

    const existing = await users.findOne({ email: data.email.toLowerCase() });
    if (existing) {
      throw new Error('An account with this email already exists.');
    }

    const now = new Date();
    const result = await users.insertOne({
      name: data.name,
      email: data.email.toLowerCase(),
      passwordHash: hashPassword(data.password),
      createdAt: now,
      updatedAt: now,
    });

    const token = await signToken({
      userId: result.insertedId.toHexString(),
      email: data.email.toLowerCase(),
      name: data.name,
    });

    return {
      user: { id: result.insertedId.toHexString(), email: data.email.toLowerCase(), name: data.name },
      token,
    };
  });
