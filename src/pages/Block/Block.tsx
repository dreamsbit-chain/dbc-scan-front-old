import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import c from "classnames";
import TxList from "./Txs";
import Loading from "../../components/Loading";
import Finder from "../../components/Finder";

import { fromUnixTimestamp } from "../../scripts/utility";
import WithFetch from "../../HOCs/WithFetch";
import withResultValidator from "../../HOCs/withResultValidator";
import { SEARCH_ENDPOINT } from "../../api/endpoints";

import s from "./Block.module.scss";

const heightButton = (height: number) => (
  <span className={s.height}>
    <span>{height}</span>
    <Link to={`../blocks/${height - 1}`}>
      <i className="material-icons">chevron_left</i>
    </Link>
    <Link to={`../blocks/${height + 1}`}>
      <i className="material-icons">chevron_right</i>
    </Link>
  </span>
);

const txsCount = (txCount: number) => (
  <span className={s.txs}>
    {txCount > 0 ? (
      <span>{txCount} Transactions</span>
    ) : (
      <span>0 Transactions</span>
    )}
  </span>
);

const BlockPage = withResultValidator(
  ({
    result: {
      blockPage: { block },
    },
  }: {
    result: SearchResult;
  }) => (
    <>
      <h2 className="title">
        Block<span>#{block.blockHeight}</span>
      </h2>
      <div className={c(s.list, s.blockInfo)}>
        <div className={s.row}>
          <div className={s.head}>Chain ID</div>
          <div className={s.body}>{block.chainId}</div>
        </div>
        <div className={s.row}>
          <div className={s.head}>Block height</div>
          <div className={s.body}>{heightButton(block.blockHeight)}</div>
        </div>
        <div className={s.row}>
          <div className={s.head}>Timestamp</div>
          <div className={s.body}>{fromUnixTimestamp(block.timestamp)}</div>
        </div>
        <div className={s.row}>
          <div className={s.head}>Transactions</div>
          <div className={s.body}>{txsCount(block.transactionCount)}</div>
        </div>
        <div className={s.row}>
          <div className={s.head}>Proposer</div>
          <div className={s.body}>
            <Finder q={"address"} v={block.validatorAddress}>
              {block.validatorAddress}
            </Finder>
          </div>
        </div>
      </div>

      <TxList txs={block.transactions} blockHeight={block.blockHeight} />
    </>
  ),
  "BLOCK_PAGE",
);

const Block = () => {
  const { height = "" } = useParams();

  const params = useMemo(() => {
    return { query: height };
  }, [height]);

  return (
    <WithFetch url={SEARCH_ENDPOINT} params={params} loading={<Loading />}>
      {(result: SearchResult) => (
        <BlockPage result={result} errorProps={{ keyword: height }} />
      )}
    </WithFetch>
  );
};

export default Block;
