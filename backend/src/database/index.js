import Sequelize from 'sequelize';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';
import Delivery from '../app/models/Delivery';
import Deliveryman from '../app/models/Deliveryman';
import DeliveryProblem from '../app/models/DeliveryProblem';

import databaseConfig from '../config/database';

const models = [User, Recipient, File, Delivery, Deliveryman, DeliveryProblem];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
