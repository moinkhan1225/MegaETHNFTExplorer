// models/walletHoldings.js
import mongoose from 'mongoose';

const walletHoldingsSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true },
  contractAddress: { type: String, required: true },
  tokenIds: [String],
  lastFetched: { type: Date, default: Date.now }
});

export default mongoose.models.WalletHoldings || mongoose.model('WalletHoldings', walletHoldingsSchema);
