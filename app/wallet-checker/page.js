'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';

export default function NFTBalanceChecker() {
  const [contractAddress, setContractAddress] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const ERC721_ABI = ["function balanceOf(address owner) view returns (uint256)"];

  const checkBalance = async () => {
    try {
      setLoading(true);
      setError('');
      setBalance(null);

      if (!ethers.isAddress(contractAddress) || !ethers.isAddress(walletAddress)) {
        throw new Error('Invalid address format.');
      }

      const provider = new ethers.JsonRpcProvider("https://carrot.megaeth.com/rpc");
      const nftContract = new ethers.Contract(contractAddress, ERC721_ABI, provider);
      const bal = await nftContract.balanceOf(walletAddress);
      setBalance(bal.toString());
    } catch (err) {
      setError(err.message || 'Error checking balance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">NFT Balance Checker</h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="NFT Contract Address"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />

          <input
            type="text"
            placeholder="Wallet Address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />

          <button
            onClick={checkBalance}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-colors flex items-center justify-center ${
              loading
                ? 'bg-purple-300 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {loading ? 'Checking...' : 'Check Balance'}
          </button>

          {error && <p className="text-red-600 text-center mt-2">{error}</p>}
          {balance !== null && !error && (
            <p className="text-green-700 text-center mt-2 text-lg">
              NFT Balance: <span className="font-bold">{balance}</span>
            </p>
          )}
        </div>

        <p className="mt-6 text-gray-500 text-center text-sm">
          ℹ️ Enter the NFT contract and your wallet address to check your NFT holdings on MegaETH Testnet.
        </p>
      </div>
    </div>
  );
}
