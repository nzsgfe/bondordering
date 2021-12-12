import React from "react";
import orderStore from "../../stores/orderStore";
import * as orderActions from "../../actions/orderActions";
import { orderEvents } from "../../enums/eventsEmit";
import * as orderService from "../../services/orderService";

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

  _onAddNewOrder = (newOrder) => {
    orderActions.addNewOrder(newOrder);
  }

  _onChangeNewOrder = (newOrder) => {
    this.setState({newOrder: orderService.updateNewOrder(newOrder)});
  }

  _onChangePaymentDate = (newOrder) => {
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

    let newOrder = this.state.newOrder;
    console.log(newOrder);

    return (
      <div>
        <input type="button" value="Add Order" onClick={e => {this._onAddNewOrder(newOrder)}} />
        <input type="button" value="Add Order" onClick={newOnChangeNewOrder} />
      </div>
    );
  }
}
