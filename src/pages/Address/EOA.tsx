import CopyAddress from "./CopyAddress";
import TokenBalance from "./TokenBalance";
import Txs from "./Txs";
import Dividends from "./Dividends";

const EOA = ({ address, cryptoCurrency }: AddressPage["eoaAddress"]) => {
  return (
    <>
      <h2 className="title">Account Detail</h2>

      <CopyAddress>{address}</CopyAddress>

      <TokenBalance
        address={address}
        balance={cryptoCurrency}
      />

      <Dividends />

      <Txs address={address} />
    </>
  );
};

export default EOA;
