import "react-app-polyfill/ie9";
import "core-js";
import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.scss";
import App from "./layouts/App";
import * as serviceWorker from "./serviceWorker";
import { ChainsProvider } from "./contexts/ChainsContext";
import { CHAINS } from "./constants";

ReactDOM.render(
  <BrowserRouter>
    <RecoilRoot>
      <ChainsProvider value={CHAINS}>
        <Routes>
          <Route path="/*" element={<App />} />
          <Route path=":network/*" element={<App />} />
        </Routes>
      </ChainsProvider>
    </RecoilRoot>
  </BrowserRouter>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
