'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/app/components/ui/Card'; // adjust path as needed
import { Button } from '@/app/components/ui/button'; // adjust path as needed

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

export default function CollectionList({ previewOnly = false }) {
  const [collections, setCollections] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = previewOnly ? 4 : 8; // 4 if previewOnly else 8 per page

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

  // Filter collections based on search term
  const filteredCollections = useMemo(() => {
    if (!searchTerm) return collections;
    const lowerSearch = searchTerm.toLowerCase();
    return collections.filter(
      (c) =>
        (c.name && c.name.toLowerCase().includes(lowerSearch)) ||
        (c.contractAddress && c.contractAddress.toLowerCase().includes(lowerSearch))
    );
  }, [searchTerm, collections]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCollections.length / itemsPerPage);
  const paginatedCollections = filteredCollections.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when searchTerm changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="p-6 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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
      {/* Search bar */}
      <div className="flex justify-center mb-6 w-full">
        <input
          type="text"
          placeholder="Search by collection name or contract address"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedCollections.length === 0 ? (
          <div className="col-span-full text-center text-gray-600">No collections match your search.</div>
        ) : (
          paginatedCollections.map((collection) => {
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
          })
        )}
      </div>

      {/* Pagination controls */}
      {!previewOnly && filteredCollections.length > itemsPerPage && (
        <div className="flex justify-center space-x-4 mt-8">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="hover:cursor-pointer"
          >
            Previous
          </Button>
          <span className="flex items-center text-gray-700 select-none">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="hover:cursor-pointer"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
