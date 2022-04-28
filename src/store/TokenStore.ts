import { atom } from "recoil";

export const Tokens = atom<Token[]>({
  key: "TokenState",
  default: [],
});
