import { EventEmitter } from "events";
import dispatcher from "../utilities/dispatcher";
import webUtil from "../utilities/webUtil";
import { orderEvents } from "../enums/eventsEmit";
import Moment from "moment";

class orderStore extends EventEmitter {
  constructor() {
    super();
    dispatcher.register(this._handleActions);

    this._addNewOrderRequest = null;
    this._addNewOrderUrl = "http://127.0.0.1:3000/addneworder";
  }

  _addOrder = (payload) => {
    if (!webUtil.isAjaxRequestPending(this._addNewOrderRequest)) {

      this.emit(orderEvents.ORDER_ADD_PENDING, {
        Type: orderEvents.ORDER_ADD_PENDING,
        Data: null
      });

      let successCallBack = (data) => {
        this.emit(orderEvents.ORDER_ADD_FINISHED, {
          Type: orderEvents.ORDER_ADD_FINISHED,
          bondOrderId: data.bondOrderId
        });
      };

      let failedCallBack = (data) => {
        this.emit(orderEvents.ORDER_ADD_FAILED, {
          Type: orderEvents.ORDER_ADD_FAILED,
          errorMessage: "something got wrong !"
        });
      };
      
      payload.paymentDate = Moment(payload.paymentDate).format();
      //payload.paymentExchangeRate = parseFloat(payload.paymentExchangeRate);
      //payload.bondValueInUSD = parseFloat(payload.bondValueInUSD);
      //payload.bondValueInSelectedCurrency = parseFloat(payload.bondValueInSelectedCurrency);
      payload.actualValueInSelectedCurrency = parseFloat(payload.actualValueInSelectedCurrency);
    
      this._addNewOrderRequest = webUtil.getAsyncDataByJsonType(
        this._addNewOrderUrl,
        payload,
        successCallBack,
        failedCallBack,
        true
      );
      
    }
  };

  _handleActions = (action) => {
    switch (action.type) {
      case "ORDER_ADD":
        this._addOrder(action.data);
        break;
      default:
        break;
    }
  };
}

export default new orderStore();
