import { type ObjectId } from 'mongodb';

export interface UserDocument {
  _id?: ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPublic {
  id: string;
  name: string;
  email: string;
}

export function toPublicUser(doc: UserDocument & { _id: ObjectId }): UserPublic {
  return {
    id: doc._id.toHexString(),
    name: doc.name,
    email: doc.email,
  };
}
