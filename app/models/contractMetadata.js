// models/contractMetadata.js

import mongoose from 'mongoose';

const contractMetadataSchema = new mongoose.Schema({
  contractAddress: { type: String, required: true, unique: true },
  name: String,
  symbol: String,
  totalSupply: String,
  image: String,
  lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.models.ContractMetadata ||
  mongoose.model('ContractMetadata', contractMetadataSchema);

