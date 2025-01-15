export const VERSE_TOKEN = {
    address: process.env.REACT_APP_VERSE_TOKEN_ADDRESS as string,
    decimals: 18,
    symbol: 'VERSE',
    name: 'Verse Token',
  }
  
  export const VERSE_NETWORK = {
    chainId: parseInt(process.env.REACT_APP_VERSE_CHAIN_ID || '1234'),
    name: 'Verse Network',
    rpcUrl: process.env.REACT_APP_VERSE_RPC_URL,
    blockExplorer: 'https://explorer.verse-network.com',
  }
  
  export const SUPPORTED_CHAINS = [
    VERSE_NETWORK.chainId,
    1, // Ethereum Mainnet
    11155111, // Sepolia Testnet
  ]
  
  export const WALLET_CONNECT_CONFIG = {
    projectId: process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID as string,
    metadata: {
      name: 'Verse Wallet',
      description: 'Verse Network Web Wallet',
      url: 'https://wallet.verse-network.com',
      icons: ['https://wallet.verse-network.com/icon.png'],
    },
  }