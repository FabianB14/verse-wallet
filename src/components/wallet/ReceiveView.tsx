import React from 'react'
import { useAccount } from 'wagmi'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Copy } from 'lucide-react'
import { QRCode } from 'qrcode.react'

export function ReceiveView() {
  const { address } = useAccount()

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      // TODO: Add toast notification
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Card className="p-4 bg-white">
          {address && (
            <QRCode
              value={address}
              size={200}
              level="H"
              includeMargin={true}
            />
          )}
        </Card>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-center text-gray-500">Your Wallet Address</p>
        <div className="flex items-center justify-center space-x-2">
          <code className="px-2 py-1 bg-gray-100 rounded">
            {address}
          </code>
          <Button
            variant="ghost"
            size="icon"
            onClick={copyAddress}
            title="Copy address"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>Send only VERSE to this address.</p>
        <p>Sending other tokens may result in permanent loss.</p>
      </div>
    </div>
  )
}