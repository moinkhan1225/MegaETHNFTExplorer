'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {Button} from '@/app/components/ui/button'; // adjust path as needed

export default function CollectionPage() {
  const { contractAddress } = useParams();

  const [nfts, setNfts] = useState([]);
  const [filteredNFTs, setFilteredNFTs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 12;

  // 🔄 Fetch NFTs from the API for that contract address
  useEffect(() => {
    if (!contractAddress) return;

    const fetchNFTs = async () => {
      try {
        const res = await fetch(`/api/collection/${contractAddress}`);
        if (!res.ok) throw new Error('Failed to fetch NFTs');
        const data = await res.json();
        setNfts(data.nfts || []);
        setFilteredNFTs(data.nfts || []);
      } catch (err) {
        console.error('Error fetching NFTs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [contractAddress]);

  // 🔍 Filter NFTs based on search
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
  // will be working Later on Refresh button
  
//   const handleRefresh = async () => {
//   try {
//     const response = await fetch(`/api/refresh-nft/${contractAddress}`, {
//       method: 'POST',
//     });

//     const data = await response.json();

//     if (data.success) {
//       // Optionally, show a success message or update the UI
//       alert('Data refreshed successfully!');
//     } else {
//       alert('No changes detected.');
//     }
//   } catch (err) {
//     console.error('Refresh error:', err);
//     alert('Failed to refresh data.');
//   }
// };

 if (loading) {
  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <div className="mb-6">
        <div className="w-full h-10 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border rounded-lg shadow p-4 bg-white animate-pulse">
            <div className="w-full h-64 bg-gray-200 rounded mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
  if (!nfts.length) return <div className="p-4">No NFTs found for this contract.</div>;

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      {/* 🔍 Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Owner Address or token ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      {/*Refresh Button*/}
      {/* <Button onClick={handleRefresh} className="mt-4">
  Refresh
</Button> */}
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
