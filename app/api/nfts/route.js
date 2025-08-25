// app/api/nfts/route.js
import connectDB from '@/app/lib/mongodb';
import NFT from '@/app/models/NFT';

export async function GET(request) {
  try {
    await connectDB();
    const nfts = await NFT.find({});
    console.log('Fetched NFTs:', nfts);
    return new Response(JSON.stringify({ nfts }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}