import React, { useState } from "react";
import { isEmpty } from "lodash";
import c from "classnames/bind";

import Finder from "../../components/Finder";
import EventLogs from "./EventLogs";
import { ReactComponent as ArrowUp } from "../../images/arrow-up2.svg";
import { ReactComponent as ArrowDown } from "../../images/arrow-down2.svg";

import { ADDRESS_KEYS, DEFAULT_CRYPTO } from "../../constants";
import format from "../../scripts/format";

import s from "./Msg.module.scss";
import { useRecoilValue } from "recoil";
import { Tokens } from "../../store/TokenStore";
import useDenomFormater from "../../hooks/useDenomFormater";

interface Props {
  detail: TxDetail;
  type?: TxPageType;
}

const cx = c.bind(s);

const MsgField = ({
  data,
  noBorder = false,
}: {
  data: TxMessage;
  noBorder?: boolean;
}) => {
  if (!data) return null;

  const { key, value } = data;

  const isAddress = ADDRESS_KEYS.includes(key);
  return (
    <section className={cx(s.msgWrapper, { noBorder })}>
      <span className={s.key}>{key}</span>
      {isAddress ? <Finder q="address">{value}</Finder> : value}
    </section>
  );
};

export const MsgBox = ({ type = "NATIVE_COIN_PAGE", detail }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const tokenInfos = useRecoilValue(Tokens);

  const denomFormatter = useDenomFormater();

  const hasEventLogs = !isEmpty(detail.eventLogJson);
  const messages = detail.transactionMessages || [];

  const getMsgField = (keys: string[]) => {
    return keys.map(key => messages.find(msg => msg.key === key)?.value || "");
  };

  const renderName = () => {
    if (type === "NATIVE_COIN_PAGE") {
      const [from, to, amount] = getMsgField(["from", "to", "amount"]);
      return (
        <span>
          <Finder q="address" v={from}>
            {format.truncate(from, [6, 6])}
          </Finder>
          {` send ${format.amount(amount, 2)} ${denomFormatter(
            DEFAULT_CRYPTO,
          )} to `}
          <Finder q="address" v={to}>
            {format.truncate(to, [6, 6])}
          </Finder>
        </span>
      );
    }

    switch (detail.transactionType) {
      case "Transfer":
        const [from, to, amount] = getMsgField(["from", "to", "amount"]);

        const symbol = tokenInfos.find(
          token =>
            token.contract_address?.toLowerCase() ===
            detail.contractAddress?.toLowerCase(),
        )?.contract_name;

        return (
          <span>
            <Finder q="address" v={from}>
              {format.truncate(from, [6, 6])}
            </Finder>
            {` transfer ${format.amount(amount, 2)} ${denomFormatter(
              symbol || "",
            )} to `}
            <Finder q="address" v={to}>
              {format.truncate(to, [6, 6])}
            </Finder>
          </span>
        );
      case "DeployContract":
        const [contractAddress] = getMsgField(["contractAddress"]);
        return (
          <span>
            <Finder q="address" v={contractAddress}>
              {format.truncate(contractAddress, [6, 6])}
            </Finder>
            {` is deployed`}
          </span>
        );
      case "WhitelistedAddressAdded":
        const [addr] = getMsgField(["addr"]);
        return (
          <span>
            <Finder q="address" v={addr}>
              {format.truncate(addr, [6, 6])}
            </Finder>
            {` is whitelisted`}
          </span>
        );
      case "Distribute":
        const [disTo, dsAmount, message] = getMsgField([
          "to",
          "amount",
          "message",
        ]);

        const disSymbol = DEFAULT_CRYPTO;

        return (
          <span>
            {` distribute ${format.amount(dsAmount, 2)} ${denomFormatter(
              disSymbol || "",
            )} to `}
            <Finder q="address" v={disTo}>
              {format.truncate(disTo, [6, 6])}
            </Finder>
          </span>
        );
      case "MintForCustody":
        const [mintAmount] = getMsgField(["amount"]);
        const mintSymbol = DEFAULT_CRYPTO;

        return (
          <span>
            {` mint ${format.amount(mintAmount, 2)} ${denomFormatter(
              mintSymbol || "",
            )} to (CustodyContract) `}
            <Finder
              q="address"
              v={"0x0000000000000000000000000000000000007203"}
            >
              {format.truncate(
                "0x0000000000000000000000000000000000007203",
                [6, 6],
              )}
            </Finder>
          </span>
        );

      default:
        return <span>{detail.transactionType}</span>;
    }
  };

  return (
    <div className={s.msgBox}>
      <div className={cx(s.type, { show: isOpen })}>
        <div className={s.action}>{renderName()}</div>
      </div>

      <div className={s.details}>
        <div className={s.msgType}>{detail.transactionType}</div>
        {messages?.length > 0 && messages.map(msg => <MsgField data={msg} />)}
        {isOpen && (
          <MsgField
            data={{
              key: "event logs",
              value: <EventLogs eventLogs={detail.eventLogJson} />,
            }}
            noBorder
          />
        )}
        {hasEventLogs && (
          <div className={s.button}>
            <button
              className="btn btn-primary"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "Hide Logs" : "Show Logs"}
              {isOpen ? <ArrowUp /> : <ArrowDown />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MsgBox;
