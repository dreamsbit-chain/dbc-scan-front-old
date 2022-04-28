import useDenomFormater from "../hooks/useDenomFormater";
import format from "../scripts/format";

type Props = {
  estimated?: boolean;
  fontSize?: number;
  className?: string;
  denom?: string;
  children?: string;
  decimals?: number;
  skipFormat?: boolean;
};

const Amount = (props: Props) => {
  const {
    estimated,
    fontSize,
    className,
    denom,
    children,
    decimals = 2,
    skipFormat,
  } = props;

  const formatDenom = useDenomFormater();

  const decimalPlaces = decimals;
  const source = children || "0";

  const [integer, decimal] = (
    skipFormat ? source : format.amount(source, decimalPlaces)
  ).split(".");

  return (
    <span className={className} style={{ fontSize }}>
      {estimated && "≈ "}
      {integer}
      <small>
        {decimal && `.${decimal}`} {formatDenom(denom || "")}
      </small>
    </span>
  );
};

export default Amount;
