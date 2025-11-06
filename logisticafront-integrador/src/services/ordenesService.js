import api from './api';

/** Obtener listado de órdenes (params opcionales para filtros/paginación) */
export const getOrdenes = async (params = {}) => {
  const res = await api.get('/ordenes', { params });
  return res.data;
};

/** Obtener una orden por id */
export const getOrden = async (id) => {
  if (!id) throw new Error('getOrden: id es requerido');
  const res = await api.get(`/ordenes/${id}`);
  return res.data;
};

/** Crear una nueva orden
 * payload ejemplo: { destino, contenido, estado, categoria, peso, repartidor }
 */
export const createOrden = async (payload) => {
  const res = await api.post('/ordenes', payload);
  return res.data;
};

/** Actualizar una orden por id */
export const updateOrden = async (id, payload) => {
  if (!id) throw new Error('updateOrden: id es requerido');
  const res = await api.put(`/ordenes/${id}`, payload);
  return res.data;
};

/** Eliminar una orden por id */
export const deleteOrden = async (id) => {
  if (!id) throw new Error('deleteOrden: id es requerido');
  const res = await api.delete(`/ordenes/${id}`);
  return res.data;
};

/** Obtener estadísticas por estado: devuelve [{ estado, cantidad }, ...] */
export const getEstadisticas = async () => {
  const res = await api.get('/ordenes/estadisticas/estados');
  return res.data;
};

/** Helper safe (opcional): devuleve { data, error } */
export const safe = async (fn, ...args) => {
  try {
    const data = await fn(...args);
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export default {
  getOrdenes,
  getOrden,
  createOrden,
  updateOrden,
  deleteOrden,
  getEstadisticas,
  safe
};