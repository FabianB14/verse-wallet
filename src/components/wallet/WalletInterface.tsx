import React, { useEffect } from 'react'
import { useAccount, useBalance } from 'wagmi'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { useWalletStore } from '@/store/useWalletStore'
import { ConnectButton } from './ConnectButton'
import { Button } from '../ui/button'
import { Wallet, Coins, ArrowUpDown, LineChart, 
         ArrowDownToLine, ArrowUpToLine, HandCoins } from 'lucide-react'

export function WalletInterface() {
  const { address, isConnected } = useAccount()
  const { verseBalance, versePrice } = useWalletStore()
  const { data: balance } = useBalance({
    address: address as `0x${string}`,
  })

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Connect Your Wallet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="send">Send</TabsTrigger>
          <TabsTrigger value="receive">Receive</TabsTrigger>
          <TabsTrigger value="stake">Stake</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  VERSE Balance
                </CardTitle>
                <Coins className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{verseBalance} VERSE</div>
                <p className="text-xs text-muted-foreground">
                  ≈ ${(verseBalance * versePrice).toFixed(2)} USD
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  VERSE Price
                </CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${versePrice}</div>
                <p className="text-xs text-muted-foreground">
                  Last 24h: +5.12%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  ETH Balance
                </CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {balance?.formatted ?? '0'} {balance?.symbol}
                </div>
                <p className="text-xs text-muted-foreground">
                  ≈ ${parseFloat(balance?.formatted ?? '0') * 2500} USD
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="w-full" variant="outline">
              <ArrowDownToLine className="mr-2 h-4 w-4" />
              Buy VERSE
            </Button>
            <Button className="w-full" variant="outline">
              <ArrowUpToLine className="mr-2 h-4 w-4" />
              Sell VERSE
            </Button>
            <Button className="w-full" variant="outline">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Swap
            </Button>
            <Button className="w-full" variant="outline">
              <HandCoins className="mr-2 h-4 w-4" />
              Stake
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="send">
          <Card>
            <CardHeader>
              <CardTitle>Send VERSE</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Send Form Component will go here */}
              <SendForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receive">
          <Card>
            <CardHeader>
              <CardTitle>Receive VERSE</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Receive Component will go here */}
              <ReceiveView />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stake">
          <Card>
            <CardHeader>
              <CardTitle>Stake VERSE</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Staking Component will go here */}
              <StakingView />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Placeholder components - we'll implement these next
const SendForm = () => (
  <div>Send Form Coming Soon</div>
)

const ReceiveView = () => (
  <div>Receive View Coming Soon</div>
)

const StakingView = () => (
  <div>Staking View Coming Soon</div>
)