import React, { createContext, useContext, useState, useCallback } from 'react';
import { getBalance } from '../services/injective';

// Supported wallets (browser extension names)
export type SupportedWallet = 'keplr' | 'leap' | 'metamask';

interface WalletContextType {
  address: string;
  isConnecting: boolean;
  isConnected: boolean;
  connect: (wallet?: SupportedWallet) => Promise<void>;
  disconnect: () => void;
  balance: string;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | null>(null);

const INJ_CHAIN_ID = 'injective-888'; // testnet

async function connectKeplr(): Promise<string> {
  const keplr = (window as any).keplr;
  if (!keplr) throw new Error('Keplr extension not found. Please install it.');
  await keplr.enable(INJ_CHAIN_ID);
  const offlineSigner = keplr.getOfflineSigner(INJ_CHAIN_ID);
  const accounts = await offlineSigner.getAccounts();
  return accounts[0]?.address ?? '';
}

async function connectLeap(): Promise<string> {
  const leap = (window as any).leap;
  if (!leap) throw new Error('Leap extension not found. Please install it.');
  await leap.enable(INJ_CHAIN_ID);
  const offlineSigner = leap.getOfflineSigner(INJ_CHAIN_ID);
  const accounts = await offlineSigner.getAccounts();
  return accounts[0]?.address ?? '';
}

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState('0.00');

  const fetchBalance = useCallback(async (addr: string) => {
    const bal = await getBalance(addr);
    setBalance(bal);
  }, []);

  const connect = async (wallet: SupportedWallet = 'keplr') => {
    setIsConnecting(true);
    try {
      let addr = '';
      if (wallet === 'leap') {
        addr = await connectLeap();
      } else {
        addr = await connectKeplr();
      }
      if (addr) {
        setAddress(addr);
        await fetchBalance(addr);
      }
    } catch (e: any) {
      console.error('Connection error:', e);
      alert(e?.message ?? 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAddress('');
    setBalance('0.00');
  };

  const refreshBalance = async () => {
    if (address) await fetchBalance(address);
  };

  return (
    <WalletContext.Provider value={{
      address,
      isConnecting,
      isConnected: !!address,
      connect,
      disconnect,
      balance,
      refreshBalance,
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within WalletProvider');
  return context;
};
