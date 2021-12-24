
import Decimal from 'decimal.js';

export function multiply (num1, num2) {
    return Decimal(num1).times(Decimal(num2)).toNumber();
}

export function equals (num1, num2) {
    return Decimal(num1).equals(Decimal(num2));
}

export function greaterThan (num1, num2) {
    return Decimal(num1).greaterThan(Decimal(num2));
}

export function lessThan (num1, num2) {
    return Decimal(num1).lessThan(Decimal(num2));
}

export function truncateDecimal (value, decimalPlaces = 2) {
    return Decimal(value).toDecimalPlaces(decimalPlaces, Decimal.ROUND_DOWN).toNumber();
}

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

export function autoCorrectAmount(input, isAllowEmptyInput, decimalPlaces = 2) {

    var result = input.toString();
    const integerPlaces = 12;
    const isAllowDecimal = decimalPlaces > 0;

    if (isAllowDecimal) {
  
        //remove invalid characters
        result = result.replace(/[^.0-9]/g, '');
  
        //remove prefix '0';
        result = result.replace(/^0+(?=\d+)/g, '');
  
        //remove duplicated '.', 
        //NOTE: reverse() required for Regx positive-look-after
        result = result.split('').reverse().join('');
        result = result.replace(/\.(?=\d*\.)/g, '');
        result = result.split('').reverse().join('');
  
        //recover 'no integer part' issue e.g. '.123'
        result = result.replace(/^\./g, "0.");
  
        //truncate integer places
        var integerPart = result.toString().split(".")[0];
        integerPart = integerPart.substr(0, integerPlaces);
  
        //truncate decimal places
        var decimalPart = result.toString().split(".")[1] || "";
        decimalPart = decimalPart.substr(0, decimalPlaces);
  
        if(result.indexOf(".") > -1) {
            result = integerPart + "." + decimalPart;                
        } else {
            result = integerPart;
        }
  
    } else {
  
        //remove invalid characters
        result = result.replace(/[^0-9]/g, '');
        
        //remove prefix '0';
        result = result.replace(/^0+(?=\d+)/g, '');
  
        //truncate integer places
        result = result.substr(0, integerPlaces);
    }

    if(isAllowEmptyInput) {
        return result;
    } else {
        return result.trim() !== "" ? result : "0";
    }
  }