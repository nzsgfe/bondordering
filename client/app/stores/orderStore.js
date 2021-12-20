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

    this._loadOrdersRequest = null;
    this._loadOrdersUrl=  "http://127.0.0.1:3000/api/bond-orders";
    this._orders = [];
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
          errorMessage: "Oops something went wrong !"
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

      let failedCallBack = (data) => {
        this.emit(orderEvents.ORDER_LOAD_FAILED, {
          Type: orderEvents.ORDER_LOAD_FAILED,
          errorMessage: "Oops something went wrong !"
        });
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
