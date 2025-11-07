import React from 'react';
import { Grid, Box, CircularProgress, Typography, Paper, useTheme } from '@mui/material';
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
  const theme = useTheme();
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
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary
        }}
      >
        <CircularProgress />
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Cargando datos...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      className="dashboard-page"
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: '100vh',
        p: 2
      }}
    >

      {/* Estadísticas */}
      <Grid container spacing={2} className="dashboard-stats">
        <Grid xs={12} md={4}>
          <Paper
            sx={{
              p: 1,
              backgroundColor: theme.palette.background.paper,
              borderColor: theme.palette.divider
            }}
          >
            <StatCard title="Órdenes (filtradas)" value={total} subtitle={`${total} registros`} />
          </Paper>
        </Grid>
        <Grid xs={12} md={8}>
          <Paper
            sx={{
              p: 1,
              backgroundColor: theme.palette.background.paper,
              borderColor: theme.palette.divider
            }}
          >
            <StatusDonut data={stats} />
          </Paper>
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
      <Grid container sx={{ mt: 2 }}>
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