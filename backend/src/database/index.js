import Sequelize from 'sequelize';
import mongoose from 'mongoose';

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
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/fastfeet',
      { useNewUrlParser: true, useFindAndModify: true }
    );
  }
}

export default new Database();
