// pages/api/holdings.js

import connectToDatabase from '@/lib/mongodb';
import NFTHolding from '@/models/NFTHolding';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const { contractAddress, walletAddress } = req.query;

    if (!contractAddress || !walletAddress) {
      return res.status(400).json({ message: 'Both contract and wallet address required' });
    }

    const holding = await NFTHolding.findOne({ contractAddress, walletAddress });

    if (!holding) return res.status(404).json({ message: 'No holdings found' });

    return res.status(200).json(holding);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
