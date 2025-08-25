import mongoose from 'mongoose';

const nftSchema = new mongoose.Schema({
  tokenId: { type: Number, required: true },
  name: String,
  description: String,
  contractAddress: { type: String, required: true },
  image: { type: String, default: null },
  owner: { type: String, default: null },
  traits: { type: Array, default: [] }, // array of trait objects
}, { timestamps: true });

export default mongoose.models.NFT || mongoose.model('NFT', nftSchema);