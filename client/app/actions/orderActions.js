import dispatcher from "../utilities/dispatcher";

export function addNewOrder(newOrder)
{
  dispatcher.dispatch({
    type: "ORDER_ADD",
    data: newOrder
  });
}

export function loadOrders()
{
  dispatcher.dispatch({
    type: "ORDER_LOAD",
    data: null
  });
}