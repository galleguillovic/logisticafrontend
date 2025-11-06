import React from 'react';
import { Grid, Box, CircularProgress, Typography } from '@mui/material';
import StatCard from '../components/StatCard';
import StatusDonut from '../components/StatusDonut';
import OrdersTable from '../components/OrdersTable';
import OrdersHeader from '../components/OrdersHeader';
import FiltersDrawer from '../components/FiltersDrawer';
import useOrdersFilter from '../hooks/useOrdersFilter';
import { useOrders, useOrdersActions } from '../hooks/useOrders.js';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import "../styles/CardDashboard.css";

export default function Dashboard() {
  const { ordenes = [], loading = false, stats = [] } = useOrders();
  const { fetchOrdenes, fetchStats, deleteOrden } = useOrdersActions();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const {
    filteredOrders,
    query, setQuery,
    selectedEstados, toggleEstado,
    selectedCategorias, toggleCategoria,
    weightOrder, setWeightOrder,
    dateOrder, setDateOrder,
    openDrawer, setOpenDrawer,
    clearFilters
  } = useOrdersFilter(ordenes);

  const total = Array.isArray(filteredOrders) ? filteredOrders.length : 0;

  async function handleDelete(id) {
    if (!confirm('¿Eliminar esta orden?')) return;
    try {
      await deleteOrden(id);
      enqueueSnackbar('Orden eliminada', { variant: 'success' });
      await fetchOrdenes();
      await fetchStats();
    } catch (err) {
      console.error(err);
      enqueueSnackbar(err?.message || 'Error al eliminar', { variant: 'error' });
    }
  }

  function handleView(id) { navigate(`/ordenes/${id}`); }
  function handleEdit(id) { navigate(`/editar/${id}`); }

  if (loading) {
    return (
      <Box className="loading-container">
        <CircularProgress />
        <Typography variant="body1" color="text.secondary">Cargando datos...</Typography>
      </Box>
    );
  }

  return (
    <Box className="dashboard-page">

      {/* Estadísticas */}
      <Grid container spacing={2} className="dashboard-stats">
        <Grid xs={12} md={4}>
          <div className="dashboard-card">
            <StatCard title="Órdenes (filtradas)" value={total} subtitle={`${total} registros`} />
          </div>
        </Grid>
        <Grid xs={12} md={8}>
          <div className="dashboard-card">
            <StatusDonut data={stats} />
          </div>
        </Grid>
      </Grid>

      {/* Header con título, search y botón filtros */}
      <OrdersHeader
        title="Listado de Ordenes"
        query={query}
        setQuery={setQuery}
        onOpenFilters={() => setOpenDrawer(true)}
      />

      {/* Tabla con las ordenes filtradas */}
      <Grid container>
        <Grid xs={12}>
          <OrdersTable
            ordenes={filteredOrders}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Grid>
      </Grid>

      {/* Drawer con filtros */}
      <FiltersDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        selectedEstados={selectedEstados}
        toggleEstado={toggleEstado}
        selectedCategorias={selectedCategorias}
        toggleCategoria={toggleCategoria}
        weightOrder={weightOrder}
        setWeightOrder={setWeightOrder}
        dateOrder={dateOrder}
        setDateOrder={setDateOrder}
        onClear={clearFilters}
      />
    </Box>
  );
}