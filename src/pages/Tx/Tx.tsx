import { useMemo } from "react";
import { useParams } from "react-router-dom";
import c from "classnames";
import { formatDistanceToNowStrict } from "date-fns";

import Finder from "../../components/Finder";
import MsgBox from "./MsgBox";
import Copy from "../../components/Copy";
import TxAmount from "./TxAmount";
import { ReactComponent as FailedIcon } from "../../images/failed-round.svg";

import { useCurrentChain } from "../../contexts/ChainsContext";
import WithFetch from "../../HOCs/WithFetch";
import format from "../../scripts/format";
import { SEARCH_ENDPOINT } from "../../api/endpoints";

import s from "./Tx.module.scss";
import withResultValidator from "../../HOCs/withResultValidator";
import Badge from "../../components/Badge";

const TxComponent = withResultValidator(
  ({
    result: {
      transactionPage: { transaction, transactionDetails, transactionPageType },
    },
  }: {
    result: SearchResult;
  }) => {
    const { chainId } = useCurrentChain();

    // status settings
    const status =
      transaction.transactionStatus === "SUCCEED" ? (
        <Badge type="success">Success</Badge>
      ) : transaction.transactionStatus === "FAILED" ? (
        <Badge type="danger">Failed</Badge>
      ) : (
        <Badge type="warning">Pending</Badge>
      );

    return (
      <>
        <h2 className={c(s.title, "title")}>Transaction Details</h2>
        <div className={s.header}>
          {status}
          <span className={c(s.sideLine)}>
            {formatDistanceToNowStrict(new Date(transaction.timestamp * 1000), {
              addSuffix: true,
            })}
          </span>
          <span>{format.date(new Date(transaction.timestamp * 1000))}</span>
        </div>

        {transaction.transactionStatus === "FAILED" && transaction.reason && (
          <div className={s.failedMsg}>
            <FailedIcon />
            {transaction.reason}
          </div>
        )}

        <div className={c(s.list, s.info)}>
          <div className={s.row}>
            <div className={s.head}>Tx Hash</div>
            <div className={s.body}>
              <div className={s.txHash}>
                <div className={s.text}>{transaction.transactionHash}</div>
                <Copy
                  style={{ position: "absolute", display: "inline-block" }}
                  text={transaction.transactionHash}
                />
              </div>
            </div>
          </div>

          <div className={s.row}>
            <div className={s.head}>Network</div>
            <div className={s.body}>{chainId}</div>
          </div>

          <div className={s.row}>
            <div className={s.head}>Block</div>
            <div className={s.body}>
              <Finder q="blocks" v={transaction.blockHeight}>
                {transaction.blockHeight}
              </Finder>
            </div>
          </div>

          <div className={s.row}>
            <div className={s.head}>Transaction fee</div>
            <div className={s.body}>
              <TxAmount amount={transaction.fee} denom={transaction.feeType} />
            </div>
          </div>

          {/* {!isPending && ( */}
          <div className={s.row}>
            <div className={s.head}>Gas (Used/Requested)</div>
            <div className={s.body}>{format.gas(transaction.gas)}</div>
          </div>
          {/* )} */}
        </div>

        {transactionDetails?.map((msg, index) => {
          return <MsgBox detail={msg} key={index} type={transactionPageType} />;
        })}
      </>
    );
  },
  "TRANSACTION_PAGE",
);

const Tx = () => {
  const { hash } = useParams();
  const params = useMemo(() => {
    return { query: hash };
  }, [hash]);

  if (!hash) {
    throw new Error("Tx hash is not defined");
  }

  return hash ? (
    <WithFetch url={SEARCH_ENDPOINT} params={params}>
      {(result: SearchResult) => {
        return (
          <TxComponent
            result={result}
            key={hash}
            errorProps={{ keyword: hash }}
          />
        );
      }}
    </WithFetch>
  ) : null;
};

export default Tx;
