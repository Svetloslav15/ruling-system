import { Router } from "express";

export const configurationRouter = (configurationService) => {
  const router = Router();

  router.post("/", async (req, res) => {
    const config = await configurationService.createConfiguration(req.body);
    res.status(201).json(config);
  });

  router.get("/", async (req, res) => {
    const configs = await configurationService.getConfigurations();
    res.status(200).json(configs);
  });

  router.put("/:id", async (req, res) => {
    const config = await configurationService.updateConfiguration(
      req.params.id,
      req.body
    );
    if (config) {
      res.status(200).json(config);
    } else {
      res.status(404).json({ error: "Configuration not found" });
    }
  });

  router.delete("/:id", async (req, res) => {
    await configurationService.deleteConfiguration(req.params.id);
    res.status(204).send();
  });

  return router;
};
