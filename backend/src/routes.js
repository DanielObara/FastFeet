import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import UserController from './app/controllers/UserController';

import validateSessionStore from './app/validators/SessionStore';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', validateSessionStore, SessionController.store);
routes.post('/users', UserController.store);

// A partir daqui as rotas abaixo passam a precisar da autenticação.
routes.use(authMiddleware);

routes.get('/users', UserController.index);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients', RecipientController.update);
routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.delete('/recipients', RecipientController.delete);

export default routes;
