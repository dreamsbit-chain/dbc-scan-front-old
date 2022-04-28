import React, { ReactNode } from "react";
import Amount from "../../components/Amount";
import TokenIcon from "./TokenIcon";

import useCurrencyConverter from "../../hooks/useCurrencyConverter";
import useDenomFormater from "../../hooks/useDenomFormater";
import format from "../../scripts/format";

import s from "./AmountCard.module.scss";

type Props = {
  denom: string;
  amount: string;
  path?: string;
  hash?: string;
  iconLink?: string;
  button?: ReactNode;
  children?: ReactNode;
  decimals?: number;
  currency?: string;
};

const AmountCard = (props: Props) => {
  const { denom, iconLink, amount, button, children, decimals, currency } =
    props;

  const formatDenom = useDenomFormater();
  const { cryptoToFiat } = useCurrencyConverter();

  const renderFiatValue = () => {
    const fiatValue = cryptoToFiat({ name: denom, value: amount }, currency);
    console.log();

    return (
      <div className={s.currency}>
        <span className={s.equal}>=</span> {format.amount(fiatValue)} {currency}
      </div>
    );
  };

  return (
    <div className={s.card}>
      <article className={s.article}>
        <header className={s.header}>
          <div className={s.token_wrapper}>
            {<TokenIcon iconLink={iconLink} />}
            <h1 className={s.denom}>{formatDenom(denom)}</h1>
          </div>
          <section className={s.action}>
            <Amount className={s.amount} decimals={decimals}>
              {amount}
            </Amount>
            {currency && renderFiatValue()}
            <div className={s.button}>{button}</div>
          </section>
        </header>

        {children}
      </article>
    </div>
  );
};

export default AmountCard;
