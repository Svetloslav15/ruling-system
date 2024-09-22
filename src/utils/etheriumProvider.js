// src/utils/ethereumProvider.js
import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

export const createEthereumProvider = () => {
  return new ethers.providers.InfuraProvider('mainnet', process.env.INFURA_PROJECT_ID);
};
