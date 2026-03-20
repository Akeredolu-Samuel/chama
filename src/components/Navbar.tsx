import React from 'react';
import { useWallet } from '../context/WalletContext';
import { Wallet as WalletIcon, LogOut, ChevronDown } from 'lucide-react';
import { cn, formatAddress } from '../lib/utils';

export const Navbar: React.FC = () => {
  const { address, isConnecting, connect, disconnect, balance } = useWallet();
  const [showDropdown, setShowDropdown] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#000a12]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl injective-gradient injective-glow">
            <span className="text-xl font-bold text-white">C</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">Chama</span>
        </div>

        <div className="flex items-center gap-4">
          {address ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-2 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-slate-400">Balance</p>
                  <p className="text-sm font-medium text-injective">{balance} INJ</p>
                </div>
                <div className="h-8 w-px bg-white/10 hidden sm:block" />
                <span className="text-sm font-medium">{formatAddress(address)}</span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", showDropdown && "rotate-180")} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl glass-card p-1 shadow-2xl">
                  <button
                    onClick={() => {
                      disconnect();
                      setShowDropdown(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-white/5 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => connect('keplr')}
              disabled={isConnecting}
              className="flex items-center gap-2 rounded-xl injective-gradient px-6 py-2.5 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] disabled:opacity-50"
            >
              <WalletIcon className="h-4 w-4" />
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
