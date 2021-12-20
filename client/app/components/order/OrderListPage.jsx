import React from "react";

//data layer
import orderStore from "../../stores/orderStore";
import * as orderActions from "../../actions/orderActions";
import { orderEvents } from "../../enums/eventsEmit";
import * as orderService from "../../services/orderService";

//components
import Loading from '../common/Loading';
import OrderList from './OrderList';

export default class OrderListPage extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    orderStore.on(orderEvents.ORDER_LOAD_PENDING, this._onLoadOrdersPending);
    orderStore.on(orderEvents.ORDER_LOAD_FAILED, this._onLoadOrdersFailed);
    orderStore.on(orderEvents.ORDER_LOAD_FINISHED, this._onLoadOrdersFinished);
    orderActions.loadOrders();
  }

  componentWillUnmount() {
    orderStore.off(orderEvents.ORDER_LOAD_PENDING, this._onLoadOrdersPending);
    orderStore.off(orderEvents.ORDER_LOAD_FAILED, this._onLoadOrdersFailed);
    orderStore.off(orderEvents.ORDER_LOAD_FINISHED, this._onLoadOrdersFinished);
  }

  _onLoadOrdersPending = () => {
    this.setState({ isLoading: true });
  }

  _onLoadOrdersFailed = () => {
    this.setState({ isLoading: false });
  }
  
  _onLoadOrdersFinished = () => {
    this.setState({ isLoading: false });
  }  

  render() {

    const { isLoading } = this.state;
    const orders = orderService.getOrders();

    console.log("OrderListPage.render");

    return (
      <React.Fragment>
        {isLoading && <Loading />}
        <OrderList orders={orders}/>
      </React.Fragment>
    );
  }
}
