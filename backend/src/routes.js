import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import UserController from './app/controllers/UserController';

import validateSessionStore from './app/validators/SessionStore';
import validateUserStore from './app/validators/User';
import validateRecipientStore from './app/validators/RecipientStore';
import validateRecipientUpdate from './app/validators/RecipientUpdate';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', validateSessionStore, SessionController.store);
routes.post('/users', validateUserStore, UserController.store);

// A partir daqui as rotas abaixo passam a precisar da autenticação.
routes.use(authMiddleware);

routes.get('/users', UserController.index);

routes.post('/recipients', validateRecipientStore, RecipientController.store);
routes.put('/recipients', validateRecipientUpdate, RecipientController.update);
routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.delete('/recipients/:id', RecipientController.delete);

export default routes;
