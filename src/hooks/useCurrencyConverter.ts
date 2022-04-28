import BigNumber from "bignumber.js";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { DEFAULT_DECIMALS_PLACES, DEFAULT_FIAT } from "../constants";
import { Currencies } from "../store/CurrencyStore";

const useCurrencyConverter = () => {
  const currencyRatios = useRecoilValue(Currencies)?.conversionRatios;

  const getRatio = useCallback(
    (cryptoName: string, fiatName: string) => {
      return currencyRatios.find(
        ratio =>
          ratio.fromCryptoName === cryptoName && ratio.fiatName === fiatName,
      )?.ratio;
    },
    [currencyRatios],
  );
  const cryptoToFiat = useCallback(
    (crypto: CryptoToken, fiat: string = DEFAULT_FIAT, decimals?: number) => {
      const ratio = getRatio(crypto.name, fiat);

      if (!ratio) return "";
      return new BigNumber(crypto.value)
        .multipliedBy(ratio)
        .toFixed(decimals || DEFAULT_DECIMALS_PLACES);
    },
    [getRatio],
  );
  return { cryptoToFiat };
};

export default useCurrencyConverter;
