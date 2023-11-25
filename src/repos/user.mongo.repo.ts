import createDebug from 'debug';
import { Repo } from './repo';
import { UserLogin, User } from '../entities/user.js';
import { UserModel } from './user.mongo.model.js';
import { HttpError } from '../types/http.error.js';
import { Auth } from '../services/auth.js';

const debug = createDebug('RRSS:user:mongo:repo');

export class UsersMongoRepo implements Repo<User> {
  constructor() {
    debug('Instantiated');
  }

  async create(newData: Omit<User, 'id'>): Promise<User> {
    newData.passwd = await Auth.hash(newData.passwd);
    const result: User = await UserModel.create(newData);
    return result;
  }

  async login(UserLogin: UserLogin): Promise<User> {
    const result = await UserModel.findOne({ email: UserLogin.email }).exec();
    if (!result || !(await Auth.compare(UserLogin.passwd, result.passwd)))
      throw new HttpError(401, 'Unauthorized');
    return result;
  }

  async getAll(): Promise<User[]> {
    const result = await UserModel.find().exec();
    return result;
  }

  async getById(id: string): Promise<User> {
    const result = await UserModel.findById(id).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  async update(id: string, updatedItem: Partial<User>): Promise<User> {
    const result = await UserModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    }).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  delete(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
