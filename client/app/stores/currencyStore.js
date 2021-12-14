import { EventEmitter } from "events";
import dispatcher from "../utilities/dispatcher";
import webUtil from "../utilities/webUtil";
import { currencyEvents } from "../enums/eventsEmit";
import Moment from "moment";

class currencyStore extends EventEmitter {
  constructor() {
    super();
    dispatcher.register(this._handleActions);

    this._getCurrenciesRequest = null;
    this._getCurrenciesApiUrl = "http://127.0.0.1:3000/getcurrencies";
    this._currencies = [{CurrencyCode: "USD", ExchangeRate: 1}];
  }

  _getCurrencies = (payload) => {
    if (!webUtil.isAjaxRequestPending(this._getCurrenciesRequest)) {

      this.emit(currencyEvents.CURRENCY_GET_PENDING);

      let successCallBack = (data) => {
        this._currencies = data;
        this.emit(currencyEvents.CURRENCY_GET_FINISHED);
      };

      let failedCallBack = (data) => {
        this.emit(currencyEvents.CURRENCY_GET_FAILED, {
          Type: currencyEvents.CURRENCY_GET_FAILED,
          errorMessage: "could not retrieve currencies !"
        });
      };
      
      payload.dateTime = Moment(payload.dateTime).format();

      this._getCurrenciesRequest = webUtil.getAsyncDataByJsonType(
        this._getCurrenciesApiUrl,
        payload,
        successCallBack,
        failedCallBack,
        true
      );
      
    }
  };

  getCurrencies(){
      return this._currencies;
  }

  _handleActions = (action) => {
    switch (action.type) {
      case "CURRENCY_GET":
        this._getCurrencies(action.data);
        break;
      default:
        break;
    }
  };
}

export default new currencyStore();
