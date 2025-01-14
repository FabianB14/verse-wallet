import React from 'react';
import { WalletProvider } from './components/wallet/WalletProvider'
import { WalletInterface } from './components/wallet/WalletInterface'

function App() {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Verse Wallet</h1>
          </header>
          
          <main>
            <WalletInterface />
          </main>
        </div>
      </div>
    </WalletProvider>
  )
}

export default App