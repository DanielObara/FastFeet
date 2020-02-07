import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

routes.post('/recipients', RecipientController.store);
routes.get('/recipients', RecipientController.show);
routes.get('/recipients', RecipientController.index);
routes.delete('/recipients', RecipientController.delete);
routes.put('/recipients', RecipientController.update);

export default routes;
