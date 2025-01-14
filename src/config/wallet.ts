import { mainnet, sepolia } from 'wagmi/chains'
import { configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
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