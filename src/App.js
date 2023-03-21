import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { BlockNumber } from "./components/BlockNumber";

import "./App.css";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [gasPrice, setGasPrice] = useState();
  const latestBlocks = [];
  const [blocks, setBlocks] = useState();
  // const [transactions, setTransactions] = useState();

  function getLatestBlocks() {
    for (let i = 0; i < 5; i++) {
      latestBlocks.push(getBlocks(blockNumber - i));
      console.log(latestBlocks);
    }
  }

  async function getBlockNumber() {
    setBlockNumber(await alchemy.core.getBlockNumber());
  }

  async function getGasPrice() {
    const gasPrice = await alchemy.core.getGasPrice();
    setGasPrice(gasPrice / 1000000000);
  }

  async function getBlocks(num) {
    const block = await alchemy.core.getBlock(num);
    // console.log(block);
    setBlocks(block.hash);
  }

  async function getBlockWithTransactions(num) {
    const block = await alchemy.core.getBlockWithTransactions(num);
    console.log(block);
  }

  getBlockWithTransactions(15221026);

  useEffect(() => {
    getBlockNumber();
    getGasPrice();
    // getBlocks(15221026);
    // getTransactions();
  }, [blockNumber, gasPrice]);

  // get list of transactions for a given block
  async function getTransactions(blockNumber) {
    const transactions = await alchemy.core.getTransactions(blockNumber);
    console.log(transactions);
    // setTransactions(transactions);
  }

  //   - details for individual transactions
  //   - Allow users to click on a block listed in the webpage to get the block's details including its list of transactions
  //   - From the list of transactions allow users to click on specific transactions to get the details of the transaction
  //   - Make an accounts page where a user can look up their balance or someone else's balance
  //   * NFT methods
  //   * WebSocket methods
  //   * Alchemy's Transact API functionality
  //   * endpoints for using Alchemy's Notify Webhooks

  // Read more about the above in the [Alchemy SDK Surface docs](https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview?a=eth-bootcamp). Using the SDK can implement the following features?

  // - Given a contract address and token id, can you get the NFT's metadata?
  // - What is the floor price of an NFT right now?
  // - Did a pending transaction get mined?
  // - What transfers did an address receive this year?

  // getLatestBlocks();

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline text-blue-500">
        Hello world!
      </h1>
      <BlockNumber blockNumber={blockNumber} />
      Gas Price: {gasPrice} gwei
      {/* {blocks.hash} */}
      {/* <LatestBlocks blocks={blocks} /> */}
      {/* {transactions.map((transaction) => {
        return <li key={transaction.hash}>{transaction.hash}</li>;
      })} */}
    </div>
  );
}

export default App;
