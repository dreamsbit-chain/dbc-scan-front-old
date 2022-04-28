import React from "react";
import s from "./Home.module.scss";
import Search from "../../components/Search";
import SelectNetworks from "../../components/SelectNetworks";
import logo from "../../images/logo-vertical.svg";

const Index = () => {
  return (
    <div className={s.container}>
      <div className={s.content}>
        <div className={s.logo}>
          <img src={logo} alt="logo" />
        </div>
        <Search className={s.search} />
      </div>
      <SelectNetworks className={s.networks} />
      <div className={s.background} />
    </div>
  );
};

export default Index;
