import { useContext } from "react";
import { OrdersStateContext, OrdersActionsContext } from "../context/OrdersContext";

export const useOrders = () => {
  const context = useContext(OrdersStateContext);
  if (!context) {
    throw new Error("useOrders debe usarse dentro de un OrdersProvider");
  }
  return context;
};

export const useOrdersActions = () => {
  const context = useContext(OrdersActionsContext);
  if (!context) {
    throw new Error("useOrdersActions debe usarse dentro de un OrdersProvider");
  }
  return context;
};