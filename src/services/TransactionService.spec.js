import { jest } from "@jest/globals";
import { TransactionService } from "./TransactionService";
import {
  mockEthereumProvider,
  mockConfigService,
  mockTransactionModel,
  mockLogger,
  mockUtils,
} from "../../mocks/mocks";

describe("TransactionService", () => {
  let transactionService;

  beforeEach(() => {
    transactionService = new TransactionService({
      ethereumProvider: mockEthereumProvider,
      configurationService: mockConfigService,
      TransactionModel: mockTransactionModel,
      logger: mockLogger,
      utils: mockUtils,
    });

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should start monitoring and push txHash to the queue", () => {
    const txHash = "0x123";
    transactionService.startMonitoring();

    mockEthereumProvider.on.mock.calls[0][1](txHash);
    expect(transactionService.pendingTransactionsQueue).toContain(txHash);
  });

  it("should process pending transactions and store the transaction", async () => {
    const txHash = "0xabc";
    const tx = {
      hash: txHash,
      from: "0x123",
      to: "0x456",
      value: "500",
      gasLimit: { toNumber: () => 21000 },
      chainId: BigInt(1),
    };
    const config = {
      id: 1,
      filter: {
        from: "0x123",
        to: "0x456",
        minValue: "100",
        maxValue: "1000",
        gasLimit: 21000,
        chainId: 1,
      },
    };

    transactionService.pendingTransactionsQueue.push(txHash);

    mockEthereumProvider.getTransaction.mockResolvedValue(tx);
    mockConfigService.getConfigurations.mockResolvedValue([config]);
    jest
      .spyOn(transactionService, "matchesConfiguration")
      .mockReturnValue(true);
    jest
      .spyOn(transactionService.utils, "generateGuid")
      .mockReturnValue("test-guid");

    await transactionService.processPendingTransactions();

    expect(mockEthereumProvider.getTransaction).toHaveBeenCalledWith(txHash);
    expect(mockTransactionModel.create).toHaveBeenCalledWith({
      id: "test-guid",
      hash: txHash,
      data: tx,
      configurationId: 1,
    });
    expect(mockLogger.info).toHaveBeenCalledWith(
      `Transaction ${tx.hash} stored for configuration 1`
    );
  });

  it("should skip transaction if it does not match any configuration", async () => {
    const txHash = "0xabc";
    const tx = {
      hash: txHash,
      from: "0x123",
      to: "0x456",
      value: "500",
      gasLimit: { toNumber: () => 21000 },
      chainId: BigInt(1),
    };
    const config = {
      id: 1,
      filter: {
        from: "0x123",
        to: "0x456",
        minValue: "100",
        maxValue: "1000",
        gasLimit: 21000,
        chainId: 1,
      },
    };

    transactionService.pendingTransactionsQueue.push(txHash);

    mockEthereumProvider.getTransaction.mockResolvedValue(tx);
    mockConfigService.getConfigurations.mockResolvedValue([config]);
    jest
      .spyOn(transactionService, "matchesConfiguration")
      .mockReturnValue(false);

    await transactionService.processPendingTransactions();

    expect(mockTransactionModel.create).not.toHaveBeenCalled();
    expect(mockLogger.info).not.toHaveBeenCalled();
  });

  it("should log an error if fetching transaction fails", async () => {
    const txHash = "0xabc";
    transactionService.pendingTransactionsQueue.push(txHash);

    mockEthereumProvider.getTransaction.mockRejectedValue(
      new Error("Failed to fetch transaction")
    );

    await transactionService.processPendingTransactions();

    expect(mockLogger.error).toHaveBeenCalledWith(
      "Error fetching pending transaction: Failed to fetch transaction"
    );
  });

  it("should correctly match a transaction to a configuration", () => {
    const tx = {
      from: "0x123",
      to: "0x456",
      value: "500",
      gasLimit: 21000,
      chainId: BigInt(1),
    };
    const config = {
      filter: {
        from: "0x123",
        to: "0x456",
        minValue: "100",
        maxValue: "1000",
        gasLimit: 21000,
        chainId: 1,
      },
    };

    const result = transactionService.matchesConfiguration(tx, config);
    expect(result).toBe(true);
  });

  it("should not process transactions if queue is empty", async () => {
    transactionService.pendingTransactionsQueue = [];
    await transactionService.processPendingTransactions();
    expect(mockEthereumProvider.getTransaction).not.toHaveBeenCalled();
  });

  it("should correctly throttle transaction processing", () => {
    const setIntervalSpy = jest.spyOn(global, "setInterval");
    transactionService.startMonitoring();

    jest.advanceTimersByTime(
      (1000 * 60) / transactionService.maxRequestsPerMinute
    );

    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(mockEthereumProvider.on).toHaveBeenCalled();
  });
  it("should return false if from address does not match", () => {
    const tx = { from: "0x123", to: "0x456", value: "500" };
    const config = { filter: { from: "0x789" } };
    const result = transactionService.matchesConfiguration(tx, config);
    expect(result).toBe(false);
  });

  it("should return false if to address does not match", () => {
    const tx = { from: "0x123", to: "0x456", value: "500" };
    const config = { filter: { to: "0x789" } };
    const result = transactionService.matchesConfiguration(tx, config);
    expect(result).toBe(false);
  });

  it("should return false if value is less than minValue", () => {
    const tx = { from: "0x123", to: "0x456", value: "500" };
    const config = { filter: { minValue: "600" } };
    const result = transactionService.matchesConfiguration(tx, config);
    expect(result).toBe(false);
  });

  it("should return false if value is greater than maxValue", () => {
    const tx = { from: "0x123", to: "0x456", value: "500" };
    const config = { filter: { maxValue: "400" } };
    const result = transactionService.matchesConfiguration(tx, config);
    expect(result).toBe(false);
  });

  it("should return false if gasLimit does not match", () => {
    const tx = {
      from: "0x123",
      to: "0x456",
      value: "500",
      gasLimit: { toNumber: () => 21000 },
    };
    const config = { filter: { gasLimit: 30000 } };
    const result = transactionService.matchesConfiguration(tx, config);
    expect(result).toBe(false);
  });

  it("should return false if chainId does not match", () => {
    const tx = { from: "0x123", to: "0x456", value: "500", chainId: BigInt(1) };
    const config = { filter: { chainId: 2 } };
    const result = transactionService.matchesConfiguration(tx, config);
    expect(result).toBe(false);
  });

  it("should return false if gasPrice is more than in filter", () => {
    const tx = {
      from: "0x123",
      to: "0x456",
      value: "500",
      chainId: BigInt(1),
      gasPrice: 5000,
    };
    const config = { filter: { gasPrice: 2000 } };
    const result = transactionService.matchesConfiguration(tx, config);
    expect(result).toBe(false);
  });

  it("should return true if all filters match", () => {
    const tx = {
      from: "0x123",
      to: "0x456",
      value: "500",
      gasLimit: 21000,
      chainId: BigInt(1),
    };
    const config = {
      filter: {
        from: "0x123",
        to: "0x456",
        minValue: "400",
        maxValue: "600",
        gasLimit: 21000,
        chainId: 1,
      },
    };
    const result = transactionService.matchesConfiguration(tx, config);
    expect(result).toBe(true);
  });
});
