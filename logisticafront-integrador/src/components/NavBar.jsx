import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, useTheme } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import "../styles/NavBar.css";

export default function NavBar({ toggleTheme, isDarkMode }) {
  const location = useLocation();
  const theme = useTheme();
  const cssVars = {
    '--nav-bg': theme.palette.background.paper,
    '--nav-text': theme.palette.text.primary,
    '--nav-subtext': theme.palette.text.secondary,
    '--nav-border': theme.palette.divider
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      className="navbar"
      style={cssVars}
      role="navigation"
      aria-label="Barra de navegación principal"
    >
      <Toolbar className="navbar-toolbar">
        {/* Texto izquierdo */}
        <Box className="navbar-title" aria-hidden={false}>
          <Typography className="navbar-title-main">Panel de Órdenes</Typography>
          <Typography className="navbar-title-sub">Control y estado de envíos</Typography>
        </Box>

        {/* Botones derecho */}
        <Box className="navbar-buttons" role="menu" aria-label="Navegación principal">
          <Button
            component={RouterLink}
            to="/"
            variant={location.pathname === "/" ? "contained" : "text"}
            color={location.pathname === "/" ? "primary" : "inherit"}
            size="small"
            className="navbar-button"
            aria-current={location.pathname === "/" ? "page" : undefined}
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
            aria-current={location.pathname === "/crear" ? "page" : undefined}
          >
            Agregar
          </Button>

          {/* Switch funcional de themes */}
          <IconButton
            color="inherit"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Activar modo claro" : "Activar modo oscuro"}
            title={isDarkMode ? "Modo claro" : "Modo oscuro"}
            size="large"
            sx={{ backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.04)",
                  backdropFilter: isDarkMode ? "blur(6px)" : "none",
                  border: isDarkMode ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease", "&:hover": { backgroundColor: isDarkMode? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.08)", }, }} >
           {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}