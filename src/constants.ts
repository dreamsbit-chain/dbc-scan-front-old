export const ADDRESS_KEYS = ["from", "to", "addr", "contractAddress"];

export const INITIAL_TXS_PER_PAGE = 50;

export const TXS_PER_PAGE = 100;

export const DEFAULT_CRYPTO = "US2";

export const DEFAULT_FIAT = "USD";

export const DEFAULT_DECIMALS_PLACES = 6;

export const CHAINS = [
  {
    chainType: "DBC",
    chainName: "Gymfinity",
    rpcUrl: "https://dev-chain.test-us2.com",
    chainId: 1515,
    symbol: "US²",
    explorerUrl: "https://dev-scan-server.test-us2.com",
    iconUrl: "http://shorturl.at/rIMYZ",
  },
  {
    chainType: "DBC",
    chainName: "Inception",
    rpcUrl: "https://stg-chain.test-us2.com",
    chainId: 1516,
    symbol: "US²",
    explorerUrl: "https://stg-scan-server.test-us2.com",
    iconUrl: "http://shorturl.at/rIMYZ",
  },
];
