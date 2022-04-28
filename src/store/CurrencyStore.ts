import { atom } from "recoil";

export const Currencies = atom<CurrencyRatioResponse>({
  key: "CurrencyState",
  default: { conversionRatios: [] },
});
