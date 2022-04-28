import React from "react";
// import s from "./FetchError.module.scss";
// import { Link } from "react-router-dom";
import NotFound from "./NotFound";

// import { get } from "lodash";

type Props = {
  url: string;
  keyword?: string;
  error?: Error;
};

const FetchError = ({ url, keyword, error }: Props) => {
  return (
    <>
      <NotFound keyword={keyword} />
    </>
  );
};

export default FetchError;
