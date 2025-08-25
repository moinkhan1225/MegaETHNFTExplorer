'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CollectionList() {
  const [collections, setCollections] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch('/api/collections'); // <-- your API endpoint
        const data = await res.json();

        if (!data.collections || data.collections.length === 0) {
          setNotFound(true);
        } else {
          setCollections(data.collections);
        }
      } catch (err) {
        console.error('Error fetching collections:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);
if (loading) {
    // Skeleton loader with 4 placeholders matching the grid structure
    return (
      <div className="p-6 max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 animate-pulse bg-gray-300 rounded w-48 h-8"></h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border rounded-lg overflow-hidden shadow bg-white animate-pulse"
            >
              <div className="w-full h-48 bg-gray-300"></div>
              <div className="p-3">
                <div className="h-5 bg-gray-300 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (notFound) {
    return <div className="p-6 text-center text-red-600">❌ No collections found.</div>;
  }
  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📦 NFT Collections</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {collections.map((collection) => {
          const imageUrl = collection.image?.startsWith('ipfs://')
            ? collection.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
            : collection.image;

          return (
            <Link
              href={`/collection/${collection.contractAddress}`}
              key={collection.contractAddress}
              className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white"
            >
                
              <img
                src={imageUrl || '/fallback.jpg'}
                alt={collection.name || 'Collection Image'}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/fallback.jpg';
                }}
              />
              <div className="p-3">
                <h2 className="text-md font-semibold truncate">{collection.name || 'Unnamed Collection'}</h2>
                <p className="text-sm text-gray-600">NFTs: {collection.count ?? 'N/A'}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
