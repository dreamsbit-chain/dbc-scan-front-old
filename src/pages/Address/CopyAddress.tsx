import React from "react";
import Copy from "../../components/Copy";
import s from "./CopyAddress.module.scss";
import c from "classnames";

const CopyAddress = ({ children }: { children: string }) => (
  <div className={c(s.list, s.mb20)}>
    <div className={s.row}>
      <div className={s.head}>Address</div>
      <div className={s.body}>
        <div>
          {children}
          <Copy
            text={children}
            style={{ display: "inline-block", position: "absolute" }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default CopyAddress;
