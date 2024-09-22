import { createContainer, asClass, asValue, asFunction } from "awilix";
import { Configuration, Transaction } from "../models/index.js";
import { ConfigurationService } from "../services/ConfigurationService.js";
import { TransactionService } from "../services/TransactionService.js";
import { createLogger } from "../utils/logger.js";
import { createEthereumProvider } from "../utils/etheriumProvider.js";
import { Utils } from "../utils/utils.js";

const container = createContainer();

container.register({
  logger: asFunction(createLogger).singleton(),
  utils: asClass(Utils).singleton(),
  ethereumProvider: asFunction(createEthereumProvider).singleton(),
  configurationService: asClass(ConfigurationService).singleton(),
  transactionService: asClass(TransactionService).singleton(),
  ConfigurationModel: asValue(Configuration),
  TransactionModel: asValue(Transaction),
});

export default container;
