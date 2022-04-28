import React from "react";
import c from "classnames";
import { Link, useParams } from "react-router-dom";
import notFound from "../images/not-found.svg";

import s from "./NotFound.module.scss";

export type NotFoundProps = {
  keyword?: string;
};

const NotFound = ({ keyword }: NotFoundProps) => {
  const { keyword: param } = useParams();
  const word = keyword || param;

  return (
    <div className={s.container}>
      <div>
        <img src={notFound} alt="earth" />
        {word ? (
          <>
            <h1>Search not found</h1>
            <p>
              Sorry, we couldn't find any results for <span>{word}</span>
            </p>
            <p>
              Please input the correct block number, transaction hash or account
              address.
            </p>
          </>
        ) : (
          <>
            <h1>Page not found</h1>
            <p>The page you were looking for doesn't exist.</p>
          </>
        )}

        <Link to="/" className={c("btn btn-primary-solid", s.button)}>
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
