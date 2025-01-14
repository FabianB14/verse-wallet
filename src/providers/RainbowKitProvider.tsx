import React from 'react'
import { WagmiConfig } from 'wagmi'
import { RainbowKitProvider as RainbowKit } from '@rainbow-me/rainbowkit'
import { wagmiConfig, chains } from '../config/wallet'
import '@rainbow-me/rainbowkit/styles.css'
import { Chain, RainbowKitProvider } from '@rainbow-me/rainbowkit';

interface RainbowKitWrapperProps {
  children: React.ReactNode;
  chains: Chain[];
}

export function RainbowKitWrapper({ children }: RainbowKitWrapperProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKit>
        {children}
      </RainbowKit>
    </WagmiConfig>
  )
}