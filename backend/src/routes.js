import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import UserController from './app/controllers/UserController';

import validateSessionStore from './app/validators/SessionStore';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', validateSessionStore, SessionController.store);
routes.post('/users', UserController.store);
routes.post('/files', upload.single('file'), (req, res) => {
  return res.json({ msg: 'deu certo!' });
});
// A partir daqui as rotas abaixo passam a precisar da autenticação.
routes.use(authMiddleware);

routes.get('/users', UserController.index);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients', RecipientController.update);
routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.delete('/recipients', RecipientController.delete);

export default routes;
