'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/app/components/ui/card'; // adjust path as needed
// import { Badge } from './ui/badge'; // adjust path as needed
import Button from '@/app/components/ui/button'; // adjust path as needed

// Helper function for rarity badge colors
function getRarityColor(rarity) {
  switch (rarity) {
    case 'Common':
      return 'bg-gray-500';
    case 'Rare':
      return 'bg-blue-500';
    case 'Epic':
      return 'bg-purple-500';
    case 'Legendary':
      return 'bg-orange-500';
    default:
      return 'bg-gray-500';
  }
}

export default function CollectionList({ previewOnly }) {
  const [collections, setCollections] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  


  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch('/api/collections');
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

  const displayedCollections = previewOnly ? collections.slice(0, 4) : collections.slice(0, 8);

if (loading) {
  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card
            key={i}
            className="border-0 shadow-md animate-pulse cursor-default"
          >
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-64 bg-gray-300"></div>
              </div>
              <div className="p-4">
                <div className="h-5 bg-gray-300 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="mt-4 h-8 w-24 bg-gray-300 rounded"></div>
              </div>
            </CardContent>
          </Card>
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
      {/* <h1 className="text-2xl font-bold mb-4">📦 NFT Collections</h1> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedCollections.map((collection) => {
          const imageUrl = collection.image?.startsWith('ipfs://')
            ? collection.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
            : collection.image;

          return (
            <Card
              key={collection.contractAddress}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={imageUrl || '/fallback.jpg'}
                    alt={collection.name || 'Collection Image'}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/fallback.jpg';
                    }}
                  />
                  {/* You can add a rarity badge or any badge here if your collections have such info */}
                  {/* <Badge className={`absolute top-3 right-3 ${getRarityColor(collection.rarity)} text-white`}>
                    {collection.rarity}
                  </Badge> */}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 truncate">{collection.name || 'Unnamed Collection'}</h3>
                  <p className="text-sm text-gray-500 mb-3">NFTs: {collection.count ?? 'N/A'}</p>
                  <div className="flex items-center justify-between">
                    <Link href={`/collection/${collection.contractAddress}`}>
                      <Button size="sm" variant="outline" className='hover:cursor-pointer'>
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
    </div>
  );
}
