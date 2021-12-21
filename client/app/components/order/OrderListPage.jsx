import React from "react";

//data layer
import orderStore from "../../stores/orderStore";
import * as orderActions from "../../actions/orderActions";
import { orderEvents } from "../../enums/eventsEmit";
import * as orderService from "../../services/orderService";

//components
import Loading from '../common/Loading';
import OrderList from './OrderList';
import MessageDialog from '../common/MessageDialog';

export default class OrderListPage extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      message: null
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

  _onLoadOrdersFailed = (error) => {
    this.setState({ 
      isLoading: false,
      message: {
        title: error.title + " " + error.status,
        details: error.detail,
        messageType: "error-message",
        onConfirm: this._onCloseMessageBox,
        onCancel: null
      }      
    });
  }
  
  _onLoadOrdersFinished = () => {
    this.setState({ isLoading: false });
  }

  _onCloseMessageBox = () => {
    this.setState({
      message: null
    })
  }  

  render() {

    const { isLoading, message } = this.state;
    const orders = orderService.getOrders();

    console.log("OrderListPage.render");

    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {message &&
          <MessageDialog
            title={message.title}
            details={message.details}
            onConfirm={message.onConfirm}
            onCancel={message.onCancel}
            messageType={message.messageType}
            isWarning={false}
            isSuccess={false} />
        } 
        <OrderList orders={orders}/>
      </React.Fragment>
    );
  }
}
