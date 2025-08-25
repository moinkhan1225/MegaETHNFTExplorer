const mainnets = [
  { name: 'Ethereum', nativeCoin: 'ETH', tokenStandards: ['ERC-20', 'ERC-721', 'ERC-1155'], evmCompatible: true },
  { name: 'BNB Chain', nativeCoin: 'BNB', tokenStandards: ['BEP-20', 'BEP-721'], evmCompatible: true },
  { name: 'Polygon', nativeCoin: 'MATIC', tokenStandards: ['ERC-20', 'ERC-721', 'ERC-1155'], evmCompatible: true },
  { name: 'Solana', nativeCoin: 'SOL', tokenStandards: ['SPL'], evmCompatible: false },
  { name: 'Aptos', nativeCoin: 'APT', tokenStandards: ['Coin', 'Token'], evmCompatible: false },
  { name: 'Sui', nativeCoin: 'SUI', tokenStandards: ['SUI Token'], evmCompatible: false },
  { name: 'Avalanche', nativeCoin: 'AVAX', tokenStandards: ['ERC-20', 'ERC-721'], evmCompatible: true },
  { name: 'Fantom', nativeCoin: 'FTM', tokenStandards: ['ERC-20', 'ERC-721'], evmCompatible: true },
  { name: 'Arbitrum', nativeCoin: 'ETH', tokenStandards: ['ERC-20', 'ERC-721'], evmCompatible: true },
  { name: 'Optimism', nativeCoin: 'ETH', tokenStandards: ['ERC-20', 'ERC-721'], evmCompatible: true },
  { name: 'Cronos', nativeCoin: 'CRO', tokenStandards: ['ERC-20', 'ERC-721'], evmCompatible: true },
  { name: 'Harmony', nativeCoin: 'ONE', tokenStandards: ['ERC-20', 'ERC-721'], evmCompatible: true },
  { name: 'Near', nativeCoin: 'NEAR', tokenStandards: ['NEP-141'], evmCompatible: false },
  { name: 'Tezos', nativeCoin: 'XTZ', tokenStandards: ['FA1.2', 'FA2'], evmCompatible: false },
  { name: 'Algorand', nativeCoin: 'ALGO', tokenStandards: ['ASA'], evmCompatible: false },
  { name: 'Elrond', nativeCoin: 'EGLD', tokenStandards: ['ESDT'], evmCompatible: false },
  { name: 'Cardano', nativeCoin: 'ADA', tokenStandards: ['Native Token'], evmCompatible: false },
  { name: 'Klaytn', nativeCoin: 'KLAY', tokenStandards: ['KIP-7', 'KIP-17'], evmCompatible: true },
  { name: 'EOS', nativeCoin: 'EOS', tokenStandards: ['EOS Token'], evmCompatible: false },
  { name: 'VeChain', nativeCoin: 'VET', tokenStandards: ['VIP-180'], evmCompatible: false },
];

export default mainnets;
