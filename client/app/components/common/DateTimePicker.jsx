import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";

export default class DateTimePicker extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {
            minDate,
            maxDate,
            startDate,
            style={},
            classes="",
            onChange,
        } = this.props;
        
        return (
            <DateRangePicker initialSettings={{
                    singleDatePicker: true,
                    autoApply: true,
                    startDate: startDate,
                    minDate: minDate,
                    maxDate: maxDate,
                }}
                onCallback={onChange}>
                <div onClick={(e) => {}}>
                    <input type="text"
                        value={startDate}
                        readOnly
                        disabled
                        style={style}
                        className={classes}
                    />
                </div>
            </DateRangePicker>
        )
    }

}

/*
expected params
    minDate
    maxDate
    startDate
    style
    classes
*/
