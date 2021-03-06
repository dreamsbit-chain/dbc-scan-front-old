import React from "react";
import { Route, Routes } from "react-router-dom";
import Index from "./pages/Home/Home";
import Block from "./pages/Block";
import Tx from "./pages/Tx";
import Address from "./pages/Address/Address";
import NotFound from "./components/NotFound";

export default (
  <Routes>
    <Route index element={<Index />} />
    <Route path="blocks/:height" element={<Block />} />
    <Route path="block/:height" element={<Block />} />
    <Route path="txs/:height" element={<Block />} />
    <Route path="tx/:hash" element={<Tx />} />
    <Route path="address/:address" element={<Address />} />
    <Route path="account/:address" element={<Address />} />
    <Route path="notfound/:keyword" element={<NotFound />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
