import { Router as createRouter } from 'express';
import { UsersController } from '../controllers/users.controller.js';
import createDebug from 'debug';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { UsersMongoRepo } from '../repos/user.mongo.repo.js';

const debug = createDebug('RRSS:routers:users:router');

export const usersRouter = createRouter();
debug('Starting');

const repo = new UsersMongoRepo();
const controller = new UsersController(repo);
const interceptor = new AuthInterceptor();

usersRouter.get('/', controller.getAll.bind(controller)); // Ver todos los usuarios
usersRouter.get('/:id', controller.getById.bind(controller)); // Ver un usario

usersRouter.post('/register', controller.create.bind(controller)); // Crear usuario
usersRouter.post('/login', controller.login.bind(controller)); // Hacer log in

usersRouter.patch(
  '/login',
  interceptor.authorization.bind(interceptor),
  controller.login.bind(controller)
);

usersRouter.delete(
  '/:id',
  interceptor.authorization.bind(interceptor),
  controller.delete.bind(controller)
); // Eliminar usuarios

// usersRouter.patch(
//   '/add-friend/:id',
//   interceptor.authorization.bind(interceptor),
//   controller.addFriend.bind(controller)
// );
// // Añadir usuario a enemigos
// usersRouter.patch(
//   '/add-enemy/:id',
//   interceptor.authorization.bind(interceptor),
//   controller.addEnemy.bind(controller)
// );
