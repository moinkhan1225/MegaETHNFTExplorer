// utils/fetchContractMetadata.js
import { ethers } from 'ethers';
import fetch from 'node-fetch';

const RPC_URL = 'https://carrot.megaeth.com/rpc'; // Replace if different

const ERC721_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function tokenURI(uint256) view returns (string)',
];

export async function fetchContractMetadata(contractAddress) {
  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(contractAddress, ERC721_ABI, provider);

    // Fetch name, symbol, and totalSupply in one go
    const [name, symbol, totalSupplyBN] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.totalSupply().catch(() => null), // Some contracts may not have it
    ]);

    const totalSupply = totalSupplyBN ? totalSupplyBN.toString() : null;

    let image = null;
    try {
      // Try fetching tokenURI for token 0
      const tokenUri = await contract.tokenURI(0);

      // Handle IPFS links like ipfs://
      let url = tokenUri;
      if (tokenUri.startsWith('ipfs://')) {
        url = tokenUri.replace('ipfs://', 'https://ipfs.io/ipfs/');
      }

      const metadataRes = await fetch(url);
      const metadata = await metadataRes.json();
      if (metadata.image) {
        image = metadata.image.startsWith('ipfs://')
          ? metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
          : metadata.image;
      }
    } catch (err) {
      console.warn('Failed to fetch tokenURI or image:', err.message);
    }

    return {
      name,
      symbol,
      contractAddress,
      totalSupply, // ✅ now included
      image,
    };
  } catch (error) {
    console.error('Error in fetchContractMetadata:', error);
    return null;
  }
}
