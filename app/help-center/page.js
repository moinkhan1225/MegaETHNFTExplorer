'use client'

import React from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/app/components/ui/accordion"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
          Help Center
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Welcome to our Help Center! Here you can find answers to common questions, step-by-step guides, and ways to contact us if you need further assistance.
        </p>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="wallet-checker">
                <AccordionTrigger>How do I check my wallet for NFTs?</AccordionTrigger>
                <AccordionContent>
                  Go to the Wallet Checker page, enter your wallet address, and contract address. You'll see all NFTs held by the wallet.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="testnet-user">
                <AccordionTrigger>How can I participate as a testnet user?</AccordionTrigger>
                <AccordionContent>
                  Visit the “Be a Testnet User” page, enter the contract address, and follow the instructions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="nfts-not-visible">
                <AccordionTrigger>What should I do if I don't see my NFTs?</AccordionTrigger>
                <AccordionContent>
                  Ensure you have entered the right wallet address. If it still doesn't appear, refresh the page.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="report-bug">
                <AccordionTrigger>How can I suggest a new feature or report a bug?</AccordionTrigger>
                <AccordionContent>
                  Drop your query/feedback via the Google Forms:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>
                      <Link href="https://docs.google.com/forms/d/e/1FAIpQLSd5eK7OSLg14pupYYJHrQHSLCrzx42kgln95K9A5IfHC7fhIA/viewform?usp=dialog" target="_blank" className="text-purple-600 underline hover:text-purple-800">Report a Bug</Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="networks-supported">
                <AccordionTrigger>Which networks are supported?</AccordionTrigger>
                <AccordionContent>
                  Currently, we support MegaETH Testnet. More networks may be added soon.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Guides Section */}
        {/* <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Guides & Tutorials</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>How to check NFTs in a wallet</li>
            <li>How to use the indexer</li>
            <li>How to refresh NFT data</li>
            <li>How to become a testnet user</li>
          </ul>
        </section> */}

        {/* Contact / Support Section */}
        <section className="mb-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Need More Help?</h2>
          <p className="text-gray-700 mb-6">If you still have questions or issues, feel free to reach out through the forms below.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="https://docs.google.com/forms/d/e/1FAIpQLSd5eK7OSLg14pupYYJHrQHSLCrzx42kgln95K9A5IfHC7fhIA/viewform?usp=dialog" target="_blank">
              <Button variant="outline" className="px-6 py-3 bg-transparent hover:bg-purple-50 text-purple-700">
                Report a Bug
              </Button>
            </Link>
          </div>
        
        </section>
      </div>
    </div>
  )
}
