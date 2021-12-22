import React from "react";
import DateTimePicker from '../common/DateTimePicker';
import Moment from "moment";
import Header from '../common/Header';

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

  _onChangePaymentDate = (changeDate) => {
    this.props.onChangePaymentDate({
      ...this.props.newOrder,
      paymentDate: changeDate,
    });
  }

  render() {
    const {
      currencies,
      newOrder,
      onAddNewOrder,
      onClearOrder,
      validationResult,
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

    const minDate = Moment().subtract(2, "days")
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
      .toDate();
    const maxDate = Moment()
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
      .toDate();

    const startDate = Moment(paymentDate);

    return (
      <React.Fragment>
        <Header />
        <div className="main-portal">
          <div className="bond-order-header">Bond Order</div>
          <div className="bond-info-row1">
            <div className="bond-info-row1-name">
              <div className="buyer-name-info">
                Buyer Name
                {validationResult && validationResult.hasError("buyerName") &&
                  <span className="error-message-text">{validationResult.getErrorMessage("buyerName")}</span>}
              </div>
              <div className="buyer-name-info">
                <input className={`input-style ${validationResult && validationResult.hasError("buyerName").length > 0 && "error-border"}`} onChange={this._onChangeNewOrder} data-fieldname={"buyerName"} type="text" value={buyerName} />
              </div>
            </div>
            <div className="bond-info-row1-date">
              <div className="payment-date-info">Date of Payment</div>
              <div className="payment-date-info">
                <DateTimePicker minDate={minDate}
                  maxDate={maxDate}
                  startDate={startDate}
                  onChange={this._onChangePaymentDate}
                  readOnly
                  disabled
                  className="input-style" />
              </div>
            </div>
          </div>
          <div className="bond-info-row2">
            <div className="buyer-email-style">Buyer Email
              {validationResult && validationResult.hasError("buyerEmail") &&
                <span className="error-message-text">{validationResult.getErrorMessage("buyerEmail")}</span>}
            </div>
            <div className="buyer-email-style">
              <input className={`input-style ${validationResult && validationResult.hasError("buyerEmail").length > 0 && "error-border"}`} type="email" onChange={this._onChangeNewOrder} data-fieldname={"buyerEmail"} value={buyerEmail} />
            </div>
          </div>
          <div className="bond-info-row3">
            <div className="bond-selection-header">Bond Quantities
              {validationResult && validationResult.hasError("bondQuantityDetails") &&
                <span className="error-message-text">{validationResult.getErrorMessage("bondQuantityDetails")}</span>}
            </div>
            <div className="bond-selection">
              {bondQuantityDetails.map(bondQuantityDetail =>
                <div key={bondQuantityDetail.bondType} className="bond-selection-single">
                  <div className="single-selection-info">USD {bondQuantityDetail.bondType} Bond</div>
                  <div className="single-selection-info">
                    <input className={"input-style " + (validationResult && validationResult.hasError("bondQuantityDetails").length > 0 ? "error-border" : "")}
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
                <div className="currencycode-info">Received Currency</div>
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
                <div className="total-amount-info">Bond Value in Received Currency</div>
                <div className="total-amount-info">
                  <input className="input-style" type="text" value={bondValueInSelectedCurrency} disabled />
                </div>
              </div>
              <div className="total-amount-single-right">
                <div className="total-amount-info">
                  Actual Amount in Received Currency
                  {validationResult && validationResult.hasError("actualValueInSelectedCurrency") && <span className="error-message-text">{validationResult.getErrorMessage("actualValueInSelectedCurrency")}</span>}
                </div>
                <div className="total-amount-info">
                  <input className={"input-style " + (validationResult && validationResult.hasError("actualValueInSelectedCurrency").length > 0 ? "error-border" : "")} onChange={this._onChangeNewOrder} data-fieldname={"actualValueInSelectedCurrency"} value={actualValueInSelectedCurrency} type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="bond-info-row4">
            <div className="cancel-button" onClick={onClearOrder}>
              <img style={{ width: "15px", height: "15px", marginRight: "10px" }} src="../../assets/images/cancelLogo.png" alt="" />
              Cancel
            </div>
            <div className="submit-button" onClick={onAddNewOrder}>
              <img style={{ width: "15px", height: "15px", marginRight: "10px" }} src="../../assets/images/submitLogo.png" alt="" />
              Submit
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
