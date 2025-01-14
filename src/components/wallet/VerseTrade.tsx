import React, { useState } from 'react'
import { useWalletStore } from '../../store/useWalletStore'
import { verseApi } from '../../services/verseApi'
import { useAccount } from 'wagmi'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Alert, AlertDescription } from '../ui/alert'
import { AlertCircle, ArrowDownToLine, ArrowUpToLine } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

interface VerseTradeProps {
  type: 'buy' | 'sell'
}

export function VerseTrade({ type }: VerseTradeProps) {
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { address } = useAccount()
  const { verseBalance, versePrice } = useWalletStore()

  const handleTrade = async () => {
    if (!address || !amount) return
    
    try {
      setIsLoading(true)
      setError(null)

      const amountNum = parseFloat(amount)
      if (isNaN(amountNum) || amountNum <= 0) {
        throw new Error('Please enter a valid amount')
      }

      if (type === 'sell' && amountNum > verseBalance) {
        throw new Error('Insufficient VERSE balance')
      }

      const usdValue = amountNum * versePrice

      // Call the appropriate API endpoint
      if (type === 'buy') {
        // Implement buy logic here
        await verseApi.transferTokens({
          sender: 'VERSE_POOL',
          recipient: address,
          amount: amountNum
        })
      } else {
        // Implement sell logic here
        await verseApi.transferTokens({
          sender: address,
          recipient: 'VERSE_POOL',
          amount: amountNum
        })
      }

      setAmount('')
      // Close dialog after successful transaction
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          {type === 'buy' ? (
            <ArrowDownToLine className="mr-2 h-4 w-4" />
          ) : (
            <ArrowUpToLine className="mr-2 h-4 w-4" />
          )}
          {type === 'buy' ? 'Buy' : 'Sell'} VERSE
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{type === 'buy' ? 'Buy' : 'Sell'} VERSE</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label>Amount in VERSE</Label>
            <Input
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              ≈ ${(parseFloat(amount || '0') * versePrice).toFixed(2)} USD
            </p>
          </div>

          {type === 'sell' && (
            <div className="text-sm text-muted-foreground">
              Available: {verseBalance} VERSE
            </div>
          )}

          <Button
            className="w-full"
            disabled={isLoading || !amount}
            onClick={handleTrade}
          >
            {isLoading ? 'Processing...' : `${type === 'buy' ? 'Buy' : 'Sell'} VERSE`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}