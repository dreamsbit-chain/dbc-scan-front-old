interface CurrencyRatio {
  fromCryptoName: string;
  fiatName: string;
  ratio: number;
}

interface CurrencyRatioResponse {
  conversionRatios: CurrencyRatio[];
}

interface CryptoToken {
  name: string;
  value: string;
}
