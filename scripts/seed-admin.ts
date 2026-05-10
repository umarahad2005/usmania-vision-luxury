import { MongoClient } from 'mongodb';
import { createHash } from 'crypto';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET || 'salt';

if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("❌ Missing required .env variables (MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD)");
  process.exit(1);
}

function hashPassword(password: string): string {
  return createHash('sha256').update(password + JWT_SECRET).digest('hex');
}

async function seedAdmin() {
  console.log('Connecting to MongoDB...');
  const client = new MongoClient(MONGODB_URI as string);

  try {
    await client.connect();
    const db = client.db();
    const users = db.collection('users');

    const existing = await users.findOne({ email: ADMIN_EMAIL });
    if (existing) {
      console.log(`✅ Admin user ${ADMIN_EMAIL} already exists!`);
      if (!existing.isAdmin) {
        await users.updateOne({ email: ADMIN_EMAIL }, { $set: { isAdmin: true } });
        console.log(`   -> Updated existing user to have isAdmin: true`);
      }
      return;
    }

    const now = new Date();
    await users.insertOne({
      name: 'Admin',
      email: ADMIN_EMAIL,
      passwordHash: hashPassword(ADMIN_PASSWORD as string),
      isAdmin: true,
      createdAt: now,
      updatedAt: now,
    });

    console.log(`🎉 Successfully created admin user: ${ADMIN_EMAIL}`);

  } catch (error) {
    console.error('❌ Failed to seed admin:', error);
  } finally {
    await client.close();
    process.exit(0);
  }
}

seedAdmin();
