// app/api/fetch-single/route.js
import connectDB from '@/app/lib/mongodb';
import NFT from '@/app/models/contractMetadata';
import { fetchContractMetadata } from '@/app/utils/fetchContractMetadata';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const contractAddress = searchParams.get('contractAddress');

  if (!contractAddress) {
    return NextResponse.json({ message: 'No contractAddress provided.' }, { status: 400 });
  }

  if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress)) {
    return NextResponse.json({ message: 'Invalid contract address.' }, { status: 400 });
  }

  try {
    await connectDB();

    const data = await fetchContractMetadata(contractAddress);

    if (data) {
     const updated = await NFT.findOneAndUpdate(
  { contractAddress },
  {
    name: data.name,
    symbol: data.symbol,
    image: data.image,            // ✅ Add this
    totalSupply: data.totalSupply, // ✅ Optional: if available
    contractAddress,
    lastUpdated: new Date(),
  },
  { upsert: true, new: true }
);
      return NextResponse.json({
        message: 'Contract metadata updated successfully.',
        contract: updated,
      });
    } else {
      return NextResponse.json({ message: 'Metadata not found.' }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
