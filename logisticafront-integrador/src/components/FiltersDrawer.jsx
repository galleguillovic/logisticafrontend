import React from 'react';
import {
  Drawer, Box, Typography, Divider, FormGroup, FormControlLabel, Checkbox, RadioGroup, Radio, Button, Stack, useTheme } from '@mui/material';
import '../styles/FiltersDrawer.css';

const ESTADOS = ['Pendiente', 'En tránsito', 'Entregado'];
const CATEGORIAS = [  'Documentos','Tecnología','Ropa y accesorios','Hogar y decoración', 'Alimentos y bebidas','Salud y belleza','Otros' ];

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
  const theme = useTheme();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 380 }, 
          maxWidth: 520,
          height: '100vh',
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderLeft: `1px solid ${theme.palette.divider}`
        }
      }}
    >
      {/* Root */}
      <Box
        className="filters-drawer-container"
        style={{
          '--filters-text-secondary': theme.palette.text.secondary,
          '--filters-divider': theme.palette.divider
        }}
      >
        {/* Contenido principal */}
        <Box className="filters-content" role="region" aria-label="Filtros">
          <Typography variant="h6" className="filters-title">Filtros</Typography>
          <Typography variant="body2" className="filters-subtitle">Aplica uno o varios filtros</Typography>
          <Divider className="filters-divider" />

          {/* Estado */}
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

          {/* Peso */}
          <Typography variant="subtitle1" className="filters-section-title">Peso</Typography>
          <RadioGroup value={weightOrder || ''} onChange={(ev) => setWeightOrder(ev.target.value || null)}>
            <FormControlLabel value="asc" control={<Radio />} label="Más liviano a más pesado" />
            <FormControlLabel value="desc" control={<Radio />} label="Más pesado a más liviano" />
            <FormControlLabel value="" control={<Radio />} label="Sin orden por peso" />
          </RadioGroup>

          <Divider className="filters-divider-y" />

          {/* Fecha */}
          <Typography variant="subtitle1" className="filters-section-title">Fecha de creación</Typography>
          <RadioGroup value={dateOrder || ''} onChange={(ev) => setDateOrder(ev.target.value || null)}>
            <FormControlLabel value="asc" control={<Radio />} label="Más antiguos primero" />
            <FormControlLabel value="desc" control={<Radio />} label="Más recientes primero" />
            <FormControlLabel value="" control={<Radio />} label="Sin orden por fecha" />
          </RadioGroup>

          <Divider className="filters-divider-y" />

          {/* Categoría */}
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
        </Box>

        {/* Footer fijo */}
        <Box className="filters-footer" aria-hidden={false}>
          <Stack direction="row" spacing={1} className="filters-buttons">
            <Button variant="outlined" onClick={onClear} fullWidth>Limpiar</Button>
            <Button variant="contained" onClick={onClose} fullWidth>Aplicar</Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
}