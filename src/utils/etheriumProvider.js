import { WebSocketProvider } from "ethers";
import dotenv from "dotenv";

dotenv.config();

export const createEthereumProvider = () => {
  return new WebSocketProvider(
    `wss://mainnet.infura.io/ws/v3/${process.env.INFURA_PROJECT_ID}`
  );
};
