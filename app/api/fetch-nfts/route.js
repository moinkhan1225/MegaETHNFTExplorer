import { NextResponse } from 'next/server';
import { ethers } from 'ethers';
import fetch from 'node-fetch';

export async function POST(request) {
  try {
    const { contractAddress, walletAddress } = await request.json();

    const provider = new ethers.JsonRpcProvider("https://carrot.megaeth.com/rpc");

    const contract = new ethers.Contract(
      contractAddress,
      [
        "function balanceOf(address) view returns (uint256)",
        "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
        "function tokenURI(uint256 tokenId) view returns (string)"
      ],
      provider
    );

    const balanceBN = await contract.balanceOf(walletAddress);
    const balance = balanceBN.toString();

    const nfts = [];

  for (let i = 1; i < Number(balance); i++) {
  try {
    console.log(`Fetching token ${i} for wallet ${walletAddress}`);

    const tokenIdBN = await contract.tokenOfOwnerByIndex(walletAddress, i);
    const tokenId = tokenIdBN.toString();
    console.log(`Token ID: ${tokenId}`);

    let tokenUri = await contract.tokenURI(tokenId);
    console.log(`Raw token URI: ${tokenUri}`);

    if (tokenUri.startsWith("ipfs://")) {
      tokenUri = tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/");
    }
    console.log(`HTTP token URI: ${tokenUri}`);

    const metadataRes = await fetch(tokenUri);
    console.log(`Metadata fetch status: ${metadataRes.status}`);
    const metadata = await metadataRes.json();
    console.log(`Metadata for token ${tokenId}:`, metadata);

    let image = metadata.image || null;
    if (image && image.startsWith("ipfs://")) {
      image = image.replace("ipfs://", "https://ipfs.io/ipfs/");
    }

    nfts.push({
      tokenId,
      name: metadata.name || `Token #${tokenId}`,
      image
    });
  } catch (err) {
    console.warn(`Skipping token ${i} due to error:`, err.message);
  }
}

    return NextResponse.json({ balance, nfts });
    

  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: 'Failed to fetch NFT data' }, { status: 500 });
  }
}
