import React from "react";

export default class OrderList extends React.Component {
  constructor() {
    super();
  }

  _getSampleData(){
      return [
        {
            "buyerName": "mg p",
            "buyerEmail": "mgp@mail.com",
            "paymentDateFormatted": "2021-12-16T00:00:00+08:00",
            "bondValueInUSDFormatted": "100",
            "status": "submitted"
        },
        {
            "buyerName": "nz",
            "buyerEmail": "nz@mail.com",
            "paymentDateFormatted": "2021-12-16T00:00:00+08:00",
            "bondValueInUSDFormatted": "600",
            "status": "submitted"
        },
        {
            "buyerName": "panny",
            "buyerEmail": "panny@mail.com",
            "paymentDateFormatted": "2021-12-16T00:00:00+08:00",
            "bondValueInUSDFormatted": "5000",
            "status": "submitted"
        },
        {
            "buyerName": "hein",
            "buyerEmail": "hein@mail.com",
            "paymentDateFormatted": "2021-12-16T00:00:00+08:00",
            "bondValueInUSDFormatted": "5600",
            "status": "submitted"
        },
        {
            "buyerName": "tz",
            "buyerEmail": "tz@mail.com",
            "paymentDateFormatted": "2021-12-16T00:00:00+08:00",
            "bondValueInUSDFormatted": "10000",
            "status": "submitted"
        },
        {
            "buyerName": "jeremy",
            "buyerEmail": "jeremy@mail.com",
            "paymentDateFormatted": "2021-12-16T00:00:00+08:00",
            "bondValueInUSDFormatted": "2100",
            "status": "submitted"
        }
    ]
  }

  render() {

    let ordersList = this._getSampleData();

    return (
      <React.Fragment>
        <h1>Order List</h1>
      </React.Fragment>
    );
  }
}
