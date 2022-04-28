import { useEffect, useMemo, useState } from "react";
import { isEmpty } from "lodash";

import FlexTable from "../../components/FlexTable";
import Card from "../../components/Card";
import Info from "../../components/Info";
import Finder from "../../components/Finder";
import Loading from "../../components/Loading";
import TxAmount from "../Tx/TxAmount";
import PaginationButtons from "../../components/PaginationButtons";
import Amount from "../../components/Amount";
import { ReactComponent as Success } from "../../images/success.svg";
import { ReactComponent as Failed } from "../../images/failed.svg";
import { ReactComponent as Pending } from "../../images/pending.svg";

import useFetch from "../../hooks/useFetch";
import { useCurrentChain } from "../../contexts/ChainsContext";
import { fromUnixTimestamp } from "../../scripts/utility";
import format from "../../scripts/format";

import { TRANSACTIONS_ENPOINT } from "../../api/endpoints";

import s from "./Txs.module.scss";
import { INITIAL_TXS_PER_PAGE, TXS_PER_PAGE } from "../../constants";

const Txs = ({ address }: { address: string }) => {
  const { chainId } = useCurrentChain();
  const [offset, setOffset] = useState<number>(0);

  const perPage = offset === 0 ? INITIAL_TXS_PER_PAGE : TXS_PER_PAGE;

  const params = useMemo(
    () => ({
      start: offset,
      limit: perPage,
    }),
    [offset, perPage],
  );

  const { data, isLoading } = useFetch<TxsResponse>({
    url: TRANSACTIONS_ENPOINT(address),
    params: params,
  });

  const next = Math.min(data?.totalCount || 0, offset + perPage);

  const [txsRow, setTxsRow] = useState<JSX.Element[][]>([]);

  useEffect(() => {
    if (data?.transactionHistories) {
      const txRow = data.transactionHistories.map(tx => {
        return getRow(tx, chainId);
      });
      setTxsRow(stack => [...stack, ...txRow]);
    }
    // eslint-disable-next-line
  }, [data, chainId, address]);

  const head = [
    `Tx hash`,
    `Type`,
    `Block`,
    `Amount (Out)`,
    `Amount (In)`,
    `Timestamp`,
    `Fee`,
  ];

  const showMore = data?.totalCount ? txsRow.length < data.totalCount : true;

  return (
    <>
      <Card
        title="Transactions"
        headerClassName={s.cardTitle}
        bodyClassName={s.cardBody}
      >
        <div className={s.cardBodyContainer}>
          {isEmpty(txsRow) && isLoading ? (
            <Loading />
          ) : !isEmpty(txsRow) ? (
            <FlexTable
              head={head}
              body={txsRow}
              tableStyle={{ border: "none" }}
              headStyle={{ background: "none" }}
            />
          ) : (
            <Card>
              <Info icon="info_outline" title="">
                No more transactions
              </Info>
            </Card>
          )}
        </div>
      </Card>
      {showMore && (
        <PaginationButtons
          offset={next}
          action={setOffset}
          loading={isLoading}
        />
      )}
    </>
  );
};

export default Txs;

const getStatusIcon = (status: TxStatus) => {
  switch (status) {
    case "SUCCEED":
      return <Success className={s.icon} />;
    case "PENDING":
      return <Pending className={s.icon} />;
    default:
      return <Failed className={s.icon} />;
  }
};

const getRow = (response: TxHistory, network: number) => {
  const {
    transactionStatus,
    transactionHash,
    transactionType,
    blockHeight,
    timestamp,
    fee,
    feeType,
    amountIns,
    amountOuts,
  } = response;

  return [
    <span>
      <div className={s.wrapper}>
        <Finder q="tx" network={network} v={transactionHash}>
          {format.truncate(transactionHash, [8, 8])}
        </Finder>
        {getStatusIcon(transactionStatus)}
      </div>
    </span>,
    <span className="type">{transactionType}</span>,
    <span>
      <Finder q="blocks" network={network} v={blockHeight}>
        {blockHeight}
      </Finder>
      <span> ({network})</span>
    </span>,
    <span className={s.amount}>
      {amountOuts.length
        ? amountOuts.slice(0, 3).map(({ key, value }, index) => {
            if (index >= 2) {
              return (
                <Finder q="tx" v={transactionHash}>
                  ...
                </Finder>
              );
            }
            return (
              <span key={index} className={s.amountOut}>
                -{<Amount denom={key}>{value}</Amount>}
              </span>
            );
          })
        : "-"}
    </span>,
    <span className={s.amount}>
      {amountIns.length
        ? amountIns.slice(0, 3).map(({ key, value }, index) => {
            if (index >= 2) {
              return (
                <Finder q="tx" v={transactionHash}>
                  ...
                </Finder>
              );
            }
            return (
              <span key={index} className={s.amountIn}>
                +{<Amount denom={key}>{value}</Amount>}
              </span>
            );
          })
        : "-"}
    </span>,
    <span>{fromUnixTimestamp(timestamp)}</span>,
    <span>{<TxAmount amount={fee} denom={feeType} />}</span>,
  ];
};
