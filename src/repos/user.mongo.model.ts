import { Schema, model } from 'mongoose';
import { User } from '../entities/user.js';
import createDebug from 'debug';

const debug = createDebug('RRSS:repos:user:mongo:model');

debug('Hola desde models users');

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwd: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: false,
  },
  about: {
    type: String,
    required: false,
  },
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  enemies: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

userSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

export const UserModel = model<User>('User', userSchema, 'users');
