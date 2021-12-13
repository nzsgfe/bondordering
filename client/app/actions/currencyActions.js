import dispatcher from "../utilities/dispatcher";

export function getCurrencies(currentDateTimeInISO)
{
  dispatcher.dispatch({
    type: "CURRENCY_GET",
    data: currentDateTimeInISO
  });
}