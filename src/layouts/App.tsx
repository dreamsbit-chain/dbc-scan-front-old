import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import routes from "../routes";

import ErrorBoundary from "../components/ErrorBoundary";
import Header from "./Header";
import Search from "../components/Search";

import { useCurrentChain } from "../contexts/ChainsContext";
import useFetchCurrencyData from "../hooks/useFetchCurrencyData";
import useFetchTokenData from "../hooks/useFetchTokenData";

import s from "./App.module.scss";

const App = () => {
  const { chainId } = useCurrentChain();
  const { pathname } = useLocation();

  useFetchTokenData();
  const retry = useFetchCurrencyData(false);

  useEffect(() => {
    retry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <section className={s.main} key={chainId}>
      <Header />
      <Search className={s.search} type="secondary" />
      <section className={s.content}>
        <ErrorBoundary>{routes}</ErrorBoundary>
      </section>
    </section>
  );
};

export default App;
