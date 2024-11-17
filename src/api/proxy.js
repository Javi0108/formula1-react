import { createProxyMiddleware } from "http-proxy-middleware";

export default function handler(req, res) {
  const proxy = createProxyMiddleware({
    target: "http://api.jolpi.ca", // URL de la API
    changeOrigin: true,
    pathRewrite: { "^/api": "" }, // Reescribe las rutas
  });

  return proxy(req, res, (result) => {
    if (result instanceof Error) {
      console.error("Proxy error:", result);
      res.status(500).send("Proxy error");
    }
  });
}
