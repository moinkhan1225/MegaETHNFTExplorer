import { ethers } from 'ethers';
import fetch from 'node-fetch';
import connectToDatabase from '@/app/lib/mongodb';
import NFT from '@/app/models/NFT';

const RPC_URL = 'https://carrot.megaeth.com/rpc';
const provider = new ethers.JsonRpcProvider(RPC_URL);

const ERC721_ABI = [
  'function totalSupply() view returns (uint256)',
  'function tokenURI(uint256) view returns (string)',
  'function ownerOf(uint256 tokenId) view returns (address)',
];

export async function POST(req) {
  try {
    const { contractAddress } = await req.json();

    if (!contractAddress || !ethers.isAddress(contractAddress)) {
      return new Response(
        JSON.stringify({ error: 'Invalid contract address' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const contract = new ethers.Contract(contractAddress, ERC721_ABI, provider);

    let totalSupply;
    try {
      totalSupply = await contract.totalSupply();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Contract not found or not ERC-721' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await connectToDatabase();

    for (let tokenId = 0; tokenId < totalSupply; tokenId++) {
      try {
        const [tokenURI, owner] = await Promise.all([
          contract.tokenURI(tokenId),
          contract.ownerOf(tokenId),
        ]);

        const metadataURL = tokenURI.startsWith('ipfs://')
          ? `https://ipfs.io/ipfs/${tokenURI.slice(7)}`
          : tokenURI;

        const response = await fetch(metadataURL);
        const metadata = await response.json();

        const nftData = {
          tokenId,
          contractAddress,
          name: metadata?.name || null,
          description: metadata?.description || '',
          image: metadata?.image || null,
          owner,
          traits: metadata?.attributes || [],
        };

        await NFT.findOneAndUpdate(
          { tokenId, contractAddress },
          nftData,
          { upsert: true, new: true }
        );
      } catch (err) {
        console.warn(`Token ${tokenId} failed: ${err.message}`);
      }
    }

    return new Response(
      JSON.stringify({ message: 'Indexing completed successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Indexing error:', err.message);
    return new Response(
      JSON.stringify({ error: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
