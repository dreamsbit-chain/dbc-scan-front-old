type AddressPageType =
  | "EOA_ADDRESS_PAGE"
  | "CONTRACT_ADDRESS_PAGE"
  | "VALIDATOR_ADDRESS_PAGE";

interface TokenAmount {
  key: string;
  value: any;
}

interface AddressBalance {
  coinAmount: string;
  tokenAmounts: TokenAmount[];
}

interface ContractAddress {
  address: string;
  name: string;
  contractType: string;
}

interface ValidatorAddress {
  address: string;
  name: string;
  upTime: number;
  status: ValidatorStatus;
}

type ValidatorStatus = "ACTIVE" | "INACTIVE";

interface AddressPage {
  addressPageType: AddressPageType;
  eoaAddress: {
    address: string;
    name: string;
    cryptoCurrency: AddressBalance;
  };
  contractAddress: ContractAddress;
  validatorAddress: ValidatorAddress;
}
