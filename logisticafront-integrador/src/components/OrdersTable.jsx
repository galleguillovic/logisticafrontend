import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, useTheme} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import '../styles/OrdersTable.css';

export default function OrdersTable({ ordenes = [], onView, onEdit, onDelete }) {
  const theme = useTheme();
  const getStatusColor = (estado) => {
    switch (estado) {
      case 'Entregado': return theme.palette.success.main;
      case 'En tránsito': return theme.palette.warning.main;
      default: return theme.palette.info.main;
    }
  };
  const cssVars = {
    '--ot-divider': theme.palette.divider,
    '--ot-bg': theme.palette.background.paper,
    '--ot-text': theme.palette.text.primary,
    '--ot-hover': theme.palette.action.hover
  };

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      className="orders-table-container"
      sx={{
        mt: 2,
        backgroundColor: 'var(--ot-bg)',
        color: 'var(--ot-text)',
        border: `1px solid ${theme.palette.divider}`
      }}
      style={cssVars}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            {['ID', 'Destino', 'Estado', 'Fecha creación', 'Categoria', 'Peso', 'Repartidor', 'Acciones'].map(header => (
              <TableCell
                key={header}
                sx={{ fontWeight: 'bold', borderBottom: '1px solid var(--ot-divider)' }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {ordenes.map(o => (
            <TableRow
              key={o._id}
              hover
              sx={{
                '&:hover': { backgroundColor: 'var(--ot-hover)' }
              }}
            >
              <TableCell sx={{ borderBottom: '1px solid var(--ot-divider)' }} title={o._id}>
                {String(o._id).slice(0, 8)}
              </TableCell>

              <TableCell sx={{ borderBottom: '1px solid var(--ot-divider)' }}>{o.destino || '—'}</TableCell>

              <TableCell sx={{ borderBottom: '1px solid var(--ot-divider)' }}>
                <span className="orders-table-status">
                  <span
                    className="orders-table-status-dot"
                    style={{
                      backgroundColor: getStatusColor(o.estado)
                    }}
                  />
                  <strong>{o.estado}</strong>
                </span>
              </TableCell>

              <TableCell sx={{ borderBottom: '1px solid var(--ot-divider)' }}>
                {o.fecha_creacion ? format(new Date(o.fecha_creacion), 'yyyy-MM-dd') : '—'}
              </TableCell>

              <TableCell sx={{ borderBottom: '1px solid var(--ot-divider)' }}>{o.categoria || '—'}</TableCell>

              <TableCell sx={{ borderBottom: '1px solid var(--ot-divider)' }}>
                {o.peso != null ? `${o.peso} kg` : '—'}
              </TableCell>

              <TableCell sx={{ borderBottom: '1px solid var(--ot-divider)' }}>{o.repartidor || '—'}</TableCell>

              <TableCell sx={{ borderBottom: '1px solid var(--ot-divider)' }} align="right">
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