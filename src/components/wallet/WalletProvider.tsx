import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { ReactNode } from 'react'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID || ''

// 2. Create wagmiConfig
const metadata = {
  name: 'Verse Wallet',
  description: 'Verse Wallet Web3 Interface',
  url: 'https://verse-coin-wallet-1e5603e9fb9d.herokuapp.com/', // TODO: Update with your website
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, sepolia]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

interface WalletProviderProps {
  children: ReactNode
}

export function WalletProvider({ children }: WalletProviderProps) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
}