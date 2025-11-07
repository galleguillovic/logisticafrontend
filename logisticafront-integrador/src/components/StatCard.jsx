import React from 'react';
import { Card, CardContent, Typography, useTheme } from '@mui/material';
import '../styles/StatCard.css';

export default function StatCard({ title, value, subtitle }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const cssVars = {
    '--sc-border': theme.palette.divider,
    '--sc-title-color': theme.palette.text.secondary,
    '--sc-subtitle-color': theme.palette.text.secondary,
    '--sc-value-color': isDark ? theme.palette.primary.light : theme.palette.text.primary
  };

  return (
    <Card
      className="stat-card"
      variant="outlined"
      sx={{
        minWidth: 220,
        borderRadius: 2,
        background: isDark
          ? `linear-gradient(180deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`
          : 'transparent',
        boxShadow: isDark ? '0 6px 18px rgba(10,20,30,0.45)' : 'none',
      }}
      style={cssVars}
    >
      <CardContent className="stat-card-content">
        <Typography variant="h6" className="stat-card-title">{title}</Typography>
        <Typography variant="h1" className="stat-card-value">{value}</Typography>
        {subtitle && <Typography className="stat-card-subtitle">{subtitle}</Typography>}
      </CardContent>
    </Card>
  );
}