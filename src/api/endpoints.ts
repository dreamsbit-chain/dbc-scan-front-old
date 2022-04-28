export const SEARCH_ENDPOINT = "/scan/search";
export const TRANSACTIONS_ENPOINT = (address: string) =>
  `/scan/search/addresses/${address}/transactions`;
export const TOKEN_INFOS_ENDPOINT = "/contract/token/metadata";
export const CURRENCY_RATIO_ENDPOINT = "/currency/conversion_ratio";
