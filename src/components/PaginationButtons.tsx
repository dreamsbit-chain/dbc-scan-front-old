import { ReactElement } from "react";
import c from "classnames";

import { ReactComponent as ArrowDown } from "../images/arrow-down2.svg";

import s from "./PaginationButtons.module.scss";

type Props = {
  action?: (offset: number) => void;
  offset?: number;
  loading?: boolean;
};

const PaginationButtons = ({ action, offset, loading }: Props) =>
  offset ? (
    <div className={s.component}>
      {renderAction(
        <>
          See More <ArrowDown />
        </>,
        offset,
        action,
        loading,
      )}
    </div>
  ) : (
    <></>
  );

export default PaginationButtons;

const renderAction = (
  children: string | ReactElement,
  offset: number | undefined,
  action: ((offset: number) => void) | undefined,
  loading?: boolean,
) => (
  <button
    onClick={() => action && offset && action(offset)}
    className={c("btn btn-primary")}
    disabled={loading}
  >
    {loading ? "Loading..." : children}
  </button>
);
