import React, { ReactNode } from "react";
import c from "classnames";

type Props = {
  small?: boolean;
  className?: string;
  children: ReactNode;
  type?: "success" | "warning" | "danger" | "secondary";
};

const Badge = ({ type = "success", small, children, className }: Props) => (
  <span
    className={c(
      "badge",
      type === "success" && "badge-success",
      type === "warning" && "badge-warning",
      type === "danger" && "badge-danger",
      type === "secondary" && "badge-secondary",
      className,
    )}
  >
    {children}
  </span>
);

export default Badge;
