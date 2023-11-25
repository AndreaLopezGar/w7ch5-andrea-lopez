import { User } from '../entities/user.js';
import { Repo } from '../repos/repo.js';
import { UserModel } from '../repos/user.mongo.model.js';
import createDebug from 'debug';

const debug = createDebug('RRSS:repo:user.mongo.repo');

export class UserMongoRepo implements Repo<User> {
  constructor() {
    debug('Instancinado UserMongoRepo');
  }

  async getAll(): Promise<User[]> {
    const data = await UserModel.find().exec();
    return data;
  }

  async getById(id: string): Promise<User[]> {
    const data = await UserModel.findById(id).exec();
    if(!data)
    throw new HttpError ('404','Not Found', 'User not found in our system')
  return data
  }

  async create(newData:Omit<User,'id>'):Promise<User>{
    const data = await UserModel.create(newData)
    return data
  }

update(id:string, newData Partial<User>):Promise<User> {
  const data = await UserModel.findByIdAndUpdate(id,newData ,{
    new: true,
  }).exec()
}
}
