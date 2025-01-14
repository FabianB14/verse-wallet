import { useState } from 'react'
import { useWalletStore } from '../store/useWalletStore'
import { verseApi } from '../services/verseApi'
import { parseEther } from 'viem'
import { StakingInfo } from '../types'

export function useVerse() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { address, verseBalance, setVerseBalance } = useWalletStore()

  const sendVerse = async (to: string, amount: number) => {
    if (!address) throw new Error('Wallet not connected')
    
    try {
      setIsLoading(true)
      setError(null)

      if (amount > verseBalance) {
        throw new Error('Insufficient balance')
      }

      await verseApi.transferTokens({
        sender: address,
        recipient: to,
        amount: parseFloat(parseEther(amount.toString()).toString())
      })

      // Update balance after transaction
      const balanceData = await verseApi.getBalance(address)
      setVerseBalance(balanceData.balance)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const getStakingInfo = async (): Promise<StakingInfo> => {
    if (!address) throw new Error('Wallet not connected')
    
    try {
      setIsLoading(true)
      setError(null)
      
      const info = await verseApi.getStakingInfo(address)
      return info
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get staking info')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const stakeVerse = async (amount: number) => {
    if (!address) throw new Error('Wallet not connected')
    
    try {
      setIsLoading(true)
      setError(null)

      await verseApi.stakeTokens({
        address,
        amount: parseFloat(parseEther(amount.toString()).toString())
      })

      // Update balance after staking
      const balanceData = await verseApi.getBalance(address)
      setVerseBalance(balanceData.balance)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Staking failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    sendVerse,
    stakeVerse,
    getStakingInfo
  }
}