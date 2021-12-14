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
    "actualValueInSelectedCurrency": "0",
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
  newOrder.actualValueInSelectedCurrency = this.autoCorrectAmount(newOrder.actualValueInSelectedCurrency, true, 3);
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

export function validateActualBondValue(estimatedBondValue, actualBondValue) {
  return parseFloat(estimatedBondValue) > parseFloat(actualBondValue) || parseFloat(estimatedBondValue) < parseFloat(actualBondValue) ;
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
  }  

  //validationResult
  return {
    haveErrors: inputErrors.length !== 0,
    errors: inputErrors,
    hasError: (key) => inputErrors.filter(error => error.key === key),
    getErrorMessage: (key) => inputErrors.filter(error => error.key === key).pop()?.errorMsg
  };
}

export function autoCorrectAmount(input, allowDecimal, decimalPlaces = 2) {
  var result = input.toString();
  var integerPlaces = allowDecimal ? 10 : 12;

  if (allowDecimal) {

      //remove invalid characters
      result = result.replace(/[^.0-9]/g, '');

      //remove prefix '0';
      result = result.replace(/^0+(?=\d+)/g, '');

      //remove duplicated '.', 
      //NOTE: reverse() required for Regx positive-look-after
      result = result.split('').reverse().join('');
      result = result.replace(/\.(?=\d*\.)/g, '');
      result = result.split('').reverse().join('');

      //recover 'no integer part' issue e.g. '.123'
      result = result.replace(/^\./g, "0.");

      //truncate integer places
      var integerPart = result.toString().split(".")[0];
      integerPart = integerPart.substr(0, integerPlaces);

      //truncate decimal places
      var decimalPart = result.toString().split(".")[1] || "";
      decimalPart = decimalPart.substr(0, decimalPlaces);

      if(result.indexOf(".") > -1) {
          return integerPart + "." + decimalPart;                
      } else {
          return integerPart;
      }

  } else {

      //remove invalid characters
      result = result.replace(/[^0-9]/g, '');
      
      //remove prefix '0';
      result = result.replace(/^0+(?=\d+)/g, '');

      //truncate integer places
      result = result.substr(0, integerPlaces);
      return result;
  }
}