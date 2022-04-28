interface Token {
  id: number;
  contract_type: string;
  contract_name: string;
  deploy_status: string;
  tx_hash: string;
  contract_address: string;
  logo_url: string;
}

interface TokenResponse {
  tokenInfos: Token[];
}
