import React from "react";

import orderStore from "../../stores/orderStore";
import currencyStore from "../../stores/currencyStore";

import * as orderActions from "../../actions/orderActions";
import * as currencyActions from "../../actions/currencyActions";

import { orderEvents, currencyEvents } from "../../enums/eventsEmit";
import * as orderService from "../../services/orderService";
import * as currencyService from "../../services/currencyService";

import OrderDetail from './OrderDetail';
import Loading from '../common/Loading';
import MessageDialog from '../common/MessageDialog';

export default class Order extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      newOrder: orderService.getNewOrder(),
      validationResult: null,
      message: null
    };
  }

  componentDidMount() {
    orderStore.on(orderEvents.ORDER_ADD_PENDING, this._onAddOrderPending);
    orderStore.on(orderEvents.ORDER_ADD_FAILED, this._onAddOrderFailed);
    orderStore.on(orderEvents.ORDER_ADD_FINISHED, this._onAddOrderFinished);
    currencyStore.on(currencyEvents.CURRENCY_GET_PENDING, this._onGetCurrenciesPending);
    currencyStore.on(currencyEvents.CURRENCY_GET_FAILED, this._onGetCurrenciesFailed);
    currencyStore.on(currencyEvents.CURRENCY_GET_FINISHED, this._onGetCurrenciesFinished);

    currencyActions.getCurrencies({ "dateTime": this.state.newOrder.paymentDate });
  }

  componentWillUnmount() {
    orderStore.off(orderEvents.ORDER_ADD_PENDING, this._onAddOrderPending);
    orderStore.off(orderEvents.ORDER_ADD_FAILED, this._onAddOrderFailed);
    orderStore.off(orderEvents.ORDER_ADD_FINISHED, this._onAddOrderFinished);
    currencyStore.off(currencyEvents.CURRENCY_GET_PENDING, this._onGetCurrenciesPending);
    currencyStore.off(currencyEvents.CURRENCY_GET_FAILED, this._onGetCurrenciesFailed);
    currencyStore.off(currencyEvents.CURRENCY_GET_FINISHED, this._onGetCurrenciesFinished);
  }

  _onAddNewOrder = () => {

    let validationResult = orderService.validateNewOrder(this.state.newOrder);

    if (validationResult.haveErrors) {
      this.setState({ validationResult: validationResult });
    } else {
      if(orderService.validateActualBondValue(this.state.newOrder.bondValueInSelectedCurrency, this.state.newOrder.actualValueInSelectedCurrency)){
        orderActions.addNewOrder(this.state.newOrder);
      }else{
        this.setState({ 
          message: {
            title: "Warning!",
            details: "Actual Bond Value not equivalent to Bond Value. Are you sure you want to proceed ?",
            messageType: "warning-message",
            onConfirm: (e) => orderActions.addNewOrder(this.state.newOrder),
            onCancel: this._onCloseMessageBox
          }
        });
      }
    }
  }

  _onChangeNewOrder = (newOrder) => {
    this.setState({ newOrder: orderService.updateNewOrder(newOrder) });
  }

  _onAddOrderPending = () => {
    this.setState({ isLoading: true });
  };

  _onAddOrderFailed = (data) => {
    this.setState({ 
      isLoading: false,
      message: {
        title: "Add Order Failed!",
        details: data.errorMessage,
        messageType: "error-message",
        onConfirm: this._onCloseMessageBox,
        onCancel: null
      }
    });
  };

  _onAddOrderFinished = (data) => {
    this.setState({
      isLoading: false,
      validationResult: null,
      message: {
        title: "Add Order Successful!",
        details: "OrderId created: " + data.bondOrderId,
        messageType: "success-message",
        onConfirm: this._onClearOrder,
        onCancel: null
      }
    });
  };

  _onClearOrder = () => {
    this.setState({
      isLoading: false,
      newOrder: orderService.getNewOrder(),
      validationResult: null,
      message: null
    });
  }

  _onChangePaymentDate = (newOrder) => {
    this.setState({ newOrder: newOrder });
    currencyActions.getCurrencies({ "dateTime": newOrder.paymentDate });
  }

  _onGetCurrenciesPending = () => {
    this.setState({ isLoading: true });
  };

  _onGetCurrenciesFailed = (data) => {
    this.setState({ 
      isLoading: true,
      message: {
        title: "Oops could not retrieve currency info",
        details: data.errorMessage,
        messageType: "error-message",
        onConfirm: this._onCloseMessageBox,
        onCancel: null
      }      
    });
  };

  _onGetCurrenciesFinished = (data) => {
    this.setState({
      isLoading: false,
      newOrder: orderService.updateNewOrder(this.state.newOrder)
    });
  };

  _onCloseMessageBox = () => {
    this.setState({
      message: null
    })
  }

  render() {
    const currencies = currencyService.getCurrencies();
    const {
      newOrder,
      isLoading,
      validationResult,
      message
    } = this.state;

    return (
      <React.Fragment>
        {isLoading &&
          <Loading />
        }
        {message &&
          <MessageDialog
            closeMessageBox={this._closeErrorDialog}
            title={message.title}
            details={message.details}
            onConfirm={message.onConfirm}
            onCancel={message.onCancel}
            messageType={message.messageType}
            isWarning={false}
            isSuccess={false} />
        }        
        <OrderDetail newOrder={newOrder}
          currencies={currencies}
          validationResult={validationResult}
          onChangeNewOrder={this._onChangeNewOrder}
          onAddNewOrder={this._onAddNewOrder}
          onChangePaymentDate={this._onChangePaymentDate}
          onClearOrder={this._onClearOrder} />
      </React.Fragment>
    );
  }
}
