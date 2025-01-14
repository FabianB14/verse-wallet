import React, { useState, useEffect } from 'react'
import { useWalletStore } from '../../store/useWalletStore'
import { verseApi } from '../../services/verseApi'
import { useAccount } from 'wagmi'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Alert, AlertDescription } from '../ui/alert'
import { AlertCircle, ArrowDownUp, ArrowDown } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Card } from '../ui/card'

interface Token {
  symbol: string
  name: string
  balance: number
  price: number
  decimals: number
  icon?: string
}

export function VerseSwap() {
  const [fromToken, setFromToken] = useState<string>('ETH')
  const [toToken, setToToken] = useState<string>('VERSE')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [slippage, setSlippage] = useState('0.5')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { address } = useAccount()
  const { verseBalance, versePrice } = useWalletStore()

  // Mock token list - in real app, fetch from API
  const tokens: Record<string, Token> = {
    ETH: {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: 1.5,
      price: 2500,
      decimals: 18
    },
    VERSE: {
      symbol: 'VERSE',
      name: 'Verse',
      balance: verseBalance,
      price: versePrice,
      decimals: 18
    },
    USDC: {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: 1000,
      price: 1,
      decimals: 6
    }
  }

  useEffect(() => {
    if (!fromAmount || isNaN(parseFloat(fromAmount))) {
      setToAmount('')
      return
    }

    const fromTokenData = tokens[fromToken]
    const toTokenData = tokens[toToken]
    const amount = parseFloat(fromAmount)

    if (fromTokenData && toTokenData) {
      // Calculate exchange rate based on token prices
      const exchangeRate = fromTokenData.price / toTokenData.price
      const calculatedAmount = amount * exchangeRate
      setToAmount(calculatedAmount.toFixed(toTokenData.decimals))
    }
  }, [fromAmount, fromToken, toToken])

  const handleSwap = async () => {
    if (!address || !fromAmount) return
    
    try {
      setIsLoading(true)
      setError(null)

      const amount = parseFloat(fromAmount)
      if (isNaN(amount) || amount <= 0) {
        throw new Error('Please enter a valid amount')
      }

      const fromTokenData = tokens[fromToken]
      if (amount > fromTokenData.balance) {
        throw new Error(`Insufficient ${fromToken} balance`)
      }

      // Calculate minimum received amount based on slippage
      const slippagePercent = parseFloat(slippage) / 100
      const minimumReceived = parseFloat(toAmount) * (1 - slippagePercent)

      // Call swap API
      await verseApi.swapTokens({
        fromToken,
        toToken,
        fromAmount: amount,
        minimumReceived,
        address
      })

      // Reset form
      setFromAmount('')
      setToAmount('')
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Swap failed')
    } finally {
      setIsLoading(false)
    }
  }

  const switchTokens = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const calculateImpact = () => {
    if (!fromAmount || !toAmount) return 0
    const fromValue = parseFloat(fromAmount) * tokens[fromToken].price
    const toValue = parseFloat(toAmount) * tokens[toToken].price
    return ((fromValue - toValue) / fromValue) * 100
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <ArrowDownUp className="mr-2 h-4 w-4" />
          Swap
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Swap Tokens</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card className="p-4">
            <div className="space-y-4">
              {/* From Token */}
              <div className="space-y-2">
                <Label>From</Label>
                <div className="flex space-x-2">
                  <Select value={fromToken} onValueChange={setFromToken}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(tokens).map((token) => (
                        <SelectItem 
                          key={token.symbol} 
                          value={token.symbol}
                          disabled={token.symbol === toToken}
                        >
                          {token.symbol}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  Balance: {tokens[fromToken].balance} {fromToken}
                </div>
              </div>

              {/* Swap Direction Button */}
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={switchTokens}
                  className="h-8 w-8 rounded-full"
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </div>

              {/* To Token */}
              <div className="space-y-2">
                <Label>To</Label>
                <div className="flex space-x-2">
                  <Select value={toToken} onValueChange={setToToken}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(tokens).map((token) => (
                        <SelectItem 
                          key={token.symbol} 
                          value={token.symbol}
                          disabled={token.symbol === fromToken}
                        >
                          {token.symbol}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={toAmount}
                    readOnly
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  Balance: {tokens[toToken].balance} {toToken}
                </div>
              </div>
            </div>
          </Card>

          {/* Swap Details */}
          <Card className="p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Exchange Rate</span>
              <span>
                1 {fromToken} = {(tokens[fromToken].price / tokens[toToken].price).toFixed(6)} {toToken}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price Impact</span>
              <span className={calculateImpact() > 2 ? "text-red-500" : ""}>
                {calculateImpact().toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Slippage Tolerance</span>
              <select
                value={slippage}
                onChange={(e) => setSlippage(e.target.value)}
                className="bg-transparent border-none text-right outline-none"
              >
                <option value="0.5">0.5%</option>
                <option value="1">1.0%</option>
                <option value="2">2.0%</option>
              </select>
            </div>
          </Card>

          {/* Swap Button */}
          <Button
            className="w-full"
            disabled={isLoading || !fromAmount || !toAmount}
            onClick={handleSwap}
          >
            {isLoading ? 'Swapping...' : 'Swap Tokens'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}