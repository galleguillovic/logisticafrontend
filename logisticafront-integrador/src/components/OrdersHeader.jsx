import React from 'react';
import { Box, Typography, TextField, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/OrdersHeader.css';

export default function OrdersHeader({ title = 'Listado de Órdenes', query = '', setQuery, onOpenFilters }) {
  return (
    <Box className="orders-header-container">
      
      <Box className="orders-header-left">
        <Typography variant="h5" className="orders-header-title">{title}</Typography>

        <Box className="orders-header-search">
          <TextField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por destino, contenido, repartidor, categoría, estado, etc."
            size="small"
            fullWidth
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1 }} />
            }}
          />
        </Box>
      </Box>

      <Box className="orders-header-filters">
        <IconButton color="primary" onClick={onOpenFilters} aria-label="Abrir filtros">
          <FilterListIcon />
        </IconButton>
      </Box>
    </Box>
  );
}