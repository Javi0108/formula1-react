import { createProxyMiddleware } from "http-proxy-middleware";

const proxy = createProxyMiddleware({
  target: "http://api.jolpi.ca/ergast/f1/", // URL de la API externa
  changeOrigin: true, // Cambia el origen del host para evitar problemas de CORS
  pathRewrite: { "^/api": "" }, // Elimina el prefijo '/api' de la ruta
  onProxyReq: (proxyReq, req) => {
    // Opcional: Puedes agregar cabeceras personalizadas aquí
    console.log(`Proxying request: ${req.url}`);
  },
  onProxyRes: (proxyRes, req) => {
    console.log(`Received response for: ${req.url}`);
  },
});

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    proxy(req, res, (result) => {
      if (result instanceof Error) {
        console.error("Proxy error:", result);
        res.status(500).send("Proxy error");
        reject(result);
      }
      resolve();
    });
  });
}
