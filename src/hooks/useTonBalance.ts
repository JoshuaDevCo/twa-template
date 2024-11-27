import { useState, useEffect } from 'react';
import { useTonConnect } from './useTonConnect';
import { useAsyncInitialize } from './useAsyncInitialize';

export function useTonBalance() {
  const { sender, connected } = useTonConnect();
  const [balance, setBalance] = useState<string>();

  useEffect(() => {
    if (!connected) return;

    async function getBalance() {
      const balance = await sender.getBalance();
      setBalance(balance);
    }

    getBalance();
    const intervalId = setInterval(getBalance, 5000); // Update every 5 seconds

    return () => clearInterval(intervalId);
  }, [connected, sender]);

  return {
    balance
  };
} 