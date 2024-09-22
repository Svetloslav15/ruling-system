import { jest } from "@jest/globals";

import { ConfigurationService } from "./ConfigurationService";
import {
  mockConfigurationModel,
  mockLogger,
  mockUtils,
} from "../../mocks/mocks";

describe("ConfigurationService", () => {
  let configurationService;

  beforeEach(() => {
    configurationService = new ConfigurationService({
      ConfigurationModel: mockConfigurationModel,
      logger: mockLogger,
      utils: mockUtils,
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
    jest
      .spyOn(configurationService.utils, "generateGuid")
      .mockReturnValue("test-guid");

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

  it("should log and throw error in createConfiguration if an error occurs", async () => {
    const errorMessage = "Database error";
    mockConfigurationModel.create.mockRejectedValue(new Error(errorMessage));
    mockUtils.generateGuid.mockReturnValue("test-guid");

    await expect(
      configurationService.createConfiguration({ name: "Test Config" })
    ).rejects.toThrow(`Error creating configuration: ${errorMessage}`);

    expect(mockLogger.error).toHaveBeenCalledWith(
      `Error creating configuration: ${errorMessage}`
    );
  });

  it("should log and throw error in getConfigurations if an error occurs", async () => {
    const errorMessage = "Database error";
    mockConfigurationModel.findAll.mockRejectedValue(new Error(errorMessage));

    await expect(configurationService.getConfigurations()).rejects.toThrow(
      `Error fetching configurations: ${errorMessage}`
    );

    expect(mockLogger.error).toHaveBeenCalledWith(
      `Error fetching configurations: ${errorMessage}`
    );
  });

  it("should log and throw error in updateConfiguration if an error occurs", async () => {
    const errorMessage = "Database error";
    mockConfigurationModel.findByPk.mockRejectedValue(new Error(errorMessage));

    await expect(
      configurationService.updateConfiguration("test-id", {
        name: "Updated Config",
      })
    ).rejects.toThrow(`Error updating configuration test-id: ${errorMessage}`);

    expect(mockLogger.error).toHaveBeenCalledWith(
      `Error updating configuration test-id: ${errorMessage}`
    );
  });

  it("should log and throw error in deleteConfiguration if an error occurs", async () => {
    const errorMessage = "Database error";
    mockConfigurationModel.findByPk.mockRejectedValue(new Error(errorMessage));

    await expect(
      configurationService.deleteConfiguration("test-id")
    ).rejects.toThrow(`Error deleting configuration test-id: ${errorMessage}`);

    expect(mockLogger.error).toHaveBeenCalledWith(
      `Error deleting configuration test-id: ${errorMessage}`
    );
  });
});
