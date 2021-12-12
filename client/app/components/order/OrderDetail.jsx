import React from "react";
import orderStore from "../../stores/orderStore";
import * as orderActions from "../../actions/orderActions";
import { orderEvents } from "../../enums/EventsEmit";
import DateTimePicker from '../common/DateTimePicker';
import Moment from "moment";

export default class OrderDetail extends React.Component {
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
    let minDate = Moment().subtract(29, "days")
                          .hour(0)
                          .minute(0)
                          .second(0)
                          .millisecond(0)
                          .toDate();
    let maxDate = Moment().hour(23)
                          .minute(59)
                          .second(59)
                          .millisecond(999)
                          .toDate();
    let startDate = Moment().format("MM/DD/YYYY");
    
    return (
      <React.Fragment>
        <div className="header-portal">
            <div className="top-header-portal">Agent Portal</div>
            <div className="bottom-header-portal">United Bonds</div>
        </div>
        <div className="body-portal">
            <div className="bond-order-header">Information about bond</div>
            <div className="bond-info-row1">
                <div className="bond-info-row1-name">
                    <div className="buyer-name-info">Buyer Name</div>
                    <div className="buyer-name-info">
                        <input className="input-style" type="text" id="buyerName" />
                    </div>
                </div>
                <div className="bond-info-row1-date">
                    <div className="payment-date-info">Date of Payment</div>
                    <div className="payment-date-info">
                        <DateTimePicker minDate={minDate} maxDate={maxDate} startDate={startDate} classes="input-style" />
                    </div>
                </div>
            </div>
            <div className="bond-info-row2">
                <div className="buyer-email-style">Buyer Email</div>
                <div className="buyer-email-style">
                    <input className="input-style" type="text" id="email" required
                        oninvalid="this.setCustomValidity('User ID is a must')" />
                </div>
            </div>
            <div className="bond-info-row3">
                <div className="bond-selection-header">Bond Quantities</div>
                <div className="bond-selection">
                    <div className="bond-selection-single">
                        <div className="single-selection-info">$ 100 Bond</div>
                        <div className="single-selection-info">
                            <input className="input-style" type="number" id="quantity" name="quantity" min="0" />
                        </div>
                    </div>
                    <div className="bond-selection-single">
                        <div className="single-selection-info">$ 500 Bond</div>
                        <div className="single-selection-info">
                            <input className="input-style" type="number" id="quantity" name="quantity" min="0" />
                        </div>
                    </div>
                    <div className="bond-selection-single">
                        <div className="single-selection-info">$ 1000 Bond</div>
                        <div className="single-selection-info">
                            <input className="input-style" type="number" id="quantity" name="quantity" min="0" />
                        </div>
                    </div>
                    <div className="bond-selection-single">
                        <div className="single-selection-info">$ 5000 Bond</div>
                        <div className="single-selection-info">
                            <input className="input-style" type="number" id="quantity" name="quantity" min="0" />
                        </div>
                    </div>
                </div>
                <div className="total-amount-selection">
                    <div className="total-amount-single">
                        <div className="total-amount-info">Total Amount in USD</div>
                        <div className="total-amount-info">
                            <input className="input-style" type="text" id="totalAmount" value="1000" disabled />
                        </div>
                    </div>
                    <div className="total-amount-single">
                        <div className="total-amount-info">Total Amount Received</div>
                        <div className="total-amount-info">
                            <input className="input-style" value="1000" type="text" id="amountReceived" disabled />
                        </div>
                    </div>
                    <div className="total-currencycode">
                        <div className="currencycode-info"></div>
                        <select className="currencycode-info" name="cars" id="currencyList"></select>
                    </div>
                </div>
            </div>
            <div className="bond-info-row4">
                <div className="cancel-button">Cancel</div>
                <div className="submit-button" onclick="onSubmit()">Submit</div>
            </div>
        </div>
      </React.Fragment>
    );
  }
}
