import { Router } from "express";

const StatusCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const Messages = {
  InternalServerErrorMessage: "Something went wrong, try again later",
  ConfigurationNotFoundMessage: "Configuration not found",
};

export const configurationRouter = (configurationService, logger) => {
  const router = Router();

  router.post("/", async (req, res) => {
    try {
      const config = await configurationService.createConfiguration(req.body);
      if (config) {
        res.status(StatusCodes.CREATED).json(config);
      }
    } catch (error) {
      logger.error(`Error in POST /configurations: ${error.message}`);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: Messages.InternalServerErrorMessage });
    }
  });

  router.get("/", async (req, res) => {
    try {
      const configs = await configurationService.getConfigurations();
      res.status(StatusCodes.OK).json(configs);
    } catch (error) {
      logger.error(`Error in GET /configurations: ${error.message}`);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: Messages.InternalServerErrorMessage });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const config = await configurationService.updateConfiguration(
        req.params.id,
        req.body
      );
      if (config) {
        res.status(StatusCodes.OK).json(config);
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: Messages.ConfigurationNotFoundMessage });
      }
    } catch (error) {
      logger.error(
        `Error in PUT /configurations/${req.params.id}: ${error.message}`
      );
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: Messages.InternalServerErrorMessage });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      await configurationService.deleteConfiguration(req.params.id);
      res.status(StatusCodes.OK).send();
    } catch (error) {
      logger.error(
        `Error in DELETE /configurations/${req.params.id}: ${error.message}`
      );
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: Messages.InternalServerErrorMessage });
    }
  });

  return router;
};
