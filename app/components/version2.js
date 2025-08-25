"use client";
import React from 'react';
import Image from 'next/image';

export default function Version2() {
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [contractAddress, setContractAddress] = React.useState('');
  const [contractData, setContractData] = React.useState(null);

  // const handleFetchAll = async () => {
  //   setLoading(true);
  //   setMessage('');
  //   try {
  //     const res = await fetch('/api/fetch-contracts');
  //     const data = await res.json();
  //     setMessage(data.message);
  //   } catch (error) {
  //     console.error(error);
  //     setMessage('Error fetching contracts.');
  //   }
  //   setLoading(false);
  // };

  const handleFetchSingle = async () => {
    if (!contractAddress) return;
    setLoading(true);
    setMessage('');
    setContractData(null);

    try {
      const res = await fetch(`/api/fetch-single?contractAddress=${contractAddress}`);
      const data = await res.json();
      if (res.ok) {
        setContractData(data.contract);
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage('Error fetching single contract.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900 p-6 space-y-6">
      <h1 className="text-3xl font-bold">Enter Contract Address</h1>

      {/* <div className="space-y-2 w-full max-w-md">
        <button
          onClick={handleFetchAll}
          disabled={loading}
          className={`w-full px-6 py-3 rounded-lg text-white ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Fetching...' : 'Fetch All Contracts'}
        </button>
      </div> */}

      <div className="w-full max-w-md space-y-2">
        <input
          type="text"
          placeholder="Enter contract address (0x...)"
          className="w-full p-3 rounded border border-gray-300"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        />
        <button
          onClick={handleFetchSingle}
          disabled={loading}
          className={`w-full px-6 py-3 rounded-lg text-white ${
            loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Fetching...' : 'Fetch Single Contract'}
        </button>
      </div>

      {message && <p className="mt-4 text-lg">{message}</p>}
          {console.log(contractData)}
      {contractData && (
        <div className="bg-white shadow rounded p-4 mt-4 max-w-md w-full space-y-2">
          <h2 className="text-xl font-semibold">Metadata</h2>
          <p><strong>Name:</strong> {contractData.name}</p>
          <p><strong>Symbol:</strong> {contractData.symbol}</p>
          <p><strong>Total Supply:</strong> {contractData.totalSupply}</p>
          {contractData.image && (
            <Image src={contractData.image} alt={contractData.name} height={128} width={128} className="w-32 h-32 object-contain" />
          )}
        </div>
      )}
    </div>
  );
}