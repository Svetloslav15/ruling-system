export class TransactionService {
  constructor({
    ethereumProvider,
    configurationService,
    TransactionModel,
    logger,
  }) {
    this.provider = ethereumProvider;
    this.configService = configurationService;
    this.TransactionModel = TransactionModel;
    this.logger = logger;
  }

  async startMonitoring() {
    this.provider.on("pending", async (txHash) => {
      const tx = await this.provider.getTransaction(txHash);
      if (tx) {
        await this.checkAndStoreTransaction(tx);
      }
    });
  }

  async checkAndStoreTransaction(tx) {
    const configurations = await this.configService.getConfigurations();
    configurations.forEach(async (config) => {
      if (this.matchesConfiguration(tx, config)) {
        await this.TransactionModel.create({
          hash: tx.hash,
          data: tx,
          configurationId: config.id,
        });
        this.logger.info(
          `Transaction ${tx.hash} stored for configuration ${config.id}`
        );
      }
    });
  }
}
