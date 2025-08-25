import { FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
export default function Footer() {
  return (
     <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8">
                <Image
                  src="/logo1.png"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
                <Link href="/" className="transition-colors">
  <span className="block text-l font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
    MegaETH
  </span>
  <span className="block text-sm text-gray-400">
    NFT Explorer
  </span>
</Link>
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
                  <Link href="/all-nft" className="hover:text-white transition-colors">
                    Collections
                  </Link>
                </li>
                <li>
                  <Link href="/all-nft" className="hover:text-white transition-colors">
                    Trending
                  </Link>
                </li>
                <li>  
                  <Link href="/all-nft" className="hover:text-white transition-colors">
                    New Drops
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help-center" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/Terms&Conditions" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
<p className="flex flex-col sm:flex-row items-center justify-center gap-1 text-gray-400 text-sm sm:text-base text-center">
  &copy; {new Date().getFullYear()} MegaETH NFT Explorer. Built with ❤️ by{' '}
  <a
    href="https://twitter.com/khan__moin"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 hover:underline inline-flex items-center gap-1"
  >
    <FaTwitter />
    Moin Khan
  </a>
</p>



          </div>
        </div>
      </footer>
  );
}