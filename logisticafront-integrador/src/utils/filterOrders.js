// src/utils/filterOrders.js
// Aplica búsqueda (sobre varias propiedades), filtros y ordenamientos sobre array de ordenes.
// Se espera que cada orden tenga campos como:
// destino, contenido, repartidor, categoria, estado, peso (Number), fecha_creacion (Date o ISO string).

// helper: normaliza texto para búsqueda
const norm = (v) => (v === null || v === undefined) ? '' : String(v).toLowerCase();

export default function applyFilters(orders = [], opts = {}) {
  const {
    query = '',
    estados = [],
    categorias = [],
    weightOrder = null, // 'asc' | 'desc'
    dateOrder = null,   // 'asc' | 'desc'
  } = opts;

  const q = String(query || '').trim().toLowerCase();

  let res = Array.isArray(orders) ? [...orders] : [];

  // búsqueda libre: busca en múltiples campos
  if (q) {
    res = res.filter(o => {
      const fields = [
        o.destino, o.contenido, o.repartidor, o.categoria, o.estado,
        o.peso, o._id, o.fecha_creacion
      ].map(norm);
      return fields.some(f => f.includes(q));
    });
  }

  // filtro por estados
  if (Array.isArray(estados) && estados.length > 0) {
    res = res.filter(o => estados.includes(o.estado));
  }

  // filtro por categorias
  if (Array.isArray(categorias) && categorias.length > 0) {
    res = res.filter(o => categorias.includes(o.categoria));
  }

  // ordenamiento por peso
  if (weightOrder === 'asc' || weightOrder === 'desc') {
    res.sort((a, b) => {
      const wa = typeof a.peso === 'number' ? a.peso : Number(a.peso || 0);
      const wb = typeof b.peso === 'number' ? b.peso : Number(b.peso || 0);
      return weightOrder === 'asc' ? wa - wb : wb - wa;
    });
  }

  // ordenamiento por fecha_creacion
  if (dateOrder === 'asc' || dateOrder === 'desc') {
    res.sort((a, b) => {
      const da = a.fecha_creacion ? new Date(a.fecha_creacion).getTime() : 0;
      const db = b.fecha_creacion ? new Date(b.fecha_creacion).getTime() : 0;
      return dateOrder === 'asc' ? da - db : db - da;
    });
  }

  return res;
}