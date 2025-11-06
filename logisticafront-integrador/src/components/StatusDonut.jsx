import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';
import '../styles/StatusDonut.css';

const COLORS = {
  'Entregado': '#4caf50',
  'En tránsito': '#ffb300',
  'Pendiente': '#29b6f6',
  'Otros': '#9e9e9e'
};

export default function StatusDonut({ data = [] }) {
  const chartData = Array.isArray(data)
    ? data.map(d => ({ name: d.estado || 'Otros', value: Number(d.cantidad || 0) }))
    : [];

  const total = chartData.reduce((s, x) => s + (x.value || 0), 0);

  if (!chartData.length || total === 0) {
    return (
      <Box className="status-donut-card">
        <Typography color="text.secondary">No hay datos disponibles</Typography>
      </Box>
    );
  }

  return (
    <Box className="status-donut-card">
      <Typography variant="h6" sx={{ mb: 2 }}>Estado de las órdenes</Typography>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            label
          >
            {chartData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[entry.name] || COLORS['Otros']} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [value, 'Cantidad']} />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}