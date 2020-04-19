import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import FileController from './app/controllers/FileController';
import DeliveryDashboardController from './app/controllers/DeliveryDashboardController';
import DeliveryFinishController from './app/controllers/DeliveryFinishController';
import DeliveryProblemController from './app/controllers/ProblemController';

import { createSession } from './app/validators/SessionStore';
import { createUser } from './app/validators/User';
import {
  createRecipient,
  updateRecipient,
  showRecipient,
  deleteRecipient
} from './app/validators/Recipient';
import {
  createDeliveryman,
  updateDeliveryman,
  showDeliveryman,
  deleteDeliveryman
} from './app/validators/Deliveryman';
import {
  createDelivery,
  updateDelivery,
  showDelivery,
  deleteDelivery
} from './app/validators/Delivery';
import {
  startOrder,
  listOrderToDeliveryman,
  showOrderToDeliveryman
} from './app/validators/DeliveryStart';
import { finishDelivery } from './app/validators/DeliveryFinish';
import {
  createDeliveryProblem,
  showDeliveryProblem,
  deleteDeliveryProblem
} from './app/validators/DeliveryProblem';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', createSession, SessionController.store);
routes.post('/users', createUser, UserController.store);

routes.put(
  '/deliveryman/:id/deliveries/:deliveryId/start',
  startOrder,
  DeliveryDashboardController.update
);

routes.put(
  '/deliveryman/:id/deliveries/:deliveryId/finish',
  finishDelivery,
  DeliveryFinishController.update
);
routes.get(
  '/deliveryman/:id/deliveries',
  listOrderToDeliveryman,
  DeliveryDashboardController.index
);
routes.get(
  '/deliveryman/:id/deliveries/:deliveryId',
  showOrderToDeliveryman,
  DeliveryDashboardController.show
);

routes.post('/delivery/:deliveryId/problems', DeliveryProblemController.store);

routes.get('/delivery/problems', DeliveryProblemController.index);
routes.get(
  '/delivery/:deliveryId/problems',
  showDeliveryProblem,
  DeliveryProblemController.show
);

routes.delete(
  '/problem/:problemId/cancel-delivery',
  deleteDeliveryProblem,
  DeliveryProblemController.delete
);

routes.use(authMiddleware);

routes.get('/users', UserController.index);

routes.post('/recipients', createRecipient, RecipientController.store);
routes.put('/recipients/:id', updateRecipient, RecipientController.update);
routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', showRecipient, RecipientController.show);
routes.delete('/recipients/:id', deleteRecipient, RecipientController.delete);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/deliverymen', createDeliveryman, DeliverymanController.store);
routes.put('/deliverymen/:id', updateDeliveryman, DeliverymanController.update);
routes.get('/deliverymen', DeliverymanController.index);
routes.get('/deliverymen/:id', showDeliveryman, DeliverymanController.show);
routes.delete(
  '/deliverymen/:id',
  deleteDeliveryman,
  DeliverymanController.delete
);

routes.post('/deliveries', createDelivery, DeliveryController.store);
routes.put('/deliveries/:id', updateDelivery, DeliveryController.update);
routes.get('/deliveries', DeliveryController.index);
routes.get('/deliveries/:id', showDelivery, DeliveryController.show);
routes.delete('/deliveries/:id', deleteDelivery, DeliveryController.delete);

export default routes;
