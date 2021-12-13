import currencyStore from "../stores/currencyStore";

export function getCurrencies() {
  return currencyStore.getCurrencies();
}

export function getBaseCurrency () {
  return "USD";
}

export function getExchangeRate(currencyCode) {
  let currencies = this.getCurrencies();
  let targetCurrency = currencies.filter(currency => currency.CurrencyCode.toUpperCase() === currencyCode.toUpperCase()).pop();
  return targetCurrency ? targetCurrency.ExchangeRate : 1;
}

/*
export function getCurrencies() {
  return [
    { CurrencyCode: "SGD", ExchangeRate: 1.37 },
    { CurrencyCode: "POUND", ExchangeRate: 0.76 },
    { CurrencyCode: "KYAT", ExchangeRate: 1787 },
    { CurrencyCode: "USD", ExchangeRate: 1 }
  ];
}
*/