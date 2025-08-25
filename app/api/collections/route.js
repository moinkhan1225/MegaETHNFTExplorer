// ✅ Correct structure for App Router API route

import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import NFT from '@/app/models/NFT';

export async function GET() {
  try {
    await connectDB();

    const result = await NFT.aggregate([
      {
        $group: {
          _id: '$contractAddress',
          count: { $sum: 1 },
          image: { $first: '$image' },
          name: { $first: '$name' },
        },
      },
      {
        $project: {
          contractAddress: '$_id',
          count: 1,
          image: 1,
          name: 1,
          _id: 0,
        },
      },
    ]);

    return NextResponse.json({ collections: result });
  } catch (error) {
    console.error('❌ Error in /api/collections:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
