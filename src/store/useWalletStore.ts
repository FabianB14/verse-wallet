import { create } from 'zustand'
import { BigNumber } from 'ethers'

interface WalletState {
  address: string | null
  balance: BigNumber
  isConnected: boolean
  verseBalance: number
  versePrice: number
  setAddress: (address: string | null) => void
  setBalance: (balance: BigNumber) => void
  setIsConnected: (isConnected: boolean) => void
  setVerseBalance: (balance: number) => void
  setVersePrice: (price: number) => void
  disconnect: () => void
}

export const useWalletStore = create<WalletState>((set) => ({
  address: null,
  balance: BigNumber.from(0),
  isConnected: false,
  verseBalance: 0,
  versePrice: 0,
  setAddress: (address) => set({ address }),
  setBalance: (balance) => set({ balance }),
  setIsConnected: (isConnected) => set({ isConnected }),
  setVerseBalance: (balance) => set({ verseBalance: balance }),
  setVersePrice: (price) => set({ versePrice: price }),
  disconnect: () => set({
    address: null,
    balance: BigNumber.from(0),
    isConnected: false,
    verseBalance: 0
  })
}))