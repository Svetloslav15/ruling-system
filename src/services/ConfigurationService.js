export class ConfigurationService {
    constructor({ ConfigurationModel, logger }) {
      this.ConfigurationModel = ConfigurationModel;
      this.logger = logger;
    }
  
    async createConfiguration(data) {
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
  }
  