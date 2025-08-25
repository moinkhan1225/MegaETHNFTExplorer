const testnets = [
  // Ethereum
  { name: 'Sepolia', mainnet: 'Ethereum', tokenStandards: ['ERC-20', 'ERC-721', 'ERC-1155'], evmCompatible: true, faucetURL: 'https://sepoliafaucet.com' },
  { name: 'Goerli', mainnet: 'Ethereum', tokenStandards: ['ERC-20', 'ERC-721', 'ERC-1155'], evmCompatible: true, faucetURL: 'https://goerlifaucet.com' },

  // Polygon
  { name: 'Mumbai', mainnet: 'Polygon', tokenStandards: ['ERC-20', 'ERC-721', 'ERC-1155'], evmCompatible: true, faucetURL: 'https://faucet.polygon.technology' },

  // BNB Chain
  { name: 'BNB Testnet', mainnet: 'BNB Chain', tokenStandards: ['BEP-20', 'BEP-721'], evmCompatible: true, faucetURL: 'https://testnet.binance.org/faucet-smart' },

  // Avalanche
  { name: 'Fuji', mainnet: 'Avalanche', tokenStandards: ['ERC-20', 'ERC-721'], evmCompatible: true, faucetURL: 'https://faucet.avax.network/' },

  // Fantom
  { name: 'Fantom Testnet', mainnet: 'Fantom', tokenStandards: ['ERC-20', 'ERC-721'], evmCompatible: true, faucetURL: 'https://faucet.fantom.network/' },

  // Arbitrum
  { name: 'Arbitrum Goerli', mainnet: 'Arbitrum', tokenStandards: ['ERC-20', 'ERC-721'], evmCompatible: true, faucetURL: 'https://faucet.arbitrum.io/' },

  // Optimism
  { name: 'Optimism Goerli', mainnet: 'Optimism', tokenStandards: ['ERC-20', 'ERC-721'], evmCompatible: true, faucetURL: 'https://faucet.optimism.io/' },

  // Harmony
  { name: 'Harmony Testnet', mainnet: 'Harmony', tokenStandards: ['ERC-20', 'ERC-721'], evmCompatible: true, faucetURL: 'https://faucet.pops.one/' },

  // Klaytn
  { name: 'Baobab', mainnet: 'Klaytn', tokenStandards: ['KIP-7', 'KIP-17'], evmCompatible: true, faucetURL: 'https://baobab.klaytn.net:8651/faucet' },

  // Cronos
  { name: 'Cronos Testnet', mainnet: 'Cronos', tokenStandards: ['ERC-20', 'ERC-721'], evmCompatible: true, faucetURL: 'https://crypto.org/faucet' },

  // Solana
  { name: 'Solana Devnet', mainnet: 'Solana', tokenStandards: ['SPL'], evmCompatible: false, faucetURL: 'https://solfaucet.com' },

  // Aptos
  { name: 'Aptos Testnet', mainnet: 'Aptos', tokenStandards: ['Coin', 'Token'], evmCompatible: false, faucetURL: 'https://aptoslabs.com/testnet-faucet' },

  // Sui
  { name: 'Sui Testnet', mainnet: 'Sui', tokenStandards: ['SUI Token'], evmCompatible: false, faucetURL: 'https://faucet.testnet.sui.io' },

  // Near
  { name: 'Near Testnet', mainnet: 'Near', tokenStandards: ['NEP-141'], evmCompatible: false, faucetURL: 'https://wallet.testnet.near.org/' },

  // Tezos
  { name: 'Tezos Carthage', mainnet: 'Tezos', tokenStandards: ['FA1.2', 'FA2'], evmCompatible: false, faucetURL: 'https://faucet.tzalpha.net/' },

  // Algorand
  { name: 'Algorand TestNet', mainnet: 'Algorand', tokenStandards: ['ASA'], evmCompatible: false, faucetURL: 'https://bank.testnet.algorand.network/' },

  // Elrond
  { name: 'Elrond Testnet', mainnet: 'Elrond', tokenStandards: ['ESDT'], evmCompatible: false, faucetURL: 'https://devnet-wallet.elrond.com/faucet' },

  // Cardano
  { name: 'Cardano Testnet', mainnet: 'Cardano', tokenStandards: ['Native Token'], evmCompatible: false, faucetURL: 'https://testnets.cardano.org/en/testnets/cardano/tools/faucet/' },

  // EOS
  { name: 'EOS Jungle Testnet', mainnet: 'EOS', tokenStandards: ['EOS Token'], evmCompatible: false, faucetURL: 'https://faucet.eosnetwork.com/' },

  // VeChain
  { name: 'VeChain Testnet', mainnet: 'VeChain', tokenStandards: ['VIP-180'], evmCompatible: false, faucetURL: 'https://faucet.veforge.com/' },
];

export default testnets;
