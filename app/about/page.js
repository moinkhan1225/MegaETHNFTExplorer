'use client'

import React from "react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
          About MegaETH NFT Explorer
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          MegaETH NFT Explorer is your go-to platform for exploring, checking, and understanding NFTs on the MegaETH testnet. We make it easy for collectors and enthusiasts to track NFT holdings, explore collections, and participate in testnet projects.
        </p>

        {/* Mission Section */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">My Mission</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            My mission is to provide a simple, reliable, and insightful experience for NFT users. I aim to help users explore NFT collections, check wallet holdings without connecting their wallets, and participate in testnet ecosystems seamlessly.
          </p>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2">Wallet Checker</h3>
              <p className="text-gray-700">
                Check any wallet's NFT holdings without connecting your wallet.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2">Collection Indexer</h3>
              <p className="text-gray-700">
                Index NFT collections to explore data and insights for each token.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2">Testnet Participation</h3>
              <p className="text-gray-700">
                Become a testnet user and easily participate in new NFT projects.
              </p>
            </div>
          </div>
        </section>

        {/* Who I Am Section */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Who I Am</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Hi! I'm <strong>Moin Khan</strong>, the developer behind MegaETH NFT Explorer. I am a full-stack web developer with a passion for blockchain, Web3, and NFTs. I love building tools that help users explore, manage, and interact with NFTs easily. From developing smart contract interactions to designing intuitive web interfaces, I handle everything end-to-end to make your NFT experience seamless and enjoyable.
          </p>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Get Started Today</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Explore NFT collections, check your wallet, and become part of the MegaETH testnet ecosystem.
          </p>
        </section>
      </div>
    </div>
  )
}
