import { create } from 'zustand'
import { BigNumber } from '@ethersproject/bignumber'; 
import { WalletState } from '../types'

interface WalletStore extends WalletState {
  setAddress: (address: string | null) => void
  setIsConnected: (isConnected: boolean) => void
  setBalance: (balance: BigNumber) => void
  setVerseBalance: (balance: number) => void
  setVersePrice: (price: number) => void
  setStakingInfo: (info: WalletState['stakingInfo']) => void
  addTransaction: (tx: WalletState['transactions'][0]) => void
  setError: (error: string | null) => void
  reset: () => void
}

const initialState: WalletState = {
  address: null,
  isConnected: false,
  balance: BigNumber.from(0),
  verseBalance: 0,
  versePrice: 0,
  transactions: [],
  stakingInfo: null,
  isLoading: false,
  error: null,
}

export const useWalletStore = create<WalletStore>((set) => ({
  ...initialState,

  setAddress: (address) => set({ address }),
  
  setIsConnected: (isConnected) => set({ isConnected }),
  
  setBalance: (balance) => set({ balance }),
  
  setVerseBalance: (balance) => set({ verseBalance: balance }),
  
  setVersePrice: (price) => set({ versePrice: price }),
  
  setStakingInfo: (stakingInfo) => set({ stakingInfo }),
  
  addTransaction: (transaction) => 
    set((state) => ({
      transactions: [transaction, ...state.transactions]
    })),
    
  setError: (error) => set({ error }),
  
  reset: () => set(initialState)
}))