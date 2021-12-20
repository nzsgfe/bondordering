import React from "react";
import Header from '../common/Header';
import Loading from '../common/Loading';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

export default class OrderList extends React.Component {
  constructor() {
    super();
  }

  _getSampleData() {
    return [
      {
        "buyerName": "mg p",
        "orderID": "mgp@mail.com",
        "paymentDateFormatted": "2021-12-16T00:00:00+08:00",
        "bondValueInUSDFormatted": "100",
        "status": "submitted"
      },
      {
        "buyerName": "nz",
        "orderID": "nz@mail.com",
        "paymentDateFormatted": "2021-12-16T00:00:00+08:00",
        "bondValueInUSDFormatted": "600",
        "status": "submitted"
      },
      {
        "buyerName": "panny",
        "orderID": "panny@mail.com",
        "paymentDateFormatted": "2021-12-16T00:00:00+08:00",
        "bondValueInUSDFormatted": "5000",
        "status": "submitted"
      },
      {
        "buyerName": "hein",
        "orderID": "hein@mail.com",
        "paymentDateFormatted": "2021-12-16T00:00:00+08:00",
        "bondValueInUSDFormatted": "5600",
        "status": "submitted"
      },
      {
        "buyerName": "tz",
        "orderID": "tz@mail.com",
        "paymentDateFormatted": "2021-12-16T00:00:00+08:00",
        "bondValueInUSDFormatted": "10000",
        "status": "submitted"
      },
      {
        "buyerName": "jeremy",
        "orderID": "jeremy@ewedcmail.com",
        "paymentDateFormatted": "2021-12-16T00:00:00+08:00",
        "bondValueInUSDFormatted": "2100",
        "status": "submitted"
      },
      {
        "buyerName": "jeredfmy",
        "orderID": "jeremghr@mail.com",
        "paymentDateFormatted": "2021-12-16T00:00:00+08:00",
        "bondValueInUSDFormatted": "2100",
        "status": "submitted"
      },
      {
        "buyerName": "jferemy",
        "orderID": "jeremyas@mail.com",
        "paymentDateFormatted": "2021-12-16T00:00:00+08:00",
        "bondValueInUSDFormatted": "2100",
        "status": "submitted"
      },
      {
        "buyerName": "jerwemy",
        "orderID": "jeremkjy@mail.com",
        "paymentDateFormatted": "2021-12-16T00:00:00+08:00",
        "bondValueInUSDFormatted": "2100",
        "status": "submitted"
      },
      {
        "buyerName": "jer4emy",
        "orderID": "jeremyew@mail.com",
        "paymentDateFormatted": "2021-12-16T00:00:00+08:00",
        "bondValueInUSDFormatted": "2100",
        "status": "submitted"
      },
      {
        "buyerName": "je2vremy",
        "orderID": "jeremewy@mail.com",
        "paymentDateFormatted": "2021-12-16T00:00:00+08:00",
        "bondValueInUSDFormatted": "2100",
        "status": "submitted"
      },
      {
        "buyerName": "jervemy",
        "orderID": "jeremyfd@mail.com",
        "paymentDateFormatted": "2021-12-16T00:00:00+08:00",
        "bondValueInUSDFormatted": "2100",
        "status": "submitted"
      },
      {
        "buyerName": "jere8my",
        "orderID": "jeremy@mwail.com",
        "paymentDateFormatted": "2021-12-16T00:00:00+08:00",
        "bondValueInUSDFormatted": "2100",
        "status": "submitted"
      },
      {
        "buyerName": "jereamy",
        "orderID": "jereytmy@mail.com",
        "paymentDateFormatted": "2021-12-16T00:00:00+08:00",
        "bondValueInUSDFormatted": "2100",
        "status": "submitted"
      },
      {
        "buyerName": "je2remy",
        "orderID": "jew2dremy@mail.com",
        "paymentDateFormatted": "2021-12-16T00:00:00+08:00",
        "bondValueInUSDFormatted": "2100",
        "status": "submitted"
      },
      {
        "buyerName": "jer3emy",
        "orderID": "jerem3wdy@mail.com",
        "paymentDateFormatted": "2021-12-16T00:00:00+08:00",
        "bondValueInUSDFormatted": "2100",
        "status": "submitted"
      },
      {
        "buyerName": "jere8my",
        "orderID": "jeresdmy@mail.com",
        "paymentDateFormatted": "2021-12-16T00:00:00+08:00",
        "bondValueInUSDFormatted": "2100",
        "status": "submitted"
      },
      {
        "buyerName": "jsderemy",
        "orderID": "jeremfdgy@mail.com",
        "paymentDateFormatted": "2021-12-16T00:00:00+08:00",
        "bondValueInUSDFormatted": "2100",
        "status": "submitted"
      }
    ]
  }


  render() {

    let ordersList = this._getSampleData();

    const { ExportCSVButton } = CSVExport;

    const columns = [
      {
        dataField: 'orderID',
        text: 'Order ID',
        sort: true,
        headerStyle: {
          backgroundColor: '#F8F9FA',
          fontSize: '14px'
        }
      }, {
        dataField: 'paymentDateFormatted',
        text: 'Date',
        sort: true,
        headerStyle: {
          backgroundColor: '#F8F9FA',
          fontSize: '14px'
        }
      }, {
        dataField: 'buyerName',
        text: 'Buyer Name',
        sort: true,
        headerStyle: {
          backgroundColor: '#F8F9FA',
          fontSize: '14px'
        }
      },
      {
        dataField: 'bondValueInUSDFormatted',
        text: 'Total Amount(USD)',
        sort: true,
        headerStyle: {
          backgroundColor: '#F8F9FA',
          fontSize: '14px'
        }
      },
      {
        dataField: 'status',
        text: 'Status',
        sort: true,
        headerStyle: {
          backgroundColor: '#F8F9FA',
          fontSize: '14px'
        },
        style: {
          color: '#2196F3'
        }
      }];

    const defaultSorted = [{
      dataField: 'paymentDateFormatted',
      order: 'desc'
    }];

    const paginationOptions = {
      sizePerPage: 5,
      hideSizePerPage: true,
      hidePageListOnlyOnePage: true
    };

    return (
      <React.Fragment>
        {/* <Loading /> */}
        <Header />
        <div className="table-layout">
          <span className="bond-order-list-header">Bond Order List</span>
          <ToolkitProvider
            keyField="orderID"
            data={ordersList}
            columns={columns}
            exportCSV
            bootstrap4
          >
            {
              props => (
                <div style={{ margin: "15px" }}>
                  <span style={{ display: "flex", flexDirection: "row" }}>
                    <div className="add-new-button"> + New</div>
                    <ExportCSVButton className="export-button" {...props.csvProps}>Export as csv</ExportCSVButton>
                  </span>
                  <span className="table-font-style">
                    <BootstrapTable
                      {...props.baseProps}
                      defaultSorted={defaultSorted}
                      pagination={paginationFactory(paginationOptions)}
                    />
                  </span>
                </div>
              )}
          </ToolkitProvider>
        </div>
      </React.Fragment>
    );
  }
}
