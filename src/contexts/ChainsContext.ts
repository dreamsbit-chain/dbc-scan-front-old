import { useParams } from "react-router-dom";
import { createContext } from "./createContext";

export const [useChains, ChainsProvider] =
  createContext<ChainOption[]>("Chains");

const useNetworkFromRouteMatch = () => {
  const { network } = useParams();
  return network;
};

export const useCurrentChain = () => {
  const chains = useChains();
  const network = useNetworkFromRouteMatch();

  const chain = chains.find(chain => chain.chainName === network) ?? chains[0]; // return mainnet for default chain

  if (!chain) {
    throw new Error("Chain is not defined");
  }

  return chain;
};

export const useURL = () => {
  const { explorerUrl } = useCurrentChain();
  return explorerUrl;
};
