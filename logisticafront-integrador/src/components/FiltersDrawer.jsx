import React from 'react';
import {
  Drawer, Box, Typography, Divider, FormGroup, FormControlLabel, Checkbox,
  RadioGroup, Radio, Button, Stack
} from '@mui/material';
import '../styles/FiltersDrawer.css';

const ESTADOS = ['Pendiente', 'En tránsito', 'Entregado'];
const CATEGORIAS = [
  'Documentos','Tecnología','Ropa y accesorios','Hogar y decoración',
  'Alimentos y bebidas','Salud y belleza','Otros'
];

export default function FiltersDrawer({
  open,
  onClose,
  selectedEstados = [],
  toggleEstado,
  selectedCategorias = [],
  toggleCategoria,
  weightOrder,
  setWeightOrder,
  dateOrder,
  setDateOrder,
  onClear
}) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box className="filters-drawer-container">
        <Typography variant="h6" className="filters-title">Filtros</Typography>
        <Typography variant="body2" className="filters-subtitle">Aplica uno o varios filtros</Typography>
        <Divider className="filters-divider" />

        {/* Filtrar por Estado */}
        <Typography variant="subtitle1" className="filters-section-title">Estado</Typography>
        <FormGroup>
          {ESTADOS.map(e => (
            <FormControlLabel
              key={e}
              control={<Checkbox checked={selectedEstados.includes(e)} onChange={() => toggleEstado(e)} />}
              label={e}
            />
          ))}
        </FormGroup>

        <Divider className="filters-divider-y" />

        {/* Filtrar por Peso */}
        <Typography variant="subtitle1" className="filters-section-title">Peso</Typography>
        <RadioGroup
          value={weightOrder || ''}
          onChange={(ev) => setWeightOrder(ev.target.value || null)}
        >
          <FormControlLabel value="asc" control={<Radio />} label="Más liviano a más pesado" />
          <FormControlLabel value="desc" control={<Radio />} label="Más pesado a más liviano" />
          <FormControlLabel value="" control={<Radio />} label="Sin orden por peso" />
        </RadioGroup>

        <Divider className="filters-divider-y" />

        {/* Filtrar por Fecha */}
        <Typography variant="subtitle1" className="filters-section-title">Fecha de creación</Typography>
        <RadioGroup
          value={dateOrder || ''}
          onChange={(ev) => setDateOrder(ev.target.value || null)}
        >
          <FormControlLabel value="asc" control={<Radio />} label="Más antiguos primero" />
          <FormControlLabel value="desc" control={<Radio />} label="Más recientes primero" />
          <FormControlLabel value="" control={<Radio />} label="Sin orden por fecha" />
        </RadioGroup>

        <Divider className="filters-divider-y" />

        {/* Filtrar por Categoría */}
        <Typography variant="subtitle1" className="filters-section-title">Categoría</Typography>
        <FormGroup>
          {CATEGORIAS.map(c => (
            <FormControlLabel
              key={c}
              control={<Checkbox checked={selectedCategorias.includes(c)} onChange={() => toggleCategoria(c)} />}
              label={c}
            />
          ))}
        </FormGroup>

        <Divider className="filters-divider-y" />

        <Stack className="filters-buttons">
          <Button variant="outlined" onClick={onClear}>Limpiar</Button>
          <Button variant="contained" onClick={onClose}>Aplicar</Button>
        </Stack>
      </Box>
    </Drawer>
  );
}