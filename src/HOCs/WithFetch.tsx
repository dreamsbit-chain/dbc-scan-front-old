import React, { ReactNode } from "react";
import FetchError from "../components/FetchError";
import useFetch from "../hooks/useFetch";

type Props = FetchProps & {
  loading?: ReactNode;
  renderError?: () => ReactNode;
  children: ReactNode | ((data: any) => ReactNode);
};

const WithFetch = (props: Props) => {
  const { url, params, loading, renderError, children } = props;

  const { data, isLoading, error } = useFetch({
    url,
    params,
  });
  const render = () =>
    typeof children === "function" ? children(data) : children;

  return (
    <>
      {error
        ? renderError
          ? renderError()
          : FetchError({ url, keyword: Object.values(params || {})[0], error })
        : isLoading
        ? loading || null
        : render() || null}
    </>
  );
};

export default WithFetch;
