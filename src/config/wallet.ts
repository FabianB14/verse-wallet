import { mainnet, sepolia } from 'wagmi/chains'
import { createConfig } from 'wagmi'
import { configureChains } from '@wagmi/core';
import { publicProvider } from '@wagmi/core/providers';
import { getDefaultWallets } from '@rainbow-me/rainbowkit'


const walletConnectProjectId = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID || ''

const { chains, publicClient } = configureChains(
  [mainnet, sepolia],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Verse Wallet',
  projectId: walletConnectProjectId,
  chains,
})

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

export { chains }