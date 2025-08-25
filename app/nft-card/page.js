'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NFTList() {
  const [nfts, setNfts] = useState([]);
  const [filteredNFTs, setFilteredNFTs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const res = await fetch('/api/nfts');
        const data = await res.json();
        const list = data.nfts || [];
        setNfts(list);
        setFilteredNFTs(list);
      } catch (err) {
        console.error('Error fetching NFTs:', err);
      }
    };

    fetchNFTs();
  }, []);

  useEffect(() => {
    const filtered = nfts.filter((nft) =>
      (nft.owner || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(nft.tokenId).includes(searchTerm)
    );
    setFilteredNFTs(filtered);
    setCurrentPage(1);
  }, [searchTerm, nfts]);

  const indexOfLastNFT = currentPage * itemsPerPage;
  const indexOfFirstNFT = indexOfLastNFT - itemsPerPage;
  const currentNFTs = filteredNFTs.slice(indexOfFirstNFT, indexOfLastNFT);
  const totalPages = Math.ceil(filteredNFTs.length / itemsPerPage);

  const handlePageChange = (direction) => {
    setCurrentPage((prev) =>
      direction === 'next'
        ? Math.min(prev + 1, totalPages)
        : Math.max(prev - 1, 1)
    );
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      {/* 🔙 Back to Home */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">All NFTs</h1>
        <Link href="/">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            ← Back to Home
          </button>
        </Link>
      </div>

      {/* 🔍 Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Owner Address or token ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* 🖼 NFT Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentNFTs.map((nft) => {
          const imageUrl = nft.image?.startsWith('ipfs://')
            ? nft.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
            : nft.image;

          return (
            <div key={nft._id} className="border rounded-lg shadow p-4 bg-white">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={nft.name || 'NFT'}
                  className="w-full h-64 object-cover rounded"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/fallback.jpg';
                  }}
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-sm">
                  No image
                </div>
              )}

              <div className="mt-4 space-y-1 text-sm text-gray-700">
                <p><strong>Name:</strong> {nft.name || 'N/A'}</p>
                <p><strong>Token ID:</strong> {nft.tokenId}</p>
                <p><strong>Contract:</strong> {nft.contractAddress}</p>
                <p><strong>Owner:</strong> {nft.owner || 'N/A'}</p>
                <p><strong>Description:</strong> {nft.description || 'N/A'}</p>

                {nft.traits && nft.traits.length > 0 && (
                  <div className="mt-2">
                    <strong>Traits:</strong>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {nft.traits.map((trait, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 border border-gray-300 text-gray-700 text-xs px-3 py-1 rounded-full"
                        >
                          {trait.trait_type}: <span className="font-medium">{trait.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ⏪ Pagination */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange('prev')}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="self-center text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange('next')}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
