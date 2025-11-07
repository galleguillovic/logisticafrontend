import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Paper, Stack, TextField, Button, MenuItem, Typography, InputAdornment, useTheme} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useOrdersActions } from '../hooks/useOrders';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import CategoryIcon from '@mui/icons-material/Category';
import ScaleIcon from '@mui/icons-material/Scale';
import PersonalInjuryIcon from '@mui/icons-material/PersonalInjury';
import '../styles/OrderFormPage.css';
import * as service from '../services/ordenesService';

const ESTADOS = ['Pendiente', 'En tránsito', 'Entregado'];
const CATEGORIAS = ['Documentos','Tecnología','Ropa y accesorios','Hogar y decoración','Alimentos y bebidas','Salud y belleza','Otros'];

export default function OrderFormPage() {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { createOrden, updateOrden, fetchOrdenes, fetchStats } = useOrdersActions();

  const [form, setForm] = useState({
    destino: '', contenido: '', estado: 'Pendiente', categoria: '', peso: '', repartidor: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function load() {
      if (!id) return;
      setLoading(true);
      try {
        const data = await service.getOrden(id);
        if (!mounted) return;
        setForm({
          destino: data.destino || '',
          contenido: data.contenido || '',
          estado: data.estado || 'Pendiente',
          categoria: data.categoria || '',
          peso: data.peso ?? '',
          repartidor: data.repartidor || ''
        });
      } catch (err) {
        console.error(err);
        enqueueSnackbar('Error cargando la orden', { variant: 'error' });
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => { mounted = false; };
  }, [id, enqueueSnackbar]);

  function setField(name, value) {
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.destino.trim() || !form.contenido.trim() || !form.categoria.trim()) {
      enqueueSnackbar('Complete los campos obligatorios (destino, contenido, categoría)', { variant: 'warning' });
      return;
    }

    const pesoNum = Number(form.peso);
    if (Number.isNaN(pesoNum) || pesoNum <= 0) {
      enqueueSnackbar('El peso debe ser un número mayor a 0', { variant: 'warning' });
      return;
    }

    try {
      setLoading(true);
      const payload = { ...form, peso: pesoNum };
      if (id) {
        await updateOrden(id, payload);
        enqueueSnackbar('Orden actualizada', { variant: 'success' });
      } else {
        await createOrden(payload);
        enqueueSnackbar('Orden creada', { variant: 'success' });
      }
      await fetchOrdenes();
      await fetchStats();
      navigate('/');
    } catch (err) {
      console.error(err);
      enqueueSnackbar(err?.message || 'Error al guardar la orden', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Paper
      className="order-form-paper"
      sx={{
        p: { xs: 2, sm: 3 },
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        border: `1px solid ${theme.palette.divider}`,
      }}
      role="form"
      aria-label={id ? "Formulario editar orden" : "Formulario crear orden"}
    >
      <Typography
        variant="h6"
        className="order-form-title"
        sx={{ mb: 2, color: theme.palette.text.primary }}
      >
        {id ? 'Editar orden' : 'Crear nueva orden'}
      </Typography>

      <form onSubmit={handleSubmit} noValidate>
        <Stack className="order-form-stack" spacing={2}>
          <TextField
            label="Destino"
            value={form.destino}
            onChange={e => setField('destino', e.target.value)}
            required
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (<InputAdornment position="start"><LocalShippingIcon /></InputAdornment>)
            }}
            sx={{ backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.paper }}
            inputProps={{ 'aria-label': 'Destino' }}
            autoComplete="off"
          />

          <TextField
            label="Contenido"
            value={form.contenido}
            onChange={e => setField('contenido', e.target.value)}
            multiline rows={3}
            required
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (<InputAdornment position="start"><ContentPasteIcon /></InputAdornment>)
            }}
            sx={{ backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.paper }}
            inputProps={{ 'aria-label': 'Contenido' }}
          />

          <TextField
            select
            label="Estado"
            value={form.estado}
            onChange={e => setField('estado', e.target.value)}
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (<InputAdornment position="start"><DisplaySettingsIcon /></InputAdornment>)
            }}
            sx={{ backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.paper }}
            inputProps={{ 'aria-label': 'Estado' }}
          >
            {ESTADOS.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </TextField>

          <TextField
            select
            label="Categoría"
            value={form.categoria}
            onChange={e => setField('categoria', e.target.value)}
            required
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (<InputAdornment position="start"><CategoryIcon /></InputAdornment>)
            }}
            sx={{ backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.paper }}
            inputProps={{ 'aria-label': 'Categoría' }}
          >
            {CATEGORIAS.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </TextField>

          <TextField
            label="Peso (kg)"
            type="number"
            inputProps={{ step: "0.01", min: "0.01", 'aria-label': 'Peso' }}
            value={form.peso}
            onChange={e => setField('peso', e.target.value)}
            required
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (<InputAdornment position="start"><ScaleIcon /></InputAdornment>)
            }}
            sx={{ backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.paper }}
          />

          <TextField
            label="Repartidor"
            value={form.repartidor}
            onChange={e => setField('repartidor', e.target.value)}
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (<InputAdornment position="start"><PersonalInjuryIcon /></InputAdornment>)
            }}
            sx={{ backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.paper }}
            inputProps={{ 'aria-label': 'Repartidor' }}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2} className="order-form-buttons">
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{
                color: theme.palette.getContrastText(theme.palette.primary.main),
              }}
              aria-label={id ? "Guardar orden" : "Crear orden"}
            >
              {id ? 'Guardar' : 'Crear'}
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              sx={{
                color: theme.palette.text.primary,
                borderColor: theme.palette.divider,
              }}
              aria-label="Cancelar"
            >
              Cancelar
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}