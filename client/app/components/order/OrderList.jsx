import React from "react";
import { Link } from "react-router-dom";


import Header from '../common/Header';
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

  render() {

    let orders = this.props.orders;

    const { ExportCSVButton } = CSVExport;

    const columns = [
      {
        dataField: 'orderId',
        text: 'Agent Order ID',
        headerAlign: "center",
        sort: true,
        headerStyle: {
          backgroundColor: '#F8F9FA',
          fontSize: '14px'
        }
      }, {
        dataField: 'paymentDateFormatted',
        text: 'Submission Date',
        sort: true,
        headerAlign: "center",
        headerStyle: {
          backgroundColor: '#F8F9FA',
          fontSize: '14px'
        }
      }, {
        dataField: 'buyerName',
        text: 'Buyer Name',
        sort: true,
        headerAlign: "center",
        headerStyle: {
          backgroundColor: '#F8F9FA',
          fontSize: '14px'
        }
      },
      {
        dataField: 'bondValueInUSDFormatted',
        text: 'Total Amount (USD)',
        sort: true,
        headerAlign: "center",
        align: "right",        
        headerStyle: {
          backgroundColor: '#F8F9FA',
          fontSize: '14px'
        }
      },
      {
        dataField: 'actualValueInSelectedCurrencyFormatted',
        text: 'Actual Amount',
        sort: true,
        headerAlign: "center",
        align: "right",
        headerStyle: {
          backgroundColor: '#F8F9FA',
          fontSize: '14px'
        }
      },
      {
        dataField: 'paymentCurrency',
        text: 'Currency Received',
        sort: true,
        headerAlign: "center",
        align: "center",
        headerStyle: {
          backgroundColor: '#F8F9FA',
          fontSize: '14px'
        }
      },       
      {
        dataField: 'status',
        text: 'Status',
        sort: true,
        headerAlign: "center",
        align: "center",        
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
      sizePerPage: 10,
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
            keyField="orderId"
            data={orders}
            columns={columns}
            exportCSV={{ fileName: 'orders.csv' }}
            bootstrap4
          >
            {
              props => (
                <div style={{ margin: "15px" }}>
                  <span style={{ display: "flex", flexDirection: "row" }}>
                    <Link style={{ textDecoration: "none" }} to="/order/add"><div className="add-new-button"> + New</div></Link>
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
