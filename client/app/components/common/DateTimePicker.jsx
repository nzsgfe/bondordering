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
            classes = "",
            onChange,
            ...otherProps
        } = this.props;

        return (
            <DateRangePicker initialSettings={{
                singleDatePicker: true,
                autoApply: true,
                startDate: startDate.format("MM/DD/YYYY"),
                minDate: minDate,
                maxDate: maxDate,
            }}
                onCallback={onChange}>
                <div onClick={(e) => { }} style={{ position: "relative", width: '100%' }}>
                    <input type="text"
                        value={startDate.format("DD/MM/YYYY")}
                        {...otherProps}
                    />
                    <img className="calendar-style" src="../../assets/images/calendarIcon.png" alt="" />
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
