# VERSE Wallet

A modern Web3 wallet interface for the VERSE blockchain ecosystem. Built with React, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- 🔒 Secure Web3 wallet connection (MetaMask, WalletConnect)
- 💼 Full VERSE token management
- 🔄 Token swapping interface
- 📈 Staking platform integration
- 👥 User authentication & profile management
- 💰 Buy/Sell VERSE tokens
- 📊 Real-time price tracking
- 🌓 Dark/Light mode support

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **State Management**: Zustand
- **Web3 Integration**: wagmi, ethers.js
- **Authentication**: Custom auth with VERSE API
- **API Client**: Axios

## Project Structure

```bash
verse-wallet/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/              # Base UI components
│   │   │   ├── alert.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── toast.tsx
│   │   ├── auth/           # Authentication components
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   └── wallet/         # Wallet functionality
│   │       ├── ConnectButton.tsx
│   │       ├── ReceiveView.tsx
│   │       ├── SendForm.tsx
│   │       ├── StakingView.tsx
│   │       ├── VerseTrade.tsx
│   │       ├── VerseSwap.tsx
│   │       ├── WalletInterface.tsx
│   │       └── WalletProvider.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useVerse.ts
│   │   └── useWalletStore.ts
│   ├── services/           # API integration
│   │   └── verseApi.ts
│   ├── store/             # State management
│   │   └── useWalletStore.ts
│   ├── styles/            # Global styles
│   │   ├── globals.css
│   │   └── index.css
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   ├── lib/               # Utilities
│   │   └── utils.ts
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Web3 wallet (MetaMask, etc.)
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/verse-wallet.git
cd verse-wallet
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Update environment variables in .env
```env
VITE_VERSE_API_URL=https://verse-coin-7b67e4d49b53.herokuapp.com
VITE_WALLET_CONNECT_PROJECT_ID=your_project_id
```

5. Start development server
```bash
npm run dev
```

The app will be available at http://localhost:3000

### Environment Setup

Required environment variables:

```env
# API Configuration
VITE_VERSE_API_URL=
VITE_WALLET_CONNECT_PROJECT_ID=

# Optional Configuration
VITE_VERSE_CHAIN_ID=1234
VITE_VERSE_TOKEN_ADDRESS=0x...
```

## Core Components

### WalletProvider

Provides Web3 wallet connectivity:

```typescript
<WalletProvider>
  <App />
</WalletProvider>
```

### WalletInterface

Main wallet dashboard:
- Connect wallet button
- Token balances
- Navigation tabs
- Action buttons

### VerseSwap

Token swap interface:
- Multi-token support
- Real-time price data
- Slippage control
- Price impact warnings

### VerseTrade

Buy/Sell VERSE interface:
- Market price data
- Order execution
- Transaction history

### StakingView

Staking platform:
- Stake/Unstake VERSE
- View rewards
- APY information

## API Integration

The wallet connects to the VERSE blockchain API. Key endpoints:

### Authentication
- `POST /users/register` - Create new account
- `POST /users/login` - Login user
- `GET /users/profile` - Get user profile

### Wallet Operations
- `POST /wallet/create` - Create new wallet
- `GET /wallet/{address}/balance` - Get wallet balance
- `POST /wallet/transfer` - Send tokens

### Trading & Swapping
- `POST /swap` - Execute token swap
- `GET /price` - Get token prices
- `POST /trade` - Execute buy/sell

### Staking
- `POST /stake` - Stake tokens
- `POST /unstake` - Unstake tokens
- `GET /stake/rewards` - Get staking rewards

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Run tests:
```bash
npm test
```

4. Build for production:
```bash
npm run build
```

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
vercel --prod
```

### Deploy to Heroku

```bash
heroku create verse-wallet
git push heroku main
```

## Contributing

1. Fork the repository
2. Create feature branch
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit changes
   ```bash
   git commit -m 'Add YourFeature'
   ```
4. Push to branch
   ```bash
   git push origin feature/YourFeature
   ```
5. Open pull request

## Security Considerations

- Never store private keys
- Implement rate limiting
- Use environment variables
- Validate all input
- Secure API endpoints
- Regular security audits
- Protected routes
- Input sanitization

## License

MIT License - see LICENSE.md

## Support

- Documentation: [docs.verse.com](https://docs.verse.com)
- Issues: GitHub Issues
- Discord: [VERSE Discord](https://discord.gg/NDb3YA3pgg)
- Email: support@verse.com TBD