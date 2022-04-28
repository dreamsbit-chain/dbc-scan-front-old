import React, { useState, ReactNode } from "react";

import CopyToClipboard from "react-copy-to-clipboard";
import Tooltip from "./Tooltip";
import { ReactComponent as CopyIcon } from "../images/copy.svg";

import s from "./Copy.module.scss";

type Props = {
  classNames?: {
    container?: string;
    text?: string;
    button?: string;
    wrapper?: string;
  };
  text: string;
  children?: ReactNode;
  tooltip?: ReactNode;
  style?: object;
};

const Copy = (props: Props) => {
  const { classNames = {}, text, children, tooltip, style } = props;
  const [copied, setCopied] = useState(false);

  const showTooltip = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={classNames.container} style={style}>
      {children && <div className={classNames.text}>{children}</div>}

      <section className={classNames.wrapper ?? s.wrapper}>
        <CopyToClipboard text={text} onCopy={showTooltip}>
          <CopyIcon className={s.icon} />
        </CopyToClipboard>

        {copied && (tooltip || <Tooltip content="Copied!"></Tooltip>)}
      </section>
    </div>
  );
};

export default Copy;
