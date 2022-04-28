## **Configurations**
All configs are stored in "src/constants.ts":

- **ADDRESS_KEYS**: Array of tx detail fields that will be converted to hyperlink
- **INITIAL_TXS_PER_PAGE**: Maximum number of txs in the first page
- **TXS_PER_PAGE**: Maximum number of txs in next page when clicking see more button
- **DEFAULT_CRYPTO**, **DEFAULT_FIAT**: Default crypto and currency's name
- **DEFAULT_DECIMALS_PLACES**: Number of decimal places that an USD amount (exchanged from native coin) will be rounded to
- **CHAINS**: Array of chains info
    - **chainName**: Chain name
    - **chainId**: Chain ID
    - **symbol**: How **DEFAULT_CRYPTO** will be formatted (ex: "US2" to "US²")
    - **explorerUrl**: Backend scan server URL
    
## **Local development**

```sh
npm install
npm start
```

## **Build**

```sh
docker-compose up -d --build
```
