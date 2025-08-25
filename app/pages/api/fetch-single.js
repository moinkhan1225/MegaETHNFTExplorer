// pages/api/fetch-single.js
import connectDB from '@/app/lib/mongodb';
import ContractMetadata from '@/app/models/contractMetadata';
import { fetchContractMetadata } from '@/app/utils/fetchContractMetadata';

export default async function handler(req, res) {
  const { contractAddress } = req.query;

  if (!contractAddress) {
    return res.status(400).json({ message: 'No contractAddress provided.' });
  }

  if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress)) {
    return res.status(400).json({ message: 'Invalid contract address.' });
  }

  try {
    await connectDB();

    // Make sure this function returns totalSupply
    const data = await fetchContractMetadata(contractAddress);

    if (data) {
      const updated = await ContractMetadata.findOneAndUpdate(
        { contractAddress },
        {
          ...data,
          contractAddress,
          totalSupply: data.totalSupply ?? null, // safely add totalSupply
          lastUpdated: new Date(),
        },
        { upsert: true, new: true }
      );

      return res.status(200).json({
        message: 'Contract metadata updated successfully.',
        contract: updated,
      });
    } else {
      return res.status(404).json({ message: 'Metadata not found.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}
