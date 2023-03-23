import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export const useFetchBlock = () => {
  const [pageState, setPageState] = useState({
    blockNumber: null,
    gasPrice: null,
    transactions: [],
  });

  useEffect(() => {
    (async () => {
      const blockNumber = await getBlockNumber();
      const gasPrice = await getGasPrice();
      const transactions = await getBlockWithTransactions(blockNumber);

      setPageState({
        blockNumber,
        gasPrice,
        transactions,
      });
    })();
  }, []);

  async function getBlockNumber() {
    return await alchemy.core.getBlockNumber();
  }

  async function getGasPrice() {
    const gasPrice = await alchemy.core.getGasPrice();
    return gasPrice / 1000000000;
  }

  async function getBlockWithTransactions(num) {
    const block = await alchemy.core.getBlockWithTransactions(num);
    console.log(block);
    console.log(block.transactions);
    return block.transactions;
  }

  return pageState;
};
