import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { useWalletStore } from '../store/useWalletStore'
import { verseApi } from '../services/verseApi'
import { useState } from 'react'

export function useWallet() {
  const { address, isConnected } = useAccount()
  const { disconnectAsync } = useDisconnect()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const {
    setAddress,
    setIsConnected,
    setVerseBalance,
    setVersePrice,
  } = useWalletStore()

  const { data: ethBalance } = useBalance({
    address: address as `0x${string}`,
  })

  const updateBalances = async () => {
    if (!address) return
    
    try {
      setIsLoading(true)
      const balanceData = await verseApi.getBalance(address)
      setVerseBalance(balanceData.balance)
      
      const stats = await verseApi.getVerseStats()
      setVersePrice(stats.price)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update balances')
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnect = async () => {
    try {
      setIsLoading(true)
      if (address) {
        setAddress(address)
        setIsConnected(true)
        await updateBalances()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = async () => {
    try {
      setIsLoading(true)
      await disconnectAsync()
      setAddress(null)
      setIsConnected(false)
      setVerseBalance(0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to disconnect wallet')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    address,
    isConnected,
    ethBalance,
    isLoading,
    error,
    connect: handleConnect,
    disconnect: handleDisconnect,
    updateBalances,
  }
}