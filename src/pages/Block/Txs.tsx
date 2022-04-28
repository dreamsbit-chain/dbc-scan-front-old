import { useMemo, useState } from "react";

import FlexTable from "../../components/FlexTable";
import Info from "../../components/Info";
import Card from "../../components/Card";
import Finder from "../../components/Finder";
import PaginationButtons from "../../components/PaginationButtons";
import TxAmount from "../Tx/TxAmount";

import { INITIAL_TXS_PER_PAGE, TXS_PER_PAGE } from "../../constants";
import { fromNow } from "../../scripts/utility";

import s from "./Txs.module.scss";
import format from "../../scripts/format";

const getRow = (tx: Tx, blockHeight: number) => {
  const { transactionHash, transactionType, fee, feeType, timestamp } = tx;

  return [
    <span>
      <Finder q="tx" v={transactionHash}>
        {format.truncate(transactionHash, [10, 8])}
      </Finder>
    </span>,
    <span className="type">{transactionType}</span>,
    <span>
      <TxAmount amount={fee} denom={feeType} />
    </span>,
    <span>
      <Finder q="blocks" v={blockHeight}>
        {blockHeight}
      </Finder>
    </span>,
    <span>{fromNow(timestamp)}</span>,
  ];
};

const Txs = ({ txs, blockHeight }: { txs: Tx[]; blockHeight: number }) => {
  const head = [`TxHash`, `Type`, `Fee`, `Height`, `Time`];
  const [offset, setOffset] = useState<number>(INITIAL_TXS_PER_PAGE);

  const paginatedTxs = useMemo(() => txs.slice(0, offset), [txs, offset]);

  const next = offset + TXS_PER_PAGE;
  const showMore = paginatedTxs.length < txs.length;

  return (
    <div className={s.tableContainer}>
      {txs.length ? (
        <>
          <Card bodyClassName={s.cardBody}>
            <FlexTable
              head={head}
              body={paginatedTxs.map(tx => getRow(tx, blockHeight))}
              tableStyle={{ border: "none", minWidth: "600px" }}
            />
          </Card>
          {showMore && <PaginationButtons offset={next} action={setOffset} />}
        </>
      ) : (
        <Card>
          <Info icon="info_outline" title="">
            No more transactions
          </Info>
        </Card>
      )}
    </div>
  );
};

export default Txs;
