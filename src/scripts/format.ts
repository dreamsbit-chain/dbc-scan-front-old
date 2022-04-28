import BigNumber from "bignumber.js";
import { DateTime } from "luxon";

const fmt = {
  decimalSeparator: ".",
  groupSeparator: ",",
  groupSize: 3,
};
const formatDecimal = (number: BigNumber.Value): string =>
  new BigNumber(number).decimalPlaces(6, BigNumber.ROUND_DOWN).toFixed(6);

const formatAmount = (
  amount: BigNumber.Value,
  decimals?: number | null,
): string => {
  const bn = new BigNumber(amount);

  if (decimals === null || decimals === undefined) return bn.toFormat(fmt);
  return bn.toFormat(decimals, BigNumber.ROUND_DOWN, fmt);
};

const format = {
  decimal: formatDecimal,
  amount: formatAmount,
  date: (param: string | Date): string => {
    const dt =
      typeof param === "string"
        ? DateTime.fromISO(param)
        : DateTime.fromJSDate(param);

    const formatted = dt
      .setLocale("en")
      .toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);

    return param ? formatted + ` (${dt.offsetNameShort || "Local"})` : "";
  },

  gas: (gas: string) => {
    const parts = gas.split("/");
    return parts.map(part => formatAmount(part, null)).join("/");
  },

  truncate: (address: string = "", [h, t]: number[]) => {
    const head = address.slice(0, h);
    const tail = address.slice(-1 * t, address.length);
    return !address
      ? ""
      : address.length > h + t
      ? [head, tail].join("…")
      : address;
  },
};

export default format;
