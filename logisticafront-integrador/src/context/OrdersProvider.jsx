import React, { useReducer, useCallback, useEffect } from "react";
import * as ordenesService from "../services/ordenesService";
import { OrdersStateContext, OrdersActionsContext } from "./OrdersContext";

const initialState = {
  ordenes: [],
  loading: false,
  error: null,
  stats: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING': return { ...state, loading: true, error: null };
    case 'SET_ORDENES': return { ...state, loading: false, ordenes: action.payload, error: null };
    case 'SET_ERROR': return { ...state, loading: false, error: action.payload };
    case 'ADD_ORDEN': return { ...state, ordenes: [action.payload, ...state.ordenes] };
    case 'UPDATE_ORDEN': return { ...state, ordenes: state.ordenes.map(o => (o._id === action.payload._id ? action.payload : o)) };
    case 'DELETE_ORDEN': return { ...state, ordenes: state.ordenes.filter(o => o._id !== action.payload) };
    case 'SET_STATS': return { ...state, stats: action.payload };
    default: return state;
  }
}

export function OrdersProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchOrdenes = useCallback(async (params = {}) => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await ordenesService.getOrdenes(params);
      dispatch({ type: 'SET_ORDENES', payload: Array.isArray(data) ? data : [] });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err });
      console.error('fetchOrdenes error', err);
    }
  }, []);

  const createOrden = useCallback(async (payload) => {
    dispatch({ type: 'LOADING' });
    try {
      const nuevo = await ordenesService.createOrden(payload);
      dispatch({ type: 'ADD_ORDEN', payload: nuevo });
      return nuevo;
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err });
      throw err;
    }
  }, []);

  const updateOrden = useCallback(async (id, payload) => {
    dispatch({ type: 'LOADING' });
    try {
      const actualizado = await ordenesService.updateOrden(id, payload);
      dispatch({ type: 'UPDATE_ORDEN', payload: actualizado });
      return actualizado;
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err });
      throw err;
    }
  }, []);

  const deleteOrden = useCallback(async (id) => {
    dispatch({ type: 'LOADING' });
    try {
      await ordenesService.deleteOrden(id);
      dispatch({ type: 'DELETE_ORDEN', payload: id });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err });
      throw err;
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const data = await ordenesService.getEstadisticas();
      dispatch({ type: 'SET_STATS', payload: Array.isArray(data) ? data : [] });
    } catch (err) {
      console.error('fetchStats error', err);
    }
  }, []);

   useEffect(() => {
    (async () => {
      await fetchOrdenes();
      await fetchStats();
    })();
  }, [fetchOrdenes, fetchStats]);

  return (
    <OrdersStateContext.Provider value={state}>
      <OrdersActionsContext.Provider value={{
        fetchOrdenes,
        createOrden,
        updateOrden,
        deleteOrden,
        fetchStats
      }}>
        {children}
      </OrdersActionsContext.Provider>
    </OrdersStateContext.Provider>
  );
}