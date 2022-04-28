import { useRecoilValue } from "recoil";

import Card from "../../components/Card";
import Info from "../../components/Info";
import AmountCard from "./AmountCard";
import US2 from "../../images/us2-dark.svg";

import { Tokens } from "../../store/TokenStore";
import { DEFAULT_CRYPTO, DEFAULT_FIAT } from "../../constants";

import s from "./TokenBalance.module.scss";

interface Props {
  balance: AddressBalance;
  address: string;
}

const TokenBalance = ({ balance, address }: Props) => {
  const tokenInfos = useRecoilValue(Tokens);

  const getTokenLogo = (name: string) => {
    return tokenInfos.find(token => token.contract_name === name)?.logo_url;
  };
  return (
    <>
      <Card title="Coins" headerClassName={s.cardTitle}>
        {balance.coinAmount ? (
          <div className={s.cardBodyContainer}>
            <AmountCard
              denom={DEFAULT_CRYPTO}
              amount={balance.coinAmount}
              iconLink={US2}
              currency={DEFAULT_FIAT}
            />
          </div>
        ) : (
          <Card>
            <Info icon="info_outline" title="">
              This account doesn't hold any coins yet.
            </Info>
          </Card>
        )}
      </Card>

      {balance?.tokenAmounts?.length > 0 && (
        <Card title="Tokens" headerClassName={s.cardTitle}>
          <div className={s.cardBodyContainer}>
            {balance.tokenAmounts.map((balance, key) => (
              <AmountCard
                key={key}
                denom={balance.key}
                amount={balance.value}
                iconLink={getTokenLogo(balance.key)}
              />
            ))}
          </div>
        </Card>
      )}
    </>
  );
};

export default TokenBalance;
