interface Log {
  msg_index: string;
  success: boolean;
  events: Events[];
  // log can be empty string with success
  log:
    | string
    | {
        tax: string;
        // when failure
        code?: number;
        message?: string;
      };
}

interface Events {
  type: string;
  attributes: Attributes[];
}

interface Attributes {
  key: string;
  value?: string;
}

interface Tag {
  key: string;
  value: string;
}

type TxStatus = "SUCCEED" | "PENDING" | "FAILED";
interface Tx {
  transactionHash: string;
  transactionType: string;
  transactionStatus: TxStatus;
  blockHeight: number;
  feeType: string;
  fee: string;
  gas: string;
  gasPrice: string;
  timestamp: number;
  reason?: string;
}

type TxPageType = "NATIVE_COIN_PAGE";

interface TxMessage {
  key: string;
  value: any;
}

interface EventLog {
  name: string;
  type: string;
  value: any;
}

interface TxDetail {
  contractAddress?: string;
  transactionType: string;
  transactionMessages: TxMessage[];
  eventLogJson: [];
}

interface TxPage {
  transactionPageType: TxPageType;
  transaction: Tx;
  transactionDetails: TxDetail[] | null;
}

interface Amount {
  key: string;
  value: string;
}

interface TxHistory extends Tx {
  amountOuts: Amount[];
  amountIns: Amount[];
}

interface TxsResponse {
  totalCount: number;
  start: string;
  limit: string;
  transactionHistories: TxHistory[];
}
