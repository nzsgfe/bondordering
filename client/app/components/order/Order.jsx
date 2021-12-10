import React from "react";
import orderStore from "../../stores/orderStore";
import * as orderActions from "../../actions/orderActions";
import { orderEvents } from "../../enums/EventsEmit";

export default class Order extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    orderStore.on(orderEvents.ORDER_ADD_PENDING, this._addOrderPending);
    orderStore.on(orderEvents.ORDER_ADD_FINISHED, this._addOrderFinished);
    orderStore.on(orderEvents.ORDER_ADD_FAILED, this._addOrderFailed);
  }

  componentWillUnmount() {
    orderStore.removeListener(
      orderEvents.ORDER_ADD_PENDING,
      this._addOrderPending
    );
    orderStore.removeListener(
      orderEvents.ORDER_ADD_FINISHED,
      this._addOrderFinished
    );
    orderStore.removeListener(
      orderEvents.ORDER_ADD_FAILED,
      this._addOrderFailed
    );
  }

  _addOrder = () => {
    orderActions.add("", "");
  };

  _addOrderPending = () => {
    alert("add order pending");
  };

  _addOrderFailed = () => {
    alert("add order failed");
  };

  _addOrderFinished = () => {
    alert("add order finished");
  };

  _balanceChange = () => {
    this.forceUpdate();
  };

  render() {
    return (
      <div>
        <input type="button" value="Add Order" onClick={this._addOrder} />
      </div>
    );
  }
}
