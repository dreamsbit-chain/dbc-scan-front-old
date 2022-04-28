import React from "react";
import c from "classnames";

import Card from "../../components/Card";
import Badge from "../../components/Badge";
import { ReactComponent as Logo } from "../../images/us2-dark.svg";

import { percent } from "../../scripts/math";

import s from "./Header.module.scss";

const thumbnail = { className: s.thumbnail, width: 80, height: 80 };

const renderBadge = (status: ValidatorStatus) => {
  const type = status === "ACTIVE" ? "success" : "secondary";
  return (
    <Badge type={type} className={s.status}>
      {status.toLocaleLowerCase()}
    </Badge>
  );
};

const Header = (validator: AddressPage["validatorAddress"]) => (
  <Card
    title={
      <header className={s.header}>
        <Logo {...thumbnail} height={33} width={33} />
        <section>
          <h1 className={s.moniker}>
            {validator.name}
            {renderBadge(validator.status)}
          </h1>
        </section>
      </header>
    }
    headerClassName={s.cardHeader}
    bodyClassName={s.cardBody}
    bgHeader
  >
    <div className={c("row", s.summary)}>
      <article className={c("col")}>
        <h2>Uptime (Last 10k blocks)</h2>
        <p className={s.percent}>{percent(validator.upTime, 0)}</p>
      </article>
      <article className="col col-6">
        <h2>Account address</h2>
        <p>{validator.address}</p>
      </article>
    </div>
  </Card>
);

export default Header;
