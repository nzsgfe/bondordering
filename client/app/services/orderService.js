import * as currencyService from "../services/currencyService";
import * as dateTimeHelper from "../utilities/dateTimeHelper";
import * as numberHelper from "../utilities/numberHelper";
import orderStore from "../stores/orderStore";

export function getNewOrder() {

  let paymentCurrency = currencyService.getBaseCurrency();;
  let paymentExchangeRate = currencyService.getExchangeRate(paymentCurrency);

  
  return {
    "buyerName": "",
    "buyerEmail": "",
    "paymentDate": new Date(),
    "paymentCurrency": paymentCurrency,
    "paymentExchangeRate": paymentExchangeRate,
    "bondValueInUSD": 0,
    "bondValueInSelectedCurrency": 0,
    "actualValueInSelectedCurrency": 0,
    "bondQuantityDetails": [
      {"bondType": "100", "bondQty": 0},
      {"bondType": "500", "bondQty": 0},
      {"bondType": "1000", "bondQty": 0},
      {"bondType": "5000", "bondQty": 0},
    ]
  }
  
  /*
  return {
    "buyerName": "John Doe",
    "buyerEmail": "name.contact@test.com",
    "paymentDate": "2021-11-13T00:00:00+08:00",
    "paymentCurrency": paymentCurrency,
    "paymentExchangeRate": paymentExchangeRate,
    "bondValueInUSD": 100,
    "bondValueInSelectedCurrency": 0,
    "actualValueInSelectedCurrency": 100,
    "bondQuantityDetails": [
      {"bondType": "100", "bondQty": 1},
      {"bondType": "500", "bondQty": 0},
      {"bondType": "1000", "bondQty": 0},
      {"bondType": "5000", "bondQty": 0},
    ]
  }
  */
  
}

export function getTotalBondValue(bonds, currencyExchangeRate) {
  let totalValue = 0;
  bonds.map((bond) => { totalValue = totalValue + parseInt(bond.bondType) * bond.bondQty });
  return numberHelper.multiply(totalValue, currencyExchangeRate);
}

export function updateNewOrder(newOrder) {
  newOrder.paymentExchangeRate = currencyService.getExchangeRate(newOrder.paymentCurrency);
  newOrder.bondValueInUSD = this.getTotalBondValue(newOrder.bondQuantityDetails, currencyService.getExchangeRate("USD"));
  newOrder.bondValueInSelectedCurrency = this.getTotalBondValue(newOrder.bondQuantityDetails, newOrder.paymentExchangeRate);
  newOrder.actualValueInSelectedCurrency = numberHelper.autoCorrectAmount(newOrder.actualValueInSelectedCurrency, true, 3);
  return newOrder;
}

export function validateBuyerName(name){
  return name.trim() !== "";
}

export function validateEmail(email){
  const regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return regex.test(email.toLowerCase());
}

export function validateTotalBondQuantity(bondQuantityDetails) {
  let minBondQty = 1;
  return bondQuantityDetails.map(bond => bond.bondQty).reduce((a, b) => a + b, 0) >= minBondQty;
}

export function validateMaxBondQuantity(bondQuantityDetails) {
  return bondQuantityDetails.filter(bond => parseInt(bond.bondQty) > 9999).length == 0;
}

export function validateActualBondValue(newOrder) {
  return numberHelper.equals(newOrder.bondValueInSelectedCurrency, newOrder.actualValueInSelectedCurrency);
}

export function validateNewOrder(newOrder) {
  let inputErrors = []; //{key: "name", errorMsg: "invalid"}; 

  if(!validateBuyerName(newOrder.buyerName)) {
    inputErrors.push({key: "buyerName", errorMsg: "Enter name"});
  }

  if(!this.validateEmail(newOrder.buyerEmail)) {
    inputErrors.push({key: "buyerEmail", errorMsg: "Enter valid email format e.g. name@mail.com"});
  }

  if(!this.validateTotalBondQuantity(newOrder.bondQuantityDetails)) {
    inputErrors.push({key: "bondQuantityDetails", errorMsg: "Fill minimum 1 Qty for at least one bond type"});
  } else if(!this.validateMaxBondQuantity(newOrder.bondQuantityDetails)) {
    inputErrors.push({key: "bondQuantityDetails", errorMsg: "Max Qty 9999"});
  }

  if(!parseFloat(newOrder.actualValueInSelectedCurrency) || parseFloat(newOrder.actualValueInSelectedCurrency) <= 0) {
    inputErrors.push({key: "actualValueInSelectedCurrency", errorMsg: "Enter value"});
  }  

  //validationResult
  return {
    haveErrors: inputErrors.length !== 0,
    errors: inputErrors,
    hasError: (key) => inputErrors.filter(error => error.key === key),
    getErrorMessage: (key) => inputErrors.filter(error => error.key === key).pop()?.errorMsg
  };
}

export function getOrders() {

  const orders = orderStore.getOrders();

  return orders.map(order => {return {
    "orderId": order.bondOrderId,
    "buyerName": order.buyerName,
    "paymentDateFormatted": dateTimeHelper.formatDateTimeStr(order.paymentDate, "yyyy-MM-DD"),
    "paymentCurrency": order.paymentCurrency,
    "bondValueInUSDFormatted": numberHelper.formatMoney(order.bondValueInUSD, 0),
    "actualValueInSelectedCurrencyFormatted": numberHelper.formatMoney(order.actualValueInSelectedCurrency, 3),
    "submittedDateFormatted": dateTimeHelper.formatDateTimeStr(order.submittedDate, "yyyy-MM-DD"),
    "status": order.bondOrderStatus    
  }});
}
