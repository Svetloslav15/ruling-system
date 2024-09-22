export class ConfigurationService {
  constructor({ ConfigurationModel, logger, TransactionModel }) {
    this.ConfigurationModel = ConfigurationModel;
    this.TransactionModel = TransactionModel;
    this.logger = logger;
  }

  async createConfiguration(data) {
    data.id = this.generateGuid();
    const config = await this.ConfigurationModel.create(data);
    this.logger.info(`Configuration created: ${config.id}`);
    return config;
  }

  async getConfigurations() {
    return await this.ConfigurationModel.findAll();
  }

  async updateConfiguration(id, data) {
    const config = await this.ConfigurationModel.findByPk(id);
    if (config) {
      await config.update(data);
      this.logger.info(`Configuration ${id} updated`);
      return config;
    }
    return null;
  }

  async deleteConfiguration(id) {
    const config = await this.ConfigurationModel.findByPk(id);
    if (config) {
      await config.destroy();
      this.logger.info(`Configuration ${id} deleted`);
    }
  }

  generateGuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
  }
}
