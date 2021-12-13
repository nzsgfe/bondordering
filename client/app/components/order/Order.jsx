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

export default class Order extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      newOrder: orderService.getNewOrder()
    };
  }

  componentDidMount() {
    orderStore.on(orderEvents.ORDER_ADD_PENDING, this._onAddOrderPending);
    orderStore.on(orderEvents.ORDER_ADD_FAILED, this._onAddOrderFailed);
    orderStore.on(orderEvents.ORDER_ADD_FINISHED, this._onAddOrderFinished);
    currencyStore.on(currencyEvents.CURRENCY_GET_PENDING, this._onGetCurrenciesPending);
    currencyStore.on(currencyEvents.CURRENCY_GET_FAILED, this._onGetCurrenciesFailed);
    currencyStore.on(currencyEvents.CURRENCY_GET_FINISHED, this._onGetCurrenciesFinished);

    currencyActions.getCurrencies({"dateTime": "newOrder.paymentDate"});
  }

  componentWillUnmount() {
    orderStore.off(orderEvents.ORDER_ADD_PENDING, this._onAddOrderPending);
    orderStore.off(orderEvents.ORDER_ADD_FAILED, this._onAddOrderFailed);
    orderStore.off(orderEvents.ORDER_ADD_FINISHED, this._onAddOrderFinished);
    currencyStore.off(currencyEvents.CURRENCY_GET_PENDING, this._onGetCurrenciesPending);
    currencyStore.off(currencyEvents.CURRENCY_GET_FAILED, this._onGetCurrenciesFailed);
    currencyStore.off(currencyEvents.CURRENCY_GET_FINISHED, this._onGetCurrenciesFinished);    
  }

  _onAddNewOrder = (newOrder) => {
    orderActions.addNewOrder(this.state.newOrder);
  }

  _onChangeNewOrder = (newOrder) => {
    this.setState({newOrder: orderService.updateNewOrder(newOrder)});
  }

  _onAddOrderPending = () => {
    this.setState({isLoading: true});
  };

  _onAddOrderFailed = (data) => {
    this.setState({isLoading: false});
    window.setTimeout(alert(data.errorMessage), 0);
  };

  _onAddOrderFinished = (data) => {
    this.setState({isLoading: false});
    window.setTimeout(alert(data.bondOrderId), 0);
  };

  _onClearOrder = () => {
    this.setState({newOrder: orderService.getNewOrder()});
  }

  _onChangePaymentDate = (newOrder) => {
    this.setState({newOrder: newOrder});
    currencyActions.getCurrencies({"dateTime": "newOrder.paymentDate"});
  }

  _onGetCurrenciesPending = () => {
    this.setState({isLoading: true});
  };

  _onGetCurrenciesFailed = (data) => {
    this.setState({isLoading: true});
    window.setTimeout(alert(data.errorMessage), 0);
  };

  _onGetCurrenciesFinished = (data) => {
    this.setState({
      isLoading: false,
      newOrder: orderService.updateNewOrder(this.state.newOrder)
    });
  };  

  render() {
    const currencies = currencyService.getCurrencies();
    const {
      newOrder,
      isLoading,
    } = this.state;

    return (
        <React.Fragment>
            {isLoading &&
                <Loading />
            }
            <OrderDetail newOrder={newOrder}
                        currencies={currencies} 
                        isLoading={isLoading} 
                        onChangeNewOrder={this._onChangeNewOrder}
                        onAddNewOrder={this._onAddNewOrder}
                        onChangePaymentDate={this._onChangePaymentDate}
                        onClearOrder={this._onClearOrder} />
        </React.Fragment>
    );
  }
}
