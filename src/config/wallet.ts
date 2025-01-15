import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'wagmi/chains';
import { http } from 'wagmi';
import { createConfig } from 'wagmi';

const walletConnectProjectId = process.env.VITE_WALLET_CONNECT_PROJECT_ID || '';

export const config = createConfig(
  getDefaultConfig({
    appName: 'Verse Wallet',
    projectId: walletConnectProjectId,
    chains: [mainnet, sepolia],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
    ssr: false,
  }),
);

export const chains = [mainnet, sepolia];