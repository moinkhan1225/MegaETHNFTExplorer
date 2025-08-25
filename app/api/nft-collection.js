// pages/api/nft-collection.js

import connectToDatabase from '../lib/mongodb';
import NFTCollection from '../models/NFT';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { contractAddress, name, symbol } = req.body;

    if (!contractAddress) return res.status(400).json({ message: 'Contract address is required' });

    const updated = await NFTCollection.findOneAndUpdate(
      { contractAddress },
      { name, symbol, metadataFetched: true },
      { upsert: true, new: true }
    );

    return res.status(200).json(updated);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
