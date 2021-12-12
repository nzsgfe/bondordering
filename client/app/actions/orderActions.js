import dispatcher from "../utilities/dispatcher";

export function addNewOrder(newOrder)
{
  dispatcher.dispatch({
    type: "ORDER_ADD",
    data: newOrder
  });
}