import React from 'react'
import { WagmiConfig } from 'wagmi'
import { RainbowKitProvider as RainbowKit } from '@rainbow-me/rainbowkit'
import { wagmiConfig, chains } from '../config/wallet'
import '@rainbow-me/rainbowkit/styles.css'

interface RainbowKitWrapperProps {
  children: React.ReactNode
}

export function RainbowKitWrapper({ children }: RainbowKitWrapperProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKit chains={chains}>
        {children}
      </RainbowKit>
    </WagmiConfig>
  )
}