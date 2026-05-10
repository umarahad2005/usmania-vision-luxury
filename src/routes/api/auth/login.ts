import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { getDb } from '@/integrations/mongodb/client.server';
import { type UserDocument } from '@/integrations/mongodb/models/user';
import { signToken } from '@/lib/jwt';
import { createHash } from 'crypto';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function hashPassword(password: string): string {
  return createHash('sha256').update(password + (process.env.JWT_SECRET || 'salt')).digest('hex');
}

export const loginFn = createServerFn({ method: 'POST' })
  .validator(schema)
  .handler(async ({ data }) => {
    const db = await getDb();
    const users = db.collection<UserDocument>('users');

    const user = await users.findOne({ email: data.email.toLowerCase() });
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const hash = hashPassword(data.password);
    if (hash !== user.passwordHash) {
      throw new Error('Invalid email or password.');
    }

    const token = await signToken({
      userId: user._id!.toHexString(),
      email: user.email,
      name: user.name,
    });

    return {
      user: { id: user._id!.toHexString(), email: user.email, name: user.name },
      token,
    };
  });
