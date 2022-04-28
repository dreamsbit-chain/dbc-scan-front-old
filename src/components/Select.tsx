import React from "react";
import ReactSelect, { Props } from "react-select";
import s from "./Select.module.scss";
import { ReactComponent as ArrowUp } from "../images/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../images/arrow-down.svg";

interface SelectProps<Option, IsMulti extends boolean>
  extends Props<Option, IsMulti> {}

const Select = <Option extends unknown, IsMulti extends boolean = false>({
  ...props
}: SelectProps<Option, IsMulti>) => {
  return (
    <ReactSelect
      className={s.select}
      classNamePrefix={"react-select"}
      components={{
        DropdownIndicator: ({ innerProps, selectProps }) => {
          return (
            <div {...innerProps} className={s.indicator}>
              {selectProps.menuIsOpen ? <ArrowUp /> : <ArrowDown />}
            </div>
          );
        },
      }}
      {...props}
    />
  );
};

export default Select;
