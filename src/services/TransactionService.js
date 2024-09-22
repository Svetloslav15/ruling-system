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

    this.pendingTransactionsQueue = [];
    this.maxRequestsPerMinute = 60;
  }

  async startMonitoring() {
    this.provider.on("pending", (txHash) => {
      this.pendingTransactionsQueue.push(txHash);
    });

    setInterval(() => {
      this.processPendingTransactions();
    }, (1000 * 60) / this.maxRequestsPerMinute);
  }

  async processPendingTransactions() {
    if (this.pendingTransactionsQueue.length === 0) {
      return;
    }

    const txHash = this.pendingTransactionsQueue.shift();

    try {
      const tx = await this.provider.getTransaction(txHash);
      if (tx) {
        await this.checkAndStoreTransaction(tx);
      }
    } catch (error) {
      this.logger.error(`Error fetching pending transaction: ${error.message}`);
    }
  }

  async checkAndStoreTransaction(tx) {
    const configurations = await this.configService.getConfigurations();
    for (const config of configurations) {
      if (this.matchesConfiguration(tx, config)) {
        await this.TransactionModel.create({
          id: this.generateGuid(),
          hash: tx.hash,
          data: tx,
          configurationId: config.id,
        });
        this.logger.info(
          `Transaction ${tx.hash} stored for configuration ${config.id}`
        );
      }
    }
  }

  matchesConfiguration(tx, config) {
    const filter = config.filter;

    if (filter.from && filter.from.toLowerCase() !== tx.from.toLowerCase()) {
      return false;
    }

    if (filter.to && filter.to.toLowerCase() !== tx.to.toLowerCase()) {
      return false;
    }

    const value = BigInt(tx.value);
    if (filter.minValue && value < BigInt(filter.minValue)) {
      return false;
    }
    if (filter.maxValue && value > BigInt(filter.maxValue)) {
      return false;
    }

    if (filter.gasLimit && tx.gasLimit.toNumber() !== filter.gasLimit) {
      return false;
    }

    if (filter.chainId && tx.chainId !== BigInt(filter.chainId)) {
      return false;
    }
    return true;
  }

  generateGuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };
}
