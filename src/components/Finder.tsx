import React from "react";
import { Link } from "react-router-dom";
import c from "classnames";
import { useCurrentChain } from "../contexts/ChainsContext";

type Props = {
  q: string;
  v?: string | number;
  children: string | number;
  className?: string;
  brand?: boolean;
  network?: number;
};

const Finder = ({ q, v, children, className, brand, network }: Props) => {
  const { chainName } = useCurrentChain();

  return (
    <Link
      to={`/${chainName}/${q}/${v || children}`}
      className={c(className, brand && "text-primary")}
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );
};

export default Finder;
