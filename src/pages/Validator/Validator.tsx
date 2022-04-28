import React from "react";
import Page from "../../components/Page";
import Header from "./Header";

const Validator: React.FC<AddressPage["validatorAddress"]> = props => {
  return (
    <Page title="Validator Details">
      <Header {...props} />
    </Page>
  );
};

export default Validator;
