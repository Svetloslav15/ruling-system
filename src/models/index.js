import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import ConfigurationModel from './Configuration.js';
import TransactionModel from './Transaction.js';

dotenv.config();

const sequelize = new Sequelize({
  dialect: process.env.DATABASE_DIALECT,
  storage: process.env.DATABASE_STORAGE,
  logging: false,
});

const Configuration = ConfigurationModel(sequelize);
const Transaction = TransactionModel(sequelize, Configuration);

sequelize.sync();

export { sequelize, Configuration, Transaction };
