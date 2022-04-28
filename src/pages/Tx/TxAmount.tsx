import { useCurrentChain } from "../../contexts/ChainsContext";
import useDenomFormater from "../../hooks/useDenomFormater";
import format from "../../scripts/format";

interface Props {
  amount: string;
  denom: string;
  index?: number;
  decimals?: number;
  skipFormat?: boolean;
}

const TxAmount = ({
  index,
  amount,
  denom,
  decimals = 2,
  skipFormat,
}: Props) => {
  const { symbol } = useCurrentChain();
  const formatDenom = useDenomFormater();

  if (!amount || !denom) {
    return <>0 {symbol}</>;
  }

  const renderAmount = skipFormat ? amount : format.amount(amount, decimals);
  return (
    <>
      {!!index && ", "}
      {renderAmount} {formatDenom(denom)}
    </>
  );
};
export default TxAmount;
