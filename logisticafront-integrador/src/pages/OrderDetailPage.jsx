import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Paper, Typography, Stack, Button } from '@mui/material';
import * as service from '../services/ordenesService';
import { format } from 'date-fns';
import { useSnackbar } from 'notistack';
import '../styles/OrderDetail.css';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import CategoryIcon from '@mui/icons-material/Category';
import ScaleIcon from '@mui/icons-material/Scale';
import PersonalInjuryIcon from '@mui/icons-material/PersonalInjury';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import PendienteImg from '../assets/pendiente.png';
import EnTransitoImg from '../assets/transito.png';
import EntregadoImg from '../assets/entregado.png';

export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [orden, setOrden] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = await service.getOrden(id);
        if (!mounted) return;
        setOrden(data);
      } catch (err) {
        console.error(err);
        enqueueSnackbar('Error al cargar detalle', { variant: 'error' });
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [id, enqueueSnackbar]);

  if (loading) return <Typography>Cargando...</Typography>;
  if (!orden) return <Typography>No se encontró la orden.</Typography>;

  // Para definir imagen según estado
  const estadoImg = orden.estado === 'Pendiente' ? PendienteImg
                    : orden.estado === 'En tránsito' ? EnTransitoImg
                    : orden.estado === 'Entregado' ? EntregadoImg
                    : null;

  return (
    <Paper sx={{ p: 3 }}>
      <div className="order-detail-container">
        {/* Columna izquierda: info */}
        <Stack spacing={1} className="order-detail-info">
          <Typography><LocalShippingIcon fontSize="small" /> <strong>Orden:</strong> {String(orden._id).slice(0,8)}</Typography>
          <Typography><LocalShippingIcon fontSize="small" /> <strong>Destino:</strong> {orden.destino}</Typography>
          <Typography><ContentPasteIcon fontSize="small" /> <strong>Contenido:</strong> {orden.contenido}</Typography>
          <Typography><DisplaySettingsIcon fontSize="small" /> <strong>Estado:</strong> {orden.estado}</Typography>
          <Typography><CategoryIcon fontSize="small" /> <strong>Categoría:</strong> {orden.categoria}</Typography>
          <Typography><ScaleIcon fontSize="small" /> <strong>Peso:</strong> {orden.peso ? `${orden.peso} kg` : '—'}</Typography>
          <Typography><PersonalInjuryIcon fontSize="small" /> <strong>Repartidor:</strong> {orden.repartidor || '—'}</Typography>
          <Typography><CalendarTodayIcon fontSize="small" /> <strong>Creada:</strong> {orden.fecha_creacion ? format(new Date(orden.fecha_creacion), 'yyyy-MM-dd') : '—'}</Typography>
        </Stack>

        {/* Columna derecha: imagen */}
        {estadoImg && (
          <div className="order-detail-image">
            <img src={estadoImg} alt={orden.estado} />
          </div>
        )}
      </div>

      {/* Botones por debajo */}
      <div className="order-detail-buttons">
        <Button variant="outlined" onClick={() => navigate(-1)}>Volver</Button>
        <Button variant="contained" onClick={() => navigate(`/editar/${orden._id}`)}>Editar</Button>
      </div>
    </Paper>
  );
}