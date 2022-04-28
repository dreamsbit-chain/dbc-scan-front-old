import React from "react";
import s from "./Header.module.scss";
import Search from "../components/Search";
import SelectNetworks from "../components/SelectNetworks";

import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

const Header = () => (
  <div className={s.header}>
    <div className={s.inner}>
      <div className={s.logo}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <Search className={s.search} />
      <SelectNetworks />
    </div>
  </div>
);

export default Header;
