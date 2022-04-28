interface BlockHeader {
  height: string;
  time: string;
  proposer_address: string;
  last_commit_hash: string;
  last_block_id: {
    hash: string;
  };
}

interface BlockPage {
  block: Block;
}
interface Block {
  chainId: number;
  blockHeight: number;
  timestamp: number;
  transactionCount: number;
  validatorAddress: string;
  transactions: Tx[];
}
