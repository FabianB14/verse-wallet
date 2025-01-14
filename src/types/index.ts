import { BigNumber } from '@ethersproject/bignumber'; 

export interface Transaction {
  hash: string
  from: string
  to: string
  value: BigNumber
  timestamp: number
  status: 'pending' | 'confirmed' | 'failed'
  type: 'send' | 'receive' | 'stake' | 'unstake' | 'claim'
}

export interface StakingInfo {
  stakedAmount: BigNumber
  rewards: BigNumber
  apr: number
  lockupPeriod: number
  earlyUnstakeFee: number
}

export interface VerseToken {
  address: string
  decimals: number
  symbol: string
  name: string
}

export interface WalletState {
  address: string | null
  isConnected: boolean
  balance: BigNumber
  verseBalance: number
  versePrice: number
  transactions: Transaction[]
  stakingInfo: StakingInfo | null
  isLoading: boolean
  error: string | null
}

export interface WalletActions {
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  sendTransaction: (to: string, amount: number) => Promise<void>
  stake: (amount: number) => Promise<void>
  unstake: (amount: number) => Promise<void>
  claimRewards: () => Promise<void>
}