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
    this._addNewOrderUrl = "http://127.0.0.1:3000/api/bond-orders";

    this._loadOrdersRequest = null;
    this._loadOrdersUrl=  "http://127.0.0.1:3000/api/bond-orders";
    this._orders = [];
  }

  _addOrder = (payload) => {
    if (!webUtil.isAjaxRequestPending(this._addNewOrderRequest)) {

      this.emit(orderEvents.ORDER_ADD_PENDING);

      let successCallBack = (data) => {
        this.emit(orderEvents.ORDER_ADD_FINISHED, {
          bondOrderId: data.bondOrderId
        });
      };

      let failedCallBack = (errorResponse) => {
        this.emit(orderEvents.ORDER_ADD_FAILED, errorResponse);
      };
      
      payload.paymentDate = Moment(payload.paymentDate).format();
      payload.paymentExchangeRate = payload.paymentExchangeRate.toString();
      payload.bondValueInUSD = payload.bondValueInUSD.toString();
      payload.bondValueInSelectedCurrency = payload.bondValueInSelectedCurrency.toString();
      payload.actualValueInSelectedCurrency = payload.actualValueInSelectedCurrency.toString();
    
      this._addNewOrderRequest = webUtil.getAsyncDataByJsonType(
        this._addNewOrderUrl,
        payload,
        successCallBack,
        failedCallBack,
        false
      );
      
    }
  };

  _loadOrders = () => {
    if (!webUtil.isAjaxRequestPending(this._loadOrdersRequest)) {

      this.emit(orderEvents.ORDER_LOAD_PENDING);

      let successCallBack = (data) => {
        this._orders = data._embedded.bondOrders;
        this.emit(orderEvents.ORDER_LOAD_FINISHED);
      };

      let failedCallBack = (errorResponse) => {
        this.emit(orderEvents.ORDER_LOAD_FAILED, errorResponse);
      };      

      this._loadOrdersRequest = webUtil.getAsyncJsonData(
        this._loadOrdersUrl,
        successCallBack,
        failedCallBack
      );
    }
  };

  getOrders(){
    return this._orders;
  }

  _handleActions = (action) => {
    switch (action.type) {
      case "ORDER_ADD":
        this._addOrder(action.data);
        break;
      case "ORDER_LOAD":
          this._loadOrders(action.data);
          break;        
      default:
        break;
    }
  };
}

export default new orderStore();
