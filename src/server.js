import app from "./app.js";
import container from "./config/container.js";

const logger = container.resolve("logger");
const transactionService = container.resolve("transactionService");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  transactionService.startMonitoring();
});
