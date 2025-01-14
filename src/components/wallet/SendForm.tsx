import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useWalletStore } from '@/store/useWalletStore'
import { Alert, AlertDescription } from '../ui/alert'
import { AlertCircle } from 'lucide-react'

export function SendForm() {
  const { address } = useAccount()
  const { verseBalance } = useWalletStore()
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Validate input
      if (!recipient || !amount) {
        throw new Error('Please fill in all fields')
      }

      const amountNum = parseFloat(amount)
      if (isNaN(amountNum) || amountNum <= 0) {
        throw new Error('Please enter a valid amount')
      }

      if (amountNum > verseBalance) {
        throw new Error('Insufficient balance')
      }

      // TODO: Implement send transaction
      // await sendTransaction({
      //   to: recipient,
      //   value: parseEther(amount)
      // })

      // Clear form
      setRecipient('')
      setAmount('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="recipient">Recipient Address</Label>
        <Input
          id="recipient"
          placeholder="0x..."
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <div className="relative">
          <Input
            id="amount"
            type="number"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <span className="absolute right-3 top-2 text-sm text-gray-500">
            VERSE
          </span>
        </div>
        <p className="text-sm text-gray-500">
          Balance: {verseBalance} VERSE
        </p>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Sending...' : 'Send VERSE'}
      </Button>
    </form>
  )
}