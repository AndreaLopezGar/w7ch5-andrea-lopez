import createDeug from 'debug';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../types/http.error.js';
import { Auth } from '../services/auth.js';
import { UsersMongoRepo } from '../repos/user.mongo.repo.js';

const debug = createDeug('RRSS:middleware:auth:interceptor');

export class AuthInterceptor {
  constructor() {
    debug('Instantiated');
  }

  authorization(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenHeader = req.get('Authorization');
      if (!tokenHeader?.startsWith('Bearer'))
        throw new HttpError(401, 'Unauthorized');
      const token = tokenHeader.split(' ')[1];
      const tokenPayload = Auth.verifyAndGetPayload(token);
      console.log(tokenPayload);
      req.body.id = tokenPayload.id;
      next();
    } catch (error) {
      next(error);
    }
  }

  async authentication(req: Request, res: Response, next: NextFunction) {
    try {
      // Eres el usuario
      const userID = req.body.id;
      // Queres actuar sobre la quote req.params.id
      const userToAddID = req.params.id;
      const repoUsers = new UsersMongoRepo();
      const user = await repoUsers.getById(userToAddID);
      if (user.id !== userID)
        throw new HttpError(401, 'Unauthorized', 'User not valid');
      next();
    } catch (error) {
      next(error);
    }
  }
}
