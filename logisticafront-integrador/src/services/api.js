import axios from "axios";

const baseURL = import.meta.env.DEV
  ? "/api" 
  : import.meta.env.VITE_API_BASE || "https://back-integrador-mu.vercel.app";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, 
});

// Respuesta para Manejo de Errores Globales 
api.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || `Error ${error.response.status}: ${error.response.statusText}`;
      error.message = message;
    } 
    else if (error.request) {
      error.message = 'Error de conexión: El servidor no está disponible o la red es inestable.';
    } 
    else {
      error.message = 'Error interno en la configuración de la solicitud.';
    }
    return Promise.reject(error);
  }
);

export default api;