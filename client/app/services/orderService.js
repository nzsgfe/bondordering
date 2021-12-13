import * as currencyService from "../services/currencyService";

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

export function getTotalBondValue(bonds, currencyExchangeRate) {
  let totalValue = 0;
  bonds.map((bond) => { totalValue = totalValue + parseInt(bond.bondType) * bond.bondQty });
  return totalValue * currencyExchangeRate;
}

export function updateNewOrder(newOrder) {
  newOrder.paymentExchangeRate = currencyService.getExchangeRate(newOrder.paymentCurrency);
  newOrder.bondValueInUSD = this.getTotalBondValue(newOrder.bondQuantityDetails, currencyService.getExchangeRate("USD"));
  newOrder.bondValueInSelectedCurrency = this.getTotalBondValue(newOrder.bondQuantityDetails, newOrder.paymentExchangeRate);
  return newOrder;
}

export function validateBuyerName(name){
  return name.trim() !== "";
}

export function validateEmail(email){
  const regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return regex.test(email.toLowerCase());
}

export function validateBondQuantityDetails(bondQuantityDetails) {
  return false;
}

export function validateTotalBondQuantity(bondQuantityDetails) {
  let minBondQty = 1;
  return bondQuantityDetails.map(bond => bond.bondQty).reduce((a, b) => a + b, 0) >= minBondQty;
}