'use client';

import React from 'react';
import classNames from 'classnames';
import mainnets from '../utils/networks/mainnets';
import testnets from '../utils/networks/testnets';

export default function NetworkInfo() {
  const [selectedOption, setSelectedOption] = React.useState('');
  const [isTestnet, setIsTestnet] = React.useState(false);

  const networks = isTestnet ? testnets : mainnets;
  const selected = networks.find((n) => n.name === selectedOption);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-10">
      <div className="w-full max-w-lg text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8">
          Network Information
        </h1>

        {/* Toggle */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <button
            onClick={() => {
              setIsTestnet(false);
              setSelectedOption('');
            }}
            className={classNames(
              'px-6 py-2 rounded-lg font-medium transition-colors duration-300',
              !isTestnet
                ? 'bg-blue-600 text-white border border-blue-600 shadow-md hover:bg-blue-700'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
            )}
          >
            Mainnet
          </button>
          <button
            onClick={() => {
              setIsTestnet(true);
              setSelectedOption('');
            }}
            className={classNames(
              'px-6 py-2 rounded-lg font-medium transition-colors duration-300',
              isTestnet
                ? 'bg-blue-600 text-white border border-blue-600 shadow-md hover:bg-blue-700'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
            )}
          >
            Testnet
          </button>
        </div>

        {/* Dropdown */}
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-6 shadow-sm transition"
        >
          <option value="">-- Select a network --</option>
          {networks.map((net) => (
            <option key={net.name} value={net.name}>
              {net.name}
            </option>
          ))}
        </select>

        {/* Display selection */}
        {selected && (
          <div className="bg-white w-full p-6 rounded-2xl shadow-lg border border-gray-200 space-y-4 transition transform hover:scale-105">
            <h2 className="text-xl font-bold text-gray-900">{selected.name}</h2>
            {isTestnet && (
              <p>
                <span className="font-semibold">Mainnet:</span> {selected.mainnet}
              </p>
            )}
            <p>
              <span className="font-semibold">Token Standards:</span> {selected.tokenStandards.join(', ')}
            </p>
            <p>
              <span className="font-semibold">EVM Compatible:</span> {selected.evmCompatible ? '✅ Yes' : '❌ No'}
            </p>
            {selected.faucetURL && (
              <p>
                <span className="font-semibold">Faucet:</span>{' '}
                <a
                  href={selected.faucetURL}
                  className="text-blue-600 underline hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selected.faucetURL}
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
