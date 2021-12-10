import { EventEmitter } from "events";
import dispatcher from "../utilities/dispatcher";
import webUtil from "../utilities/webUtil";
import { orderEvents } from "../enums/eventsEmit";

class orderStore extends EventEmitter {
  constructor() {
    super();
    dispatcher.register(this._handleActions);

    this._addNewOrderRequest = null;
    this._addNewOrderUrl = null;
  }

  _addOrder = (payload) => {
    if (!webUtil.isAjaxRequestPending(this._addNewOrderRequest)) {
      this.emit(orderEvents.ORDER_ADD_PENDING, {
        Type: orderEvents.ORDER_ADD_PENDING,
        Data: {}
      });

      let successCallBack = (data) => {
        this.emit(orderEvents.ORDER_ADD_FINISHED, {
          Type: orderEvents.ORDER_ADD_FINISHED,
          Data: {}
        });
      };

      let failedCallBack = (data) => {
        this.emit(orderEvents.ORDER_ADD_FAILED, {
          Type: orderEvents.ORDER_ADD_FAILED,
          Data: {}
        });
      };

      this.emit(orderEvents.ORDER_ADD_FINISHED, {
        Type: orderEvents.ORDER_ADD_FINISHED,
        Data: {}
      });

      /*
      this._addNewOrderRequest = webUtil.getAsyncDataByJsonType(
        this._addNewOrderUrl,
        payload,
        successCallBack,
        failedCallBack,
        true
      );
      */
    }
  };

  _handleActions = (action) => {
    switch (action.type) {
      case "ORDER_ADD":
        this._addOrder();
        break;
      case "ORDER_EDIT":
        this._editOrder();
        break;
      default:
        break;
    }
  };
}

export default new orderStore();
