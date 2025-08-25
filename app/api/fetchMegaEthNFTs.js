// pages/api/fetchMegaEthNFTs.js
import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = 'nftExplorer';
const COLLECTION = 'megaethNFTs';
const RARIBLE_API_KEY = process.env.RARIBLE_API_KEY;

export default async function handler(req, res) {
  const { walletAddress } = req.query;
  if (!walletAddress) return res.status(400).json({ error: 'Wallet address is required' });

  try {
    const response = await fetch(
      `https://testnet-api.rarible.org/v0.1/items/byOwner?owner=${walletAddress}&blockchain=MEGAETHTESTNET`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': RARIBLE_API_KEY
        }
      }
    );

    const data = await response.json();
    const items = data.items || [];

    const client = await MongoClient.connect(MONGO_URI);
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION);

    const docs = items.map(nft => ({
      tokenId: nft.tokenId,
      contract: nft.contract,
      meta: nft.meta,
      owner: walletAddress,
      lastUpdated: new Date()
    }));

    await collection.insertMany(docs);
    await client.close();

    res.status(200).json({ success: true, count: docs.length });
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch or store NFTs' });
  }
}
