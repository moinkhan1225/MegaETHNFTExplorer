// pages/api/refresh-nft/[contractAddress].js
import dbConnect from "@/app/lib/mongodb"; // your MongoDB connection helper
import NFT from "@/app/models/NFT"; // your NFT mongoose model
import { ethers } from "ethers";

// Replace with your MegaETH RPC URL
const RPC_URL = "https://carrot.megaeth.com/rpc"; 

export default async function handler(req, res) {
  const { contractAddress } = req.query;

  if (!contractAddress) {
    return res.status(400).json({ success: false, message: "Contract address is required." });
  }

  try {
    await dbConnect();

    // Fetch all NFTs from contract using ethers
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const abi = [
      "function totalSupply() view returns (uint256)",
      "function ownerOf(uint256 tokenId) view returns (address)"
    ];
    const contract = new ethers.Contract(contractAddress, abi, provider);

    const totalSupply = await contract.totalSupply();
    const existingNFTs = await NFT.find({ contractAddress }).lean();

    const updatedNFTs = [];

    for (let i = 0; i < totalSupply; i++) {
      const tokenId = i.toString();
      let owner;
      try {
        owner = await contract.ownerOf(tokenId);
      } catch (err) {
        owner = null; // Token might be burned or invalid
      }

      const existingNFT = existingNFTs.find(nft => nft.tokenId === tokenId);

      if (!existingNFT) {
        updatedNFTs.push({ contractAddress, tokenId, owner });
      } else if (existingNFT.owner !== owner) {
        await NFT.updateOne(
          { contractAddress, tokenId },
          { $set: { owner } }
        );
      }
    }

    if (updatedNFTs.length > 0) {
      await NFT.insertMany(updatedNFTs);
    }

    return res.status(200).json({
      success: true,
      message: updatedNFTs.length === 0 ? "No changes detected." : "NFT data updated successfully.",
      updatedCount: updatedNFTs.length
    });

  } catch (error) {
    console.error("Error refreshing NFT data:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
}
