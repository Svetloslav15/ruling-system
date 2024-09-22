import winston from "winston";
import dotenv from "dotenv";

const FILE_NAME = "app.log";
dotenv.config();

export const createLogger = () => {
  return winston.createLogger({
    level: process.env.LOG_LEVEL,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: FILE_NAME }),
    ],
  });
};
