"use client";

import React from 'react';
import classNames from 'classnames';
import mainnets from '../utils/networks/mainnets';
import testnets from '../utils/networks/testnets';
import Image from 'next/image';
  
export default function Version1() {
    const [selectedOption, setSelectedOption] = React.useState('');
  const [isTestnet, setIsTestnet] = React.useState(false);
  const [contractAddress, setContractAddress] = React.useState('');
  const [walletAddress, setWalletAddress] = React.useState('');

  const [nftData, setNftData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const networks = isTestnet ? testnets : mainnets;
  const selected = networks.find((n) => n.name === selectedOption);

async function fetchNFTs() {
  setLoading(true);
  setError(null);

  try {
    const response = await fetch('/api/fetch-nfts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contractAddress, walletAddress }),
    });

    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();
    console.log('NFT data:', data);

    // Assuming response has data.nfts as an array
    setNftData(data.balance || []);
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    setError(error.message);
  } finally {
    setLoading(false);
  }
}
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">NFT Explorer For Everyone <br/>Works only MegaETH Testnet NFTS's only</h1>

        {/* Toggle */}
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={() => {
              setIsTestnet(false);
              setSelectedOption('');
            }}
            className={classNames(
              'px-4 py-2 rounded-lg border',
              !isTestnet ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'
            )}
          >
            Mainnet
          </button>
          <button
            onClick={() => {
              setIsTestnet(true);
              setSelectedOption('');
            }}
            className={classNames(
              'px-4 py-2 rounded-lg border',
              isTestnet ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'
            )}
          >
            Testnet
          </button>
        </div>

        {/* Dropdown */}
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-6"
        >
          <option value="">-- Select a network --</option>
          {networks.map((net) => (
            <option key={net.name} value={net.name}>
              {net.name}
            </option>
          ))}
        </select>
        

        {/* Display selection */}
        {selected && (
          <div className="bg-gray-100 p-4 rounded-xl space-y-2 border border-gray-200 text-black">
            <h2 className="text-lg font-bold text-gray-800">{selected.name}</h2>
            {isTestnet && (
              <p>
                <span className="font-medium">Mainnet:</span> {selected.mainnet}
              </p>
            )}
            <p>
              <span className="font-medium">Token Standards:</span> {selected.tokenStandards.join(', ')}
            </p>
            <p>
              <span className="font-medium">EVM Compatible:</span> {selected.evmCompatible ? '✅ Yes' : '❌ No'}
            </p>
            {selected.faucetURL && (
              <p>
                <span className="font-medium">Faucet:</span>{' '}
                <a href={selected.faucetURL} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                  {selected.faucetURL}
                </a>
              </p>
            )}
          </div>
        )}
           {/* Contract Address Input */}
        {selected && <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contract Address</label>
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-black mb-4"
            placeholder="0x..."
          />
        </div>}

        {/* Wallet Address Input */}
        {selected && <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Address</label>
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-black mb-4"
            placeholder="0x..."
          />
        </div>}
        {selected && (
  <button
    onClick={fetchNFTs}
    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
  >
    Fetch NFTs
  </button>

)} 
{loading && <p className="mt-4 text-gray-600">Fetching NFT Balance...</p>}
{error && <p className="mt-4 text-red-600">Error: {error}</p>}

{typeof nftData !== 'undefined' && nftData !== null && (
  <div className="mt-6 space-y-4">
    {!loading && <h2 className="text-xl font-semibold text-gray-800"> NFT BALANCE: {nftData}</h2>}
    {/* <Image src={nftData.image || '/no-image.png'} alt={nftData.name || 'NFT Image'} width={120} height={120} className="w-full h-64 object-cover rounded-lg" /> */}
  </div>
)}

      
      </div>
    </div>
  );
}