import { useCallback } from "react";
import { DEFAULT_CRYPTO } from "../constants";
import { useCurrentChain } from "../contexts/ChainsContext";

const useDenomFormater = () => {
  const { symbol } = useCurrentChain();
  const formatDenom = useCallback(
    (denom: string) => {
      return denom === DEFAULT_CRYPTO ? symbol : denom;
    },
    [symbol],
  );

  return formatDenom;
};

export default useDenomFormater;
