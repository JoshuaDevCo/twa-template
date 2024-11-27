import { useState, useEffect } from 'react';
import { useTonConnect } from './useTonConnect';
import { TonClient } from 'ton';

export function useTonBalance() {
  const { sender, connected } = useTonConnect();
  const [balance, setBalance] = useState<string>();

  useEffect(() => {
    if (!connected) return;

    const client = new TonClient({ endpoint: 'https://toncenter.com/api/v2/jsonRPC' });

    async function getBalance() {
      const address = await sender.getSender();
      if (!address) return;
      const balance = await client.getBalance(address);
      setBalance(balance);
    }

    getBalance();
    const intervalId = setInterval(getBalance, 5000);

    return () => clearInterval(intervalId);
  }, [connected, sender]);

  return {
    balance
  };
} 