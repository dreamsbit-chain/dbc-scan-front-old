import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { Currencies } from "../store/CurrencyStore";

import { CURRENCY_RATIO_ENDPOINT } from "../api/endpoints";
import useFetch from "./useFetch";

/**
 * Encapsulate fetching currency data logic
 * @param autoFetch
 * @returns retry function
 */
const useFetchCurrencyData = (autoFetch?: boolean) => {
  const setCurrencyData = useSetRecoilState(Currencies);

  const { data: currencyData, retry } = useFetch<CurrencyRatioResponse>({
    url: CURRENCY_RATIO_ENDPOINT,
    autoFetch,
  });
  useEffect(() => {
    if (currencyData) {
      setCurrencyData(currencyData);
    }
  }, [currencyData, setCurrencyData]);

  return retry;
};

export default useFetchCurrencyData;
