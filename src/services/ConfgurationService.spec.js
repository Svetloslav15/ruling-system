import { jest } from "@jest/globals";

import { ConfigurationService } from "./ConfigurationService";
import { mockConfigurationModel, mockLogger, mockUtils } from "../../mocks/mocks";

describe("ConfigurationService", () => {
  let configurationService;

  beforeEach(() => {
    configurationService = new ConfigurationService({
      ConfigurationModel: mockConfigurationModel,
      logger: mockLogger,
      utils: mockUtils
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all configurations", async () => {
    const mockConfigs = [
      { id: 1, name: "Test Config 1", filter: { from: "0x123" } },
      { id: 2, name: "Test Config 2", filter: { to: "0x456" } },
    ];

    mockConfigurationModel.findAll.mockResolvedValue(mockConfigs);

    const configurations = await configurationService.getConfigurations();
    expect(mockConfigurationModel.findAll).toHaveBeenCalledTimes(1);
    expect(configurations).toEqual(mockConfigs);
  });

  it("should create a new configuration", async () => {
    const newConfig = { name: "New Config", filter: { from: "0x123" } };
    const createdConfig = { id: 3, ...newConfig };
    jest.spyOn(configurationService.utils, "generateGuid").mockReturnValue("test-guid");

    mockConfigurationModel.create.mockResolvedValue(createdConfig);

    const result = await configurationService.createConfiguration(newConfig);
    expect(mockConfigurationModel.create).toHaveBeenCalledWith(newConfig);
    expect(result).toEqual(createdConfig);
  });

  it("should update an existing configuration", async () => {
    const configId = 1;
    const updatedConfig = { name: "Updated Config", filter: { to: "0x456" } };

    const updateSpy = jest
      .spyOn(mockConfigurationModel, "update")
      .mockResolvedValue([1]);
    jest.spyOn(mockConfigurationModel, "findByPk").mockResolvedValue({
      update: updateSpy,
    });

    await configurationService.updateConfiguration(configId, updatedConfig);

    expect(updateSpy).toHaveBeenCalledTimes(1);
  });

  it("should delete a configuration by ID", async () => {
    const configId = 1;
    const destroySpy = jest.spyOn(mockConfigurationModel, "destroy");
    jest.spyOn(mockConfigurationModel, "findByPk").mockResolvedValue({
      destroy: destroySpy,
    });

    await configurationService.deleteConfiguration(configId);

    expect(destroySpy).toHaveBeenCalled();
  });

  it("should not execute update if no configuration is updated", async () => {
    const configId = 999;
    const updatedConfig = { name: "Non-existent Config" };
    const updateSpy = jest.spyOn(mockConfigurationModel, "update");
    jest.spyOn(mockConfigurationModel, "findByPk").mockResolvedValue(null);

    await configurationService.updateConfiguration(configId, updatedConfig);

    expect(updateSpy).not.toHaveBeenCalled();
  });

  it("should not execute destroy if no configuration is deleted", async () => {
    const configId = 999;
    const destroySpy = jest.spyOn(mockConfigurationModel, "destroy");
    jest.spyOn(mockConfigurationModel, "findByPk").mockResolvedValue(null);

    await configurationService.deleteConfiguration(configId);

    expect(destroySpy).not.toHaveBeenCalled();
  });
});
