import moment from 'moment';
import { useEffect, useState } from 'react';
import { useBoolean, useMount } from 'react-use';

import {
  CLOUDFLARE_WORKERS_BASE_URI,
  SYSTEM_ROYALTY_ACCOUNT,
  waitTime
} from '@/utils/common';

interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
  __typename: string;
}

interface Transaction {
  hash: string;
  time: string;
  __typename: string;
}

interface Token {
  id: string;
  __typename: string;
}

interface Amount {
  token: Token;
  value: string;
  __typename: string;
}

interface Counterparty {
  address: string;
  __typename: string;
}

interface Node {
  type: string;
  amount: Amount;
  counterparty: Counterparty;
  counterpartiesCount: number;
  __typename: string;
}

interface Edge {
  node: Node;
  __typename: string;
}

interface TokenTransfer {
  edges: Edge[];
  __typename: string;
}

interface NftTransfer {
  edges: any[];
  __typename: string;
}

interface Edge {
  transaction: Transaction;
  tokenTransfers: TokenTransfer;
  nftTransfers: NftTransfer;
  __typename: string;
}

interface TransferTransaction {
  pageInfo: PageInfo;
  edges: Edge[];
  __typename: string;
}

interface Account {
  address: string;
  transferCount: number;
  tokenTransferCount: number;
  nftTransferCount: number;
  transferTransactions: TransferTransaction;
  __typename: string;
}

interface Data {
  account: Account;
}

interface TxData {
  data: Data;
}

const query =
  'query AccountTransfersQuery($address: ID!, $first: Int!, $after: ID) {\n  account(id: $address) {\n    address\n    transferCount\n    tokenTransferCount\n    nftTransferCount\n    transferTransactions(first: $first, after: $after) {\n      pageInfo {\n        hasNextPage\n        endCursor\n        __typename\n      }\n      edges {\n        ...AccountTransfersTableFragment\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment AccountTransfersTableFragment on AccountTransferEdge {\n  transaction {\n    hash\n    time\n    __typename\n  }\n  tokenTransfers {\n    edges {\n      node {\n        type\n        amount {\n          token {\n            id\n            __typename\n          }\n          value\n          __typename\n        }\n        counterparty {\n          address\n          __typename\n        }\n        counterpartiesCount\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  nftTransfers {\n    edges {\n      node {\n        from {\n          address\n          __typename\n        }\n        to {\n          address\n          __typename\n        }\n        nft {\n          contract {\n            id\n            __typename\n          }\n          nftId\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n';

const oneDayBefore = moment().subtract(24, 'hours');
export function useRoyaltyAccountTxs() {
  const [isFetchingTxs, toggleFetchingTxs] = useBoolean(false);
  const [txData, setTxData] = useState<TxData[]>();
  const [txTotalCount, setTxTotalCount] = useState<number>();
  const [txCountOneDay, setTxCountOneDay] = useState<number>();
  const [totalFlowTokenOneDay, setTotalFlowTokenOneDay] = useState<number>();

  useMount(() => {
    toggleFetchingTxs();
    fetchData()
      .then((v: TxData[]) => {
        setTxData(v);
        if (v.length) {
          setTxTotalCount(v[0].data.account.tokenTransferCount);
        }
      })
      .catch(console.error)
      .finally(toggleFetchingTxs);
  });

  useEffect(() => {
    if (txData) {
      let total = 0;
      let count = 0;
      txData.forEach((item) => {
        count =
          (count || 0) + item.data.account.transferTransactions.edges.length;
        item.data.account.transferTransactions.edges.forEach((titem) => {
          titem.tokenTransfers.edges.forEach((eitem) => {
            if (eitem.node.type === 'Deposit') {
              if (
                eitem.node.amount.token.id === 'A.1654653399040a61.FlowToken'
              ) {
                console.log('count', eitem.node.amount.value);
                total += Number(eitem.node.amount.value);
              }
            }
          });
        });
      });
      setTotalFlowTokenOneDay(total / 100000000);
      setTxCountOneDay(count);
    }
  }, [txData]);

  return {
    isFetchingTxs,
    txData,
    txTotalCount,
    txCountOneDay,
    totalFlowTokenOneDay
  };
}

async function fetchData(endCursor?: string) {
  const raw = JSON.stringify({
    operationName: 'AccountTransfersQuery',
    variables: endCursor
      ? {
          address: SYSTEM_ROYALTY_ACCOUNT,
          first: 50,
          after: endCursor
        }
      : {
          address: SYSTEM_ROYALTY_ACCOUNT,
          first: 50
        },
    query
  });
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    body: raw
  };
  const encodeOptionStr = encodeURIComponent(JSON.stringify(requestOptions));
  const result: TxData = await fetch(
    `${CLOUDFLARE_WORKERS_BASE_URI}/tx/?token=5a477c43abe4ded25f1e8cc778a34911134e0590&options=${encodeOptionStr}`
  ).then((v) => v.json());
  // 判断当前所有交易是否都是24小时内
  const beforeIndex = result.data.account.transferTransactions.edges.findIndex(
    (item) => moment(item.transaction.time).isBefore(oneDayBefore)
  );
  if (beforeIndex >= 0) {
    // 包含24小时之前的数据，不必继续轮询了，即使有下一页
    result.data.account.transferTransactions.edges.splice(beforeIndex);
    return [result];
  }
  if (result.data.account.transferTransactions.pageInfo.hasNextPage) {
    await waitTime(1);
    const nextData: TxData[] = await fetchData(
      result.data.account.transferTransactions.pageInfo.endCursor
    );
    return [result, ...(nextData || [])];
  }
  return [result];
}
