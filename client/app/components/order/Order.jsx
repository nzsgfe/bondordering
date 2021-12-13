import React from "react";
import orderStore from "../../stores/orderStore";
import * as orderActions from "../../actions/orderActions";
import { orderEvents } from "../../enums/eventsEmit";
import * as orderService from "../../services/orderService";
import OrderDetail from './OrderDetail';
import Loading from '../common/Loading';

export default class Order extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      newOrder: orderService.getNewOrder()
    };
  }

  componentDidMount() {
    orderStore.on(orderEvents.ORDER_ADD_PENDING, this._onAddOrderPending);
    orderStore.on(orderEvents.ORDER_ADD_FAILED, this._onAddOrderFailed);
    orderStore.on(orderEvents.ORDER_ADD_FINISHED, this._onAddOrderFinished);
  }

  componentWillUnmount() {
    orderStore.off(orderEvents.ORDER_ADD_PENDING, this._onAddOrderPending);
    orderStore.off(orderEvents.ORDER_ADD_FAILED, this._onAddOrderFailed);
    orderStore.off(orderEvents.ORDER_ADD_FINISHED, this._onAddOrderFinished);
  }

  _onAddNewOrder = () => {
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
    alert(data.errorMessage);
  };

  _onAddOrderFinished = (data) => {
    this.setState({isLoading: false});
    alert(data.bondOrderId);
  };

  _onClearOrder = () => {
    this.setState({newOrder: orderService.getNewOrder()});
  }

  render() {
    const currencies = orderService.getCurrencies();
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
                        onClearOrder={this._onClearOrder} />
        </React.Fragment>
    );
  }
}
