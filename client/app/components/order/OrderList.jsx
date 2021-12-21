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

  render() {

    let orders = this.props.orders;

    const { ExportCSVButton } = CSVExport;

    const columns = [
      {
        dataField: 'orderId',
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
        text: 'Total Amount (USD)',
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
