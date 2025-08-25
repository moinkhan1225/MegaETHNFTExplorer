'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Bell, X, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const userName = "Moin";

  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);
  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  return (
    <header className="border-b bg-gray-900 text-white/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Left side: Logo + Title */}
        <div className="flex items-center space-x-2">
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
            <span className="block text-sm text-gray-400">NFT Explorer</span>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-6 relative">
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/nft-explorer" className="text-gray-300 hover:text-white transition-colors">
              Collections
            </Link>
            {router.pathname === '/' && (
              <Link href="/wallet-checker" className="text-gray-300 hover:text-white transition-colors">
                Wallet Checker
              </Link>
            )}
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
          </nav>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="p-2 rounded-full hover:bg-gray-800 transition"
            >
              <Bell size={20} className="text-white" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                1
              </span>
            </button>

            {/* Notifications Dropdown */}
           {open && (
  <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
    <div className="flex justify-between items-center px-4 py-2 border-b border-gray-700">
      <span className="font-semibold text-white">Notifications</span>
      <button onClick={() => setOpen(false)}>
        <X size={16} className="text-gray-300" />
      </button>
    </div>
    <ul className="divide-y divide-gray-700 max-h-64 overflow-y-auto">
      <li className="px-4 py-2 text-gray-300 hover:bg-gray-700 cursor-pointer">
        <Link
          href="/all-nft"
          className="block w-full"
          onClick={() => setOpen(false)} // <-- close dropdown on click
        >
          New NFT drop available!
        </Link>
      </li>
    </ul>
  </div>
)}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded hover:bg-gray-800"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <nav className="flex flex-col space-y-2 p-4">
            <Link href="/nft-explorer" className="text-gray-300 hover:text-white transition-colors">
              Collections
            </Link>
            {router.pathname === '/' && (
              <Link href="/wallet-checker" className="text-gray-300 hover:text-white transition-colors">
                Wallet Checker
              </Link>
            )}
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            {/* Mobile Notification */}
            
          </nav>
        </div>
      )}
    </header>
  );
}
