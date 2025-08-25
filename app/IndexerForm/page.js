'use client';
import { useState, useRef } from 'react';

export default function IndexerForm() {
  const [contractAddress, setContractAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [statusType, setStatusType] = useState('info'); // info | success | warning | error
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setStatusType('info');
    setProgress(0);

    if (!contractAddress) {
      setStatusType('error');
      setMessage('❌ Please enter a MegaETH contract address.');
      return;
    }

    setLoading(true);

    // Frontend simulated progress
    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev; // cap at 95% until backend finishes
        return prev + Math.random() * 5;
      });
    }, 300);

    try {
      // Step 1: Check if contract is already indexed
      const checkRes = await fetch('/api/check-contract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractAddress }),
      });
      const checkData = await checkRes.json();

      if (checkRes.ok && checkData.exists) {
        setStatusType('warning');
        setMessage('⚠️ This NFT contract is already on our explorer. Please try a different one.');
        setLoading(false);
        clearInterval(progressRef.current);
        setProgress(0);
        return;
      }

      // Step 2: Start indexing NFTs (backend handles storing in MongoDB)
      const startRes = await fetch('/api/indexTokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractAddress }),
      });

      const startData = await startRes.json();
      if (!startRes.ok) throw new Error(startData.error || 'Failed to index NFTs');

      // Complete progress
      clearInterval(progressRef.current);
      setProgress(100);

      // Step 3: Show success
      setStatusType('success');
      setMessage(`✅ Successfully indexed NFTs! Total: ${startData.totalNFTs || 'unknown'}`);
    } catch (err) {
      clearInterval(progressRef.current);
      setProgress(0);
      setStatusType('error');
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">MegaETH NFT Indexer</h2>
        <p className="mb-6 text-gray-600">
          Paste a <span className="font-semibold">MegaETH NFT contract address</span> below and we’ll
          fetch all its NFTs into our explorer. If it’s already indexed, we’ll let you know instantly.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter MegaETH contract address (0x...)"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value.trim())}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition disabled:opacity-50 flex flex-col items-center gap-2"
          >
            {loading ? 'Uploading...' : 'Index Now'}
            {loading && (
              <>
                {/* Gradient progress bar */}
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full transition-all duration-300 rounded-full"
                    style={{
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, #7F00FF, #E100FF, #FF0080)',
                    }}
                  ></div>
                </div>
                <span className="text-sm text-white mt-1">Sit back and relax, indexing is in progress. Once its completed we'll notify you.</span>
              </>
            )}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 px-4 py-2 rounded-lg text-center ${
              statusType === 'success'
                ? 'bg-green-100 text-green-800'
                : statusType === 'warning'
                ? 'bg-yellow-100 text-yellow-800'
                : statusType === 'error'
                ? 'bg-red-100 text-red-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {message}
          </p>
        )}

        <div className="mt-6 bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
          💡 <span className="font-semibold">Tip:</span> You can find contract addresses in the
          MegaETH block explorer or from NFT project pages.
        </div>
      </div>
    </div>
  );
}
