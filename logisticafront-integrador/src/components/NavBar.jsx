import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import "../styles/NavBar.css";

export default function NavBar() {
  const location = useLocation();
  const [isLight, setIsLight] = useState(true);
  const handleThemeToggle = () => {
    setIsLight(!isLight);
  };

  return (
    <AppBar position="fixed" elevation={0} className="navbar">
      <Toolbar className="navbar-toolbar">
        {/* Texto izquierdo */}
        <Box className="navbar-title">
          <Typography className="navbar-title-main">Panel de Órdenes</Typography>
          <Typography className="navbar-title-sub">Control y estado de envíos</Typography>
        </Box>

        {/* Botones derecho */}
        <Box className="navbar-buttons">
          <Button
            component={RouterLink}
            to="/"
            variant={location.pathname === "/" ? "contained" : "text"}
            color={location.pathname === "/" ? "primary" : "inherit"}
            size="small"
            className="navbar-button"
          >
            Inicio
          </Button>

          <Button
            component={RouterLink}
            to="/crear"
            variant={location.pathname === "/crear" ? "contained" : "text"}
            color={location.pathname === "/crear" ? "primary" : "inherit"}
            size="small"
            className="navbar-button"
          >
            Agregar
          </Button>

           {/* Switch solo visual por el momento de modo claro/oscuro */}
          <IconButton color="inherit" onClick={handleThemeToggle}>
            {isLight ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

        </Box>
      </Toolbar>
    </AppBar>
  );
}