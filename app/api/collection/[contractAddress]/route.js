import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/mongodb';
import NFT from '@/app/models/NFT';

export async function GET(request, context) {
  const { contractAddress } = await context.params;

  if (!contractAddress) {
    return NextResponse.json({ error: 'Contract address required' }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const nfts = await NFT.find({ contractAddress });

    return NextResponse.json({ nfts });
  } catch (error) {
    console.error('❌ API error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
