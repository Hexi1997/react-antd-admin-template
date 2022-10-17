import { useState } from 'react';
import { useBoolean, useMount } from 'react-use';

import { SYSTEM_ROYALTY_ACCOUNT } from '@/utils/common';

interface AccountInfo {
  balance: string;
}

export function useAccountBalance() {
  const [isFetchingAccountBalance, toggleFetchingAccountBalance] =
    useBoolean(false);
  const [royaltyAccountBalance, setRoyaltyAccountBalance] = useState<number>();
  useMount(() => {
    toggleFetchingAccountBalance();
    fetch(
      `https://flow-mainnet.g.alchemy.com/v2/kpe76hmufchsr2i83zvrmcdfvg3reaqt/accounts/${SYSTEM_ROYALTY_ACCOUNT}`
    )
      .then((v) => v.json())
      .then((v: AccountInfo) => {
        setRoyaltyAccountBalance(Number(v.balance) / 100000000);
      })
      .catch(console.error)
      .finally(toggleFetchingAccountBalance);
  });
  return { isFetchingAccountBalance, royaltyAccountBalance };
}
