import React from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from '../ui/button'
import { useState } from 'react'
import { useWeb3Modal } from '@web3modal/wagmi/react'

export function ConnectButton() {
  const { address, isConnected } = useAccount()
  const { disconnectAsync } = useDisconnect()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (isConnected) {
      setIsLoading(true)
      try {
        await disconnectAsync()
      } catch (error) {
        console.error('Failed to disconnect:', error)
      } finally {
        setIsLoading(false)
      }
      return
    }

    const { Web3Modal } = await import('@web3modal/wagmi/react')
    Web3Modal.open()
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <Button
      variant="verse"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        'Loading...'
      ) : isConnected ? (
        formatAddress(address!)
      ) : (
        'Connect Wallet'
      )}
    </Button>
  )
}