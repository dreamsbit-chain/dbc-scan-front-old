import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { Tokens } from "../store/TokenStore";
import { TOKEN_INFOS_ENDPOINT } from "../api/endpoints";
import useFetch from "./useFetch";

/**
 * Encapsulate fetching token data logic
 * @param autoFetch
 * @returns retry function
 */
const useFetchTokenData = (autoFetch?: boolean) => {
  const setTokenData = useSetRecoilState(Tokens);

  const { data: tokenData, retry } = useFetch<TokenResponse>({
    url: TOKEN_INFOS_ENDPOINT,
    autoFetch,
  });

  useEffect(() => {
    if (tokenData) {
      setTokenData(tokenData.tokenInfos);
    }
  }, [tokenData, setTokenData]);

  return retry;
};

export default useFetchTokenData;
