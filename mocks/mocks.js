import { jest } from "@jest/globals";

const mockEthereumProvider = {
  on: jest.fn(),
  getTransaction: jest.fn(),
};
const mockConfigService = {
  getConfigurations: jest.fn(),
};
const mockTransactionModel = {
  create: jest.fn(),
};

const mockUtils = {
    generateGuid: jest.fn()
};

const mockConfigurationModel = {
  findByPk: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
};

const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
};

export {
  mockEthereumProvider,
  mockConfigService,
  mockTransactionModel,
  mockLogger,
  mockConfigurationModel,
  mockUtils
};
