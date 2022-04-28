import React from "react";
import Txs from "./Txs";
import CopyAddress from "./CopyAddress";
import ContractInfo from "./ContractInfo";

const Contract = ({ address, ...rest }: AddressPage["contractAddress"]) => {
  return (
    <>
      <h2 className="title">Smart Contract</h2>
      <CopyAddress>{address}</CopyAddress>
      <ContractInfo data={{ address, ...rest }} />
      <Txs address={address} />
    </>
  );
};

export default Contract;
