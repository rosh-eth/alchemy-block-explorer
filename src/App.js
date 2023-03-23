import { Alchemy, Network } from "alchemy-sdk";
import { BlockNumber } from "./components/BlockNumber";
import { useFetchBlock } from "./components/hooks/useFetchBlock";

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
  const { blockNumber, gasPrice, transactions, isLoading } = useFetchBlock();

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline text-blue-500">
        Hello world!
      </h1>
      {!isLoading && (
        <>
          <BlockNumber blockNumber={blockNumber} />
          Gas Price: {gasPrice} gwei
        </>
      )}

      {!isLoading &&
        transactions.slice(0, 10).map((transaction, index) => {
          return (
            <li key={transaction.hash}>
              {index} - {transaction.hash}
            </li>
          );
        })}
    </div>
  );
}

export default App;

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
