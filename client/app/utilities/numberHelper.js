

export function formatMoney(value, decimalPlaces = 2) {
    if (value && value > 0) {
        let integerPart = value.toString().split(".")[0];
        let decimalPart = value.toString().split(".")[1] || "";
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        decimalPart = (decimalPart + "0000000000").substring(0, decimalPlaces);
        return decimalPlaces > 0 ? [integerPart, decimalPart].join(".") : integerPart;
    } else {
        return "0";
    }
}