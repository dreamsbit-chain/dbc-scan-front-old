import { format } from "date-fns-tz";
import distanceInWordsToNow from "date-fns/formatDistanceToNow";
import isBase64 from "is-base64";

export function getEndpointByPageType(pageType: PageType, query: string) {
  switch (pageType) {
    case "TRANSACTION_PAGE":
      return `/tx/${query}`;
    case "ADDRESS_PAGE":
      return `/address/${query}`;
    default:
      return `/blocks/${query}`;
  }
}

export function fromUnixTimestamp(timestamp: string | number) {
  return format(new Date(Number(timestamp) * 1000), `yyyy.MM.dd HH:mm:ssXXX`);
}

export function fromNow(time: number) {
  return distanceInWordsToNow(new Date(time * 1000));
}

export function sliceMsgType(msg: string) {
  if (!msg || typeof msg === "object") return "unknown msg";
  const msgResult = String(msg);
  const slashIndex = msgResult.indexOf("/");
  return slashIndex > -1 ? msgResult.slice(slashIndex + 1) : msgResult;
}

export function prependProtocol(url: string) {
  if (url.indexOf("http") > -1) {
    return url;
  } else {
    return `http://` + url;
  }
}

export function decodeBase64(str: string) {
  try {
    if (isBase64(str)) {
      return Buffer.from(str, "base64").toString();
    }

    return str;
  } catch {
    return str;
  }
}

export function isJson(param: any) {
  try {
    JSON.parse(param);
    return true;
  } catch {
    return false;
  }
}
