import { useState, useEffect, useCallback } from "react";
import apiClient from "../api/apiClient";
import { useURL } from "../contexts/ChainsContext";

const useFetch = <T = any>({
  url,
  params,
  autoFetch = true,
}: FetchProps & { checkPrefetch?: boolean; autoFetch?: boolean }) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const chainURL = useURL();

  const init = (): void => {
    setError(undefined);
    setIsLoading(true);
  };

  const fetchData = useCallback(async () => {
    init();

    try {
      const result = await apiClient.get(chainURL + url, { params });

      if (result.data === null) {
        throw new Error("Data is null");
      }

      setData(result.data);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }, [params, url, chainURL]);

  useEffect(() => {
    autoFetch && fetchData();
  }, [autoFetch, fetchData]);

  return { data, isLoading, error, retry: fetchData };
};

export default useFetch;
