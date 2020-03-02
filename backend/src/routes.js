import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import UserController from './app/controllers/UserController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import FileController from './app/controllers/FileController';

import validateSessionStore from './app/validators/SessionStore';
import validateUserStore from './app/validators/User';
import validateRecipientStore from './app/validators/Recipient/RecipientStore';
import validateRecipientUpdate from './app/validators/Recipient/RecipientUpdate';
import validateRecipientShowOrDelete from './app/validators/Recipient/RecipientShow';
import validateDeliverymenStore from './app/validators/Deliveryman/DeliverymanStore';
import validateDeliverymenUpdate from './app/validators/Deliveryman/DeliverymanUpdate';
import validateDeliverymenShowOrDelete from './app/validators/Deliveryman/DeliverymanShow';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', validateSessionStore, SessionController.store);
routes.post('/users', validateUserStore, UserController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);

routes.post('/recipients', validateRecipientStore, RecipientController.store);
routes.put(
  '/recipients/:id',
  validateRecipientUpdate,
  RecipientController.update
);
routes.get('/recipients', RecipientController.index);
routes.get(
  '/recipients/:id',
  validateRecipientShowOrDelete,
  RecipientController.show
);
routes.delete(
  '/recipients/:id',
  validateRecipientShowOrDelete,
  RecipientController.delete
);
routes.post('/files', upload.single('file'), FileController.store);

routes.post(
  '/deliverymen',
  validateDeliverymenStore,
  DeliverymanController.store
);
routes.put(
  '/deliverymen/:id',
  validateDeliverymenUpdate,
  DeliverymanController.update
);
routes.get('/deliverymen', DeliverymanController.index);
routes.get(
  '/deliverymen/:id',
  validateDeliverymenShowOrDelete,
  DeliverymanController.show
);
routes.delete(
  '/deliverymen/:id',
  validateDeliverymenShowOrDelete,
  DeliverymanController.delete
);

routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.get('/deliveries', DeliveryController.index);
routes.get('/deliveries/:id', DeliveryController.show);
routes.delete('/deliveries/:id', DeliveryController.delete);

routes.put('/deliverymen/:id/deliveries/:deliveryId');
export default routes;
