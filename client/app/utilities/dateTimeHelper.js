import Moment from 'moment';

export function convertToDateTime(dateTimeStr) {
    return Moment(dateTimeStr).toDate();
}

export function formatDateTime(dateTime, format) {
    return Moment(dateTime).format(format);
}

export function formatDateTimeStr(dateTimeStr, format) {
    return this.formatDateTime(this.convertToDateTime(dateTimeStr), format);
}