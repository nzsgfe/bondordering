import dispatcher from "../utilities/dispatcher";

export function add(
  name,
  dateAdded,
  email,
  bonds,
  currency,
  totalAmountInUSD,
  totalAmount
) {
  dispatcher.dispatch({
    type: "ORDER_ADD",
    data: {
      Name: name,
      DateAdded: dateAdded,
      Email: email,
      Bonds: bonds,
      Currency: currency,
      TotalAmountInUSD: totalAmountInUSD,
      TotalAmount: totalAmount
    }
  });
}

export function edit(name, email) {
  dispatcher.dispatch({
    type: "ORDER_EDIT",
    data: {}
  });
}
