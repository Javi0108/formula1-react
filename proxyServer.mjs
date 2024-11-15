import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
app.use(cors());

// Configura el proxy para redirigir las peticiones a la API
app.use(
  "/api", // Ruta base en tu frontend
  createProxyMiddleware({
    target: "http://api.jolpi.ca", // URL de la API
    changeOrigin: true, // Cambia el origen del host
    pathRewrite: {
      "^/api": "", // Reescribe el prefijo "/api" si no es necesario en la API
    },
    logLevel: "debug"
  })
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
