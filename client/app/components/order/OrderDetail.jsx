import React from "react";
import DateTimePicker from '../common/DateTimePicker';
import Moment from "moment";
import moment from "moment";
export default class OrderDetail extends React.Component {

  constructor(props) {
    super(props);
  }

  _onChangeNewOrder = (event) => {
    const element = event.target;
    const fieldName = element.getAttribute('data-fieldname');
    let changeAttr = null;
    switch (fieldName) {
      case 'bondQty':
        const bondType = element.getAttribute('data-bondtype');
        changeAttr = {
          bondQuantityDetails: this.props.newOrder.bondQuantityDetails.map(bondQuantityDetail => {
            if (bondQuantityDetail.bondType == bondType) {
              return { bondType, [fieldName]: parseInt(element.value) };
            }
            return bondQuantityDetail;
          })
        };
        break;
      default:
        changeAttr = { [fieldName]: element.value, }
        break;
    }

    this.props.onChangeNewOrder({
      ...this.props.newOrder,
      ...changeAttr,
    });
  }

  _onPaymentDateChange = (changeDate) => {
    this.props.onChangeNewOrder({
      ...this.props.newOrder,
      paymentDate: moment(changeDate).toDate(),
    });
  }

  render() {
    const {
      currencies,
      newOrder,
      onAddNewOrder,
      onClearOrder,
    } = this.props;
    const {
      buyerName,
      buyerEmail,
      paymentDate,
      paymentCurrency,
      paymentExchangeRate,
      bondValueInUSD,
      bondValueInSelectedCurrency,
      actualValueInSelectedCurrency,
      bondQuantityDetails,
    } = newOrder;

    const minDate = Moment().subtract(29, "days")
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
      .toDate();
    const maxDate = Moment().hour(23)
      .minute(59)
      .second(59)
      .millisecond(999)
      .toDate();
    const startDate = Moment(paymentDate).format("MM/DD/YYYY");

    return (
      <React.Fragment>
        <div className="header-portal">
          <div className="top-header-portal">Agent Portal</div>
          <div className="bottom-header-portal">United Bonds</div>
        </div>
        <div className="main-portal">
          <div className="bond-order-header">Information about bond</div>
          <div className="bond-info-row1">
            <div className="bond-info-row1-name">
              <div className="buyer-name-info">Buyer Name</div>
              <div className="buyer-name-info">
                <input className="input-style" onChange={this._onChangeNewOrder} data-fieldname={"buyerName"} type="text" value={buyerName} />
              </div>
            </div>
            <div className="bond-info-row1-date">
              <div className="payment-date-info">Date of Payment</div>
              <div className="payment-date-info">
                <DateTimePicker minDate={minDate}
                  maxDate={maxDate}
                  startDate={startDate}
                  onChange={this._onPaymentDateChange}
                  readOnly
                  disabled
                  className="input-style" />
              </div>
            </div>
          </div>
          <div className="bond-info-row2">
            <div className="buyer-email-style">Buyer Email</div>
            <div className="buyer-email-style">
              <input className="input-style" type="email" onChange={this._onChangeNewOrder} data-fieldname={"buyerEmail"} value={buyerEmail} />
            </div>
          </div>
          <div className="bond-info-row3">
            <div className="bond-selection-header">Bond Quantities</div>
            <div className="bond-selection">
              {bondQuantityDetails.map(bondQuantityDetail =>
                <div key={bondQuantityDetail.bondType} className="bond-selection-single">
                  <div className="single-selection-info">$ {bondQuantityDetail.bondType} Bond</div>
                  <div className="single-selection-info">
                    <input className="input-style"
                      type="number"
                      onChange={this._onChangeNewOrder}
                      data-fieldname={"bondQty"}
                      data-bondtype={bondQuantityDetail.bondType}
                      value={bondQuantityDetail.bondQty}
                      min="0" />
                  </div>
                </div>
              )}
            </div>
            <div className="total-amount-selection">
              <div className="bond-value-info">
                <div className="single-selection-info">Bond Value in USD</div>
                <div className="single-selection-info">
                  <input className="input-style" type="text" value={bondValueInUSD} disabled />
                </div>
              </div>
              <div className="total-currencycode">
                <div className="currencycode-info"></div>
                <select className="currencycode-info" onChange={this._onChangeNewOrder} data-fieldname={"paymentCurrency"} value={paymentCurrency}>
                  {currencies.map(currency =>
                    <option key={currency.CurrencyCode}>{currency.CurrencyCode}</option>
                  )}
                </select>
              </div>
              <div className="exhange-rate-info">
                <div className="currencycode-info">Exchange Rate</div>
                <div className="currencycode-info">
                  <input className="input-style" type="text" value={paymentExchangeRate} disabled />
                </div>
              </div>
            </div>
            <div className="total-amount-selection">
              <div className="total-amount-single-left">
                <div className="total-amount-info">Bond Value in Selected Currency</div>
                <div className="total-amount-info">
                  <input className="input-style" type="text" value={bondValueInSelectedCurrency} disabled />
                </div>
              </div>
              <div className="total-amount-single-right">
                <div className="total-amount-info">Actual Amount in Selected Currency</div>
                <div className="total-amount-info">
                  <input className="input-style" onChange={this._onChangeNewOrder} data-fieldname={"actualValueInSelectedCurrency"} value={actualValueInSelectedCurrency ? actualValueInSelectedCurrency : 0} type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="bond-info-row4">
            <div className="cancel-button" onClick={onClearOrder}>Cancel</div>
            <div className="submit-button" onClick={onAddNewOrder}>Submit</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
