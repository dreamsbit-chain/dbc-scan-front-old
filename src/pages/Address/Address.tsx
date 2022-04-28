import React, { useMemo } from "react";
import { useParams } from "react-router-dom";

import Loading from "../../components/Loading";
import EOA from "./EOA";
import Contract from "./Contract";
import Validator from "../Validator";

import { SEARCH_ENDPOINT } from "../../api/endpoints";
import WithFetch from "../../HOCs/WithFetch";
import withResultValidator from "../../HOCs/withResultValidator";

const AddressPage = withResultValidator(
  ({ result }: { result: SearchResult }) => {
    switch (result.addressPage?.addressPageType) {
      case "CONTRACT_ADDRESS_PAGE":
        return <Contract {...result.addressPage.contractAddress} />;
      case "VALIDATOR_ADDRESS_PAGE":
        return <Validator {...result.addressPage.validatorAddress} />;

      default:
        return <EOA {...result.addressPage.eoaAddress} />;
    }
  },
  "ADDRESS_PAGE",
);

const Address = () => {
  const { address = "" } = useParams();
  const params = useMemo(() => ({ query: address }), [address]);

  return (
    <WithFetch url={SEARCH_ENDPOINT} params={params} loading={<Loading />}>
      {(data: SearchResult) => (
        <AddressPage result={data} errorProps={{ keyword: address }} />
      )}
    </WithFetch>
  );
};

export default Address;
