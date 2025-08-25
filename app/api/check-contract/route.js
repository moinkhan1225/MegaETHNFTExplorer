import connectToDatabase from '@/app/lib/mongodb';
import NFT from '@/app/models/NFT';

export async function POST(req) {
  try {
    const { contractAddress } = await req.json();

    if (!contractAddress) {
      return new Response(JSON.stringify({ error: 'No contract address provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await connectToDatabase();
    const exists = await NFT.exists({ contractAddress: contractAddress.toLowerCase() });

    return new Response(JSON.stringify({ exists: !!exists }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Check contract error:', err.message);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
