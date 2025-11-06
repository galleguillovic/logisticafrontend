import axios from "axios";

// 🔹 Determina la URL base según el entorno (local o producción)
const baseURL = import.meta.env.DEV
  ? "/api" // 👉 Usa el proxy en desarrollo (vite.config.js)
  : import.meta.env.VITE_API_BASE || "https://back-integrador-mu.vercel.app";

// 🔹 Crea una instancia de Axios configurada
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Timeout sugerido para evitar esperas infinitas
});

// --- Interceptor de Respuesta para Manejo de Errores Globales ---
api.interceptors.response.use(
  (response) => response, // Respuesta OK
  (error) => {
    // 1. Error de respuesta del backend (4xx, 5xx)
    if (error.response) {
      // El backend puede enviar un campo 'message' con el error de negocio
      const message = error.response.data?.message || `Error ${error.response.status}: ${error.response.statusText}`;
      error.message = message;
    } 
    // 2. Error de solicitud (no hay respuesta del servidor)
    else if (error.request) {
      error.message = 'Error de conexión: El servidor no está disponible o la red es inestable.';
    } 
    // 3. Otros errores (configuración de Axios, timeout, etc.)
    else {
      error.message = 'Error interno en la configuración de la solicitud.';
    }
    
    // Rechazamos la promesa para que el error sea capturado en el 'catch' del service/provider
    return Promise.reject(error);
  }
);
// ----------------------------------------------------------------

// 🔹 Funciones para interactuar con la API del backend

// Obtener todas las órdenes
export const getOrders = async () => {
  const response = await api.get("/ordenes");
  return response.data;
};

// Crear una nueva orden
export const createOrder = async (newOrder) => {
  const response = await api.post("/ordenes", newOrder);
  return response.data;
};

// Actualizar una orden existente
export const updateOrder = async (id, updatedData) => {
  const response = await api.put(`/ordenes/${id}`, updatedData);
  return response.data;
};

// Eliminar una orden
export const deleteOrder = async (id) => {
  const response = await api.delete(`/ordenes/${id}`);
  return response.data;
};

// 🔹 Exporta la instancia por si se necesita directamente (esto es clave para ordenesService.js)
export default api;