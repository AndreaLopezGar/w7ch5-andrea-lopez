import createDebug from 'debug';
import { UserLogin, User } from '../entities/user.js';
import { UserModel } from './user.mongo.model.js';
import { HttpError } from '../types/http.error.js';
import { Auth } from '../services/auth.js';
import { Repository } from './repo.js';

const debug = createDebug('RRSS:user:mongo:repo');

export class UsersMongoRepo implements Repository<User> {
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

  async update(id: string, updatedData: Partial<User>): Promise<User> {
    const result = await UserModel.findByIdAndUpdate(
      updatedData.id,
      { $push: { friends: id } },
      {
        new: true,
      }
    ).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  delete(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line no-unused-vars
  search({ key, value }: { key: string; value: unknown }): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
}
