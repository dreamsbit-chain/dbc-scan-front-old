interface SearchResult {
  pageType: PageType;
  blockPage: BlockPage;
  transactionPage: TxPage;
  addressPage: AddressPage;
}

type PageType = "BLOCK_PAGE" | "TRANSACTION_PAGE" | "ADDRESS_PAGE";
