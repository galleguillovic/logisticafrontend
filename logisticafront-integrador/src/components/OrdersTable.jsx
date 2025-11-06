import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import '../styles/OrdersTable.css';

export default function OrdersTable({ ordenes = [], onView, onEdit, onDelete }) {
  const getStatusClass = (estado) => {
    switch (estado) {
      case 'Entregado': return 'entregado';
      case 'En tránsito': return 'en-transito';
      default: return 'pendiente';
    }
  };

  return (
    <TableContainer component={Paper} variant="outlined" className="orders-table-container">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Destino</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Fecha creación</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Categoria</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}> Peso</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Repartidor</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {ordenes.map(o => (
            <TableRow key={o._id} hover>
              <TableCell title={o._id}>{String(o._id).slice(0,8)}</TableCell>
              <TableCell>{o.destino || '—'}</TableCell>
              <TableCell>
                <span className="orders-table-status">
                  <span className={`orders-table-status-dot ${getStatusClass(o.estado)}`} />
                  <strong>{o.estado}</strong>
                </span>
              </TableCell>
              <TableCell>{o.fecha_creacion ? format(new Date(o.fecha_creacion), 'yyyy-MM-dd') : '—'}</TableCell>
              <TableCell>{o.categoria || '—'}</TableCell>
              <TableCell>{o.peso != null ? `${o.peso} kg` : '—'}</TableCell>
              <TableCell>{o.repartidor || '—'}</TableCell>

              <TableCell align="right">
                <Tooltip title="Ver detalle">
                  <IconButton size="small" onClick={() => onView && onView(o._id)}>
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Editar">
                  <IconButton size="small" onClick={() => onEdit && onEdit(o._id)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <IconButton size="small" color="error" onClick={() => onDelete && onDelete(o._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}