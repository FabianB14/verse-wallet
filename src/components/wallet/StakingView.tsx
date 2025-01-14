import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Alert, AlertDescription } from '../ui/alert'
import { AlertCircle, LockIcon, Percent, Coins } from 'lucide-react'
import { useWalletStore } from '@/store/useWalletStore'

export function StakingView() {
  const { address } = useAccount()
  const { verseBalance } = useWalletStore()
  const [stakeAmount, setStakeAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Mock staking data - replace with actual data from smart contract
  const stakedAmount = 1000
  const rewards = 50
  const apr = 12.5

  const handleStake = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Validate input
      const amount = parseFloat(stakeAmount)
      if (isNaN(amount) || amount <= 0) {
        throw new Error('Please enter a valid amount')
      }

      if (amount > verseBalance) {
        throw new Error('Insufficient balance')
      }

      // TODO: Implement staking transaction
      // await stakeVerse(amount)

      setStakeAmount('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Staking failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnstake = async () => {
    setError(null)
    setIsLoading(true)

    try {
      // TODO: Implement unstaking transaction
      // await unstakeVerse()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unstaking failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClaimRewards = async () => {
    setError(null)
    setIsLoading(true)

    try {
      // TODO: Implement rewards claim transaction
      // await claimRewards()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to claim rewards')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Staked
            </CardTitle>
            <LockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stakedAmount} VERSE</div>
            <p className="text-xs text-muted-foreground">
              ≈ ${(stakedAmount * 0.1).toFixed(2)} USD
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Staking APR
            </CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{apr}%</div>
            <p className="text-xs text-muted-foreground">
              Annual Percentage Rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Rewards
            </CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rewards} VERSE</div>
            <p className="text-xs text-muted-foreground">
              ≈ ${(rewards * 0.1).toFixed(2)} USD
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stake VERSE</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleStake} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="stake-amount">Amount to Stake</Label>
              <div className="relative">
                <Input
                  id="stake-amount"
                  type="number"
                  placeholder="0.0"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                />
                <span className="absolute right-3 top-2 text-sm text-gray-500">
                  VERSE
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Available: {verseBalance} VERSE
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                className="flex-1"
                disabled={isLoading}
              >
                {isLoading ? 'Staking...' : 'Stake VERSE'}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleUnstake}
                disabled={isLoading || stakedAmount <= 0}
              >
                Unstake
              </Button>
            </div>
          </form>

          <div className="mt-4 pt-4 border-t">
            <Button
              className="w-full"
              variant="secondary"
              onClick={handleClaimRewards}
              disabled={isLoading || rewards <= 0}
            >
              Claim Rewards
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Staking Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">
            • Minimum staking period: 7 days
          </p>
          <p className="text-sm">
            • Early unstaking fee: 10%
          </p>
          <p className="text-sm">
            • Rewards are distributed daily
          </p>
          <p className="text-sm">
            • APR is variable and subject to change
          </p>
        </CardContent>
      </Card>
    </div>
  )
}