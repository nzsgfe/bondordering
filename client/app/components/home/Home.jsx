import React from 'react';
import OrderDetail from '../order/OrderDetail';
import DateTimePicker from '../common/DateTimePicker';
import Moment from "moment";

export default class Home extends React.Component {

    constructor() {
        super();
    }

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
                <div>I am home...</div>
                <DateTimePicker minDate={minDate} maxDate={maxDate} startDate={startDate} />
                <OrderDetail />
            </React.Fragment>
        );
    }

}