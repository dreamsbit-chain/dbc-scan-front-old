import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import c from "classnames";

import { ReactComponent as SearchIcon } from "../images/search.svg";

import apiClient from "../api/apiClient";
import { SEARCH_ENDPOINT } from "../api/endpoints";
import { useCurrentChain, useURL } from "../contexts/ChainsContext";
import { getEndpointByPageType } from "../scripts/utility";

import s from "./Search.module.scss";

type Props = {
  className?: string;
  type?: "primary" | "secondary";
};

const Search = ({ className, type = "primary" }: Props) => {
  const [value, setValue] = useState(``);
  const { chainName } = useCurrentChain();
  const navigate = useNavigate();
  const url = useURL();
  const typeSecondary = type === "secondary";

  const search = (keyword: string) => {
    const res = apiClient.get<SearchResult>(url + SEARCH_ENDPOINT, {
      params: {
        query: keyword,
      },
    });
    return res;
  };

  const handleSubmit: Submit = async e => {
    e.preventDefault();

    const keyword = value.trim();
    try {
      const { data: prefetchData } = await search(keyword);
      navigate(
        `/${chainName}${getEndpointByPageType(prefetchData.pageType, keyword)}`,
        { state: { prefetchData } },
      );
    } catch (error) {
      navigate(`/${chainName}/blocks/${keyword}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className={c(s.group, typeSecondary && s.secondary)}>
        <input
          type="search"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder={"Search Block/ Tx/ Account"}
          autoFocus
        />
        <button className={s.button} type="submit">
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};

export default Search;
