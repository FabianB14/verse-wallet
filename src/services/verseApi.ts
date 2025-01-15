import axios from 'axios';

const API_URL = process.env.REACT_APP_VERSE_API_URL || 'https://verse-coin-7b67e4d49b53.herokuapp.com';
// Getting the API key from environment variables
const API_KEY = process.env.REACT_APP_API_KEY;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add the API key to the Axios instance headers
api.interceptors.request.use((config) => {
    if (API_KEY) {
      config.headers['X-API-Key'] = API_KEY;
    }
    return config;
  });
export interface User {
  username: string;
  email: string;
  walletAddress: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  walletAddress?: string;
}

export const verseApi = {
  // User Management
  registerUser: async (userData: {
    username: string;
    email: string;
    password: string;
    walletAddress: string;
  }) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },

  loginUser: async (credentials: LoginCredentials) => {
    const response = await api.post('/users/login', credentials);
    return response.data;
  },

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
  },

    // Swap functions
    swapTokens: async (data: {
        fromToken: string;
        toToken: string;
        fromAmount: number;
        minimumReceived: number;
        address: string;
    }) => {
        const response = await api.post('/swap', data);
        return response.data;
  }
};