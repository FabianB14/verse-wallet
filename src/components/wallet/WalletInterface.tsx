import React from 'react'
import { useAccount } from 'wagmi'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { useWalletStore } from '../../store/useWalletStore'
import { ConnectButton } from './ConnectButton'
import { Button } from '../ui/button'
import { SendForm } from './SendForm'
import { ReceiveView } from './ReceiveView'
import { StakingView } from './StakingView'
import { LoginForm } from '../auth/LoginForm'
import { RegisterForm } from '../auth/RegisterForm'
import { useAuth } from '../../hooks/useAuth'
import { 
  Wallet, Coins, ArrowUpDown, LineChart, 
  ArrowDownToLine, ArrowUpToLine,
  UserPlus, LogIn, LogOut, User
} from 'lucide-react'
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

export function WalletInterface() {
  const { address, isConnected } = useAccount()
  const { verseBalance, versePrice } = useWalletStore()
  const { getCurrentUser, logout } = useAuth()
  const currentUser = getCurrentUser()

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

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="login" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>

          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">VERSE Wallet</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4" />
            <span>{currentUser.username}</span>
          </div>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

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
                  Connected Wallet
                </CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium truncate">{address}</div>
                <p className="text-xs text-muted-foreground">
                  Connected via MetaMask
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
              <CurrencyDollarIcon  className="mr-2 h-4 w-4" />
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
              <ReceiveView />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stake">
          <StakingView />
        </TabsContent>
      </Tabs>
    </div>
  )
}