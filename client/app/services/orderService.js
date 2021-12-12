export function getCurrencies() {
  return [
    { CurrencyCode: "SGD", ExchangeRate: 1.37 },
    { CurrencyCode: "POUND", ExchangeRate: 0.76 },
    { CurrencyCode: "KYAT", ExchangeRate: 1787 },
    { CurrencyCode: "USD", ExchangeRate: 1 }
  ];
}

export function getBaseCurrency () {
  return "USD";
}

export function getExchangeRate(targetCurrencyCode, baseCurrencyCode = "USD") {
  let currencies = this.getCurrencies();
  let targetCurrency = currencies.filter(currency => currency.CurrencyCode.toUpperCase() === targetCurrencyCode.toUpperCase()).pop();
  return targetCurrency ? targetCurrency.ExchangeRate : 1;
}

export function getTotalBondValue(bonds, currency) {
  let totalValue = 0;
  bonds.map((bond) => { totalValue = totalValue + parseInt(bond.bondType) * bond.bondQty });
  return totalValue * this.getExchangeRate(currency);
}

export function getNewOrder() {

  /*
  {
    "buyerName": "John Doe",
    "buyerEmail": "name.contact@test.com",
    "paymentDate": "2021-11-13T00:00:00+08:00",
    "paymentCurrency": "SGD",
    "paymentExchangeRate": 1.30,
    "bondValueInUSD": 100,
    "bondValueInSelectedCurrency": 100,
    "actualValueInSelectedCurrency": 100,
    "bondQuantityDetails": [
      {"bondType": "100", "bondQty": 1},
      {"bondType": "500", "bondQty": 1},
      {"bondType": "1000", "bondQty": 1},
      {"bondType": "5000", "bondQty": 1},
    ]
  }
  */

  return {
    "buyerName": "",
    "buyerEmail": "",
    "paymentDate": new Date(),
    "paymentCurrency": "USD",
    "paymentExchangeRate": 1,
    "bondValueInUSD": 0,
    "bondValueInSelectedCurrency": 0,
    "actualValueInSelectedCurrency": null,
    "bondQuantityDetails": [
      {"bondType": "100", "bondQty": 0},
      {"bondType": "500", "bondQty": 0},
      {"bondType": "1000", "bondQty": 0},
      {"bondType": "5000", "bondQty": 0},
    ]
  }
}

export function updateNewOrder(newOrder) {
  newOrder.paymentExchangeRate = this.getExchangeRate(newOrder.paymentCurrency);
  newOrder.bondValueInUSD = this.getTotalBondValue(newOrder.bondQuantityDetails, this.getBaseCurrency());
  newOrder.bondValueInSelectedCurrency = this.getTotalBondValue(newOrder.bondQuantityDetails, newOrder.paymentCurrency);
  return newOrder;
}

export function validateBuyerName(newOrder){
  return newOrder.buyerName.trim() !== "";
}