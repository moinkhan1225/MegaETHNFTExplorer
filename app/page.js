'use client'
import React from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Wallet, Network, Eye, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import CollectionList from "./components/CollectionList"


export default function LandingPage() {
  // Mock NFT data for preview
    const [previewOnly, setPreviewOnly] = React.useState(true);

    
  const handleLoadMore = () => {
    setPreviewOnly(false);
  };
    
  const handleLess = () => {
    setPreviewOnly(true);
  };


  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "Common":
        return "bg-gray-500"
      case "Rare":
        return "bg-blue-500"
      case "Epic":
        return "bg-purple-500"
      case "Legendary":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      {/* <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
              <span className="text-xl font-bold">NFT Explorer</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Collections
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
              <Button variant="outline" size="sm">
                Connect Wallet
              </Button>
            </nav>
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Explore the World of{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">NFTs</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
           Explore any wallet's MegaETH NFT holdings without connecting, and quickly gain insights into NFT collections.
          </p>

          {/* Main Action Links */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/wallet-checker">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 text-lg hover:cursor-pointer"
              >
                <Wallet className="mr-2 h-5 w-5" />
                Wallet Checker
              </Button>
            </Link>
            <Link href="/IndexerForm">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg bg-transparent hover:cursor-pointer"
              >
                <Network className="mr-2 h-5 w-5" />
               Be a Testnet User
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* NFT Explore Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Header with All NFTs Link */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore NFTs</h2>
              <p className="text-gray-600">Discover trending and featured NFT collections</p>
            </div>
            <Link href="/all-nft">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent hover:cursor-pointer">
                <Eye className="h-4 w-4" />
                View All NFTs
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* NFT Grid */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {console.log(CollectionList)}
            {CollectionList.map((nft) => (
              <Card
                key={nft.id}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={nft.image || "/placeholder.svg"}
                      alt={nft.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className={`absolute top-3 right-3 ${getRarityColor(nft.rarity)} text-white`}>
                      {nft.rarity}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 truncate">{nft.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{nft.collection}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-purple-600">{nft.price}</span>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div> */}
           <div>
      <CollectionList previewOnly={previewOnly} />
      {previewOnly && (
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="px-8 bg-transparent hover:cursor-pointer"
            onClick={handleLoadMore}
          >
            Load More NFTs
          </Button>
        </div>
      )}
      {!previewOnly && (
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="px-8 bg-transparent hover:cursor-pointer"
            onClick={handleLess}
          >
            Show Less NFTs
          </Button>
        </div>
      )}
      
    </div>
        </div>
      </section>

      {/* Stats Section which i will implement later*/}
      {/* <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-purple-100">NFTs Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2.5K+</div>
              <div className="text-purple-100">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-purple-100">Collections</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
                <span className="text-xl font-bold">NFT Explorer</span>
              </div>
              <p className="text-gray-400">Your gateway to the world of NFTs and digital collectibles.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Tools</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/wallet-checker" className="hover:text-white transition-colors">
                    Wallet Checker
                  </Link>
                </li>
                <li>
                  <Link href="/network-info" className="hover:text-white transition-colors">
                    Network Info
                  </Link>
                </li>
                <li>
                  <Link href="/all-nfts" className="hover:text-white transition-colors">
                    All NFTs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Explore</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Collections
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Trending
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    New Drops
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} NFT Explorer. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  )
}
