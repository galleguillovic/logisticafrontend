import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import applyFilters from '../utils/filterOrders';

// Estado de búsqueda, filtros y ordenamientos.
export default function useOrdersFilter(rawOrders = []) {
  const [query, setQuery] = useState(''); 
  const [selectedEstados, setSelectedEstados] = useState([]); 
  const [weightOrder, setWeightOrder] = useState(null); 
  const [dateOrder, setDateOrder] = useState(null); 
  const [selectedCategorias, setSelectedCategorias] = useState([]); 
  const [openDrawer, setOpenDrawer] = useState(false);

  // Query de búsqueda
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const debounceRef = useRef(null);
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

 
  const toggleEstado = useCallback((estado) => {
    setSelectedEstados(prev => prev.includes(estado) ? prev.filter(s => s !== estado) : [...prev, estado]);
  }, []);
  const toggleCategoria = useCallback((cat) => {
    setSelectedCategorias(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  }, []);
  const clearFilters = useCallback(() => {
    setSelectedEstados([]);
    setSelectedCategorias([]);
    setWeightOrder(null);
    setDateOrder(null);
  }, []);
  const filtered = useMemo(() => {
    return applyFilters(rawOrders, {
      query: debouncedQuery,
      estados: selectedEstados,
      categorias: selectedCategorias,
      weightOrder,
      dateOrder
    });
  }, [rawOrders, debouncedQuery, selectedEstados, selectedCategorias, weightOrder, dateOrder]);

  return {
    filteredOrders: filtered,
    query, setQuery,
    debouncedQuery,
    selectedEstados, toggleEstado,
    weightOrder, setWeightOrder,
    dateOrder, setDateOrder,
    selectedCategorias, toggleCategoria,
    openDrawer, setOpenDrawer,
    clearFilters,
  };
}