export class ConfigurationService {
  constructor({ ConfigurationModel, logger, TransactionModel, utils }) {
    this.ConfigurationModel = ConfigurationModel;
    this.TransactionModel = TransactionModel;
    this.logger = logger;
    this.utils = utils;
  }

  async createConfiguration(data) {
    try {
      data.id = this.utils.generateGuid();
      const config = await this.ConfigurationModel.create(data);
      this.logger.info(`Configuration created: ${config.id}`);
      return config;
    } catch (error) {
      const message = `Error creating configuration: ${error.message}`;
      this.logger.error(message);
      throw new Error(message);
    }
  }

  async getConfigurations() {
    try {
      return await this.ConfigurationModel.findAll();
    } catch (error) {
      const message = `Error fetching configurations: ${error.message}`;
      this.logger.error(message);
      throw new Error(message);
    }
  }

  async updateConfiguration(id, data) {
    try {
      const config = await this.ConfigurationModel.findByPk(id);
      if (config) {
        await config.update(data);
        this.logger.info(`Configuration ${id} updated`);
        return config;
      } else {
        this.logger.warn(`Configuration with id ${id} not found`);
        return null;
      }
    } catch (error) {
      const message = `Error updating configuration ${id}: ${error.message}`;
      this.logger.error(message);
      throw new Error(message);
    }
  }

  async deleteConfiguration(id) {
    try {
      const config = await this.ConfigurationModel.findByPk(id);
      if (config) {
        await config.destroy();
        this.logger.info(`Configuration ${id} deleted`);
      } else {
        this.logger.warn(`Configuration with id ${id} not found`);
      }
    } catch (error) {
      const message = `Error deleting configuration ${id}: ${error.message}`;
      this.logger.error(message);
      throw new Error(message);
    }
  }
}
