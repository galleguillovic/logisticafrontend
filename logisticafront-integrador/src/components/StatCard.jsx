import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import '../styles/StatCard.css';

export default function StatCard({ title, value, subtitle }) {
  return (
    <Card className="stat-card" variant="outlined">
      <CardContent className="stat-card-content">
        <Typography className="stat-card-title" gutterBottom>{title}</Typography>
        <Typography className="stat-card-value">{value}</Typography>
        {subtitle && <Typography className="stat-card-subtitle">{subtitle}</Typography>}
      </CardContent>
    </Card>
  );
}