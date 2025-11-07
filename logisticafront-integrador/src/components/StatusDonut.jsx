import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Typography, useTheme } from '@mui/material';
import '../styles/StatusDonut.css';

const STATE_COLORS = {
  'Entregado': '#4caf50',
  'En tránsito': '#ffb300',
  'Pendiente': '#29b6f6',
};

export default function StatusDonut({ data = [] }) {
  const theme = useTheme();

  const chartData = Array.isArray(data)
    ? data.map(d => ({ name: d.estado, value: Number(d.cantidad || 0) }))
    : [];

  const total = chartData.reduce((s, x) => s + (x.value || 0), 0);

  if (!chartData.length || total === 0) {
    return (
      <Box
        sx={{
          p: 2,
          borderRadius: 1,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          textAlign: 'center'
        }}
      >
        <Typography color="text.secondary">No hay datos disponibles</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>Estado de las órdenes</Typography>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={70}
            paddingAngle={2}
            label={{ fill: theme.palette.text.primary }}
          >
            {chartData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={STATE_COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [value, 'Cantidad']}
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              color: theme.palette.text.primary
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}