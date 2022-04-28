import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useChains, useCurrentChain } from "../contexts/ChainsContext";
import Select from "./Select";

type Props = {
  className?: string;
};
const SelectNetworks = (props: Props) => {
  const chains = useChains();
  const currentChain = useCurrentChain();
  const params = useParams();
  const navigate = useNavigate();

  const changeChain = (value = "") => {
    const prev = params["*"];
    const isIndex = !prev;
    const name = isIndex && value === "mainnet" ? "" : "/" + value;
    navigate(`${name}/${params["*"]}`);
  };

  return (
    <div className={props.className}>
      <Select
        value={currentChain}
        options={chains}
        getOptionLabel={option => option.chainName}
        getOptionValue={option => option.chainName}
        onChange={option => changeChain(option?.chainName)}
      />
    </div>
  );
};

export default SelectNetworks;
