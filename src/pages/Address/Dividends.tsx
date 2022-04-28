import React from "react";
import s from "./Dividends.module.scss";

import Card from "../../components/Card";
import { isEmpty } from "lodash";
// import { useCurrentChain } from "../../contexts/ChainsContext";
// import format from "../../scripts/format";

const Dividends = ({ dividends = ["not empty"] }: { dividends?: any[] }) => {
  // const { symbol } = useCurrentChain();

  return !isEmpty(dividends) ? (
    <Card
      title="Dividends"
      headerClassName={s.cardTitle}
      bodyClassName={s.cardBody}
    >
      <div className={s.table}>
        <div className={s.commingSoon}>It will be coming soon...</div>
        {/* <div className={s.col}>
          <div className={s.head}>{`${symbol} Holding Time`}</div>
          <div className={s.body}>11 day 23 hours 2mins</div>
        </div>
        <div className={s.col}>
          <div className={s.head}>{`Number of tx`}</div>
          <div className={s.body}>23 tx</div>
        </div>
        <div className={s.col}>
          <div className={s.head}>{`Tx volume`}</div>
          <div className={s.body}>{`${format.amount(
            "122952",
            2,
          )} ${symbol}`}</div>
        </div> */}
      </div>
    </Card>
  ) : null;
};

export default Dividends;
