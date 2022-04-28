interface ChainOption {
  chainType: string;
  chainName: string;
  rpcUrl: string;
  chainId: number;
  symbol?: string;
  explorerUrl?: string | null;
  iconUrl?: string;
}
