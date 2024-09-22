import express from "express";
import { scopePerRequest } from "awilix-express";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import container from "./config/container.js";
import { configurationRouter } from "./routes/configurationRoutes.js";

const app = express();

app.use(express.json());

app.use(scopePerRequest(container));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const configurationService = container.resolve("configurationService");
app.use("/configurations", configurationRouter(configurationService));

export default app;
