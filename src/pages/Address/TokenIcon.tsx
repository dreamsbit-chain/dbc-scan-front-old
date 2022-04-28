import React from "react";
import Image from "../../components/Image";

import s from "./TokenIcon.module.scss";

const TokenIcon = ({ iconLink }: { iconLink?: string }) => {
  return (
    <div className={s.iconContainer}>
      <Image url={iconLink} className={s.icon} />
    </div>
  );
};

export default TokenIcon;
