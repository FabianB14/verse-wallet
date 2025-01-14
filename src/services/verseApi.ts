import axios from 'axios';

const API_URL = process.env.REACT_APP_VERSE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const verseApi = {
  // Wallet functions
  createWallet: async () => {
    const response = await api.post('/wallet/create');
    return response.data;
  },

  getBalance: async (address: string) => {
    const response = await api.get(`/wallet/${address}/balance`);
    return response.data;
  },

  // Transaction functions
  transferTokens: async (data: {
    sender: string;
    recipient: string;
    amount: number;
  }) => {
    const response = await api.post('/wallet/transfer', data);
    return response.data;
  },

  getTransactionHistory: async (address: string) => {
    const response = await api.get(`/transactions/${address}`);
    return response.data;
  },

  // Staking functions
  stakeTokens: async (data: { address: string; amount: number }) => {
    const response = await api.post('/stake', data);
    return response.data;
  },

  getStakingInfo: async (address: string) => {
    const response = await api.get(`/stake/${address}`);
    return response.data;
  },

  // Asset functions
  getWalletAssets: async (address: string) => {
    const response = await api.get(`/wallet/${address}/assets`);
    return response.data;
  },

  // Price and stats
  getVerseStats: async () => {
    const response = await api.get('/stats');
    return response.data;
  }
};