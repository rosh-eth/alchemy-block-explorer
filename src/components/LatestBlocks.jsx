import React from "react";

export const LatestBlocks = ({ blocks }) => {
  console.log(blocks);

  return (
    <div>
      <h2>Latest Blocks</h2>
      {blocks.number}

      {/* <ul>
        {blocks.map((block) => {
          return <li key={block.hash}>{block.number}</li>;
        })}
      </ul> */}
    </div>
  );
};
