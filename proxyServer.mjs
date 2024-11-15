import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import fetch from "node-fetch";

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

// app.use("/api", async (req, res) => {
//   const apiUrl = `http://api.jolpi.ca${req.originalUrl.replace("/api", "")}`;
//   try {
//     const response = await fetch(apiUrl, {
//       method: req.method,
//       headers: { "Content-Type": "application/json" },
//     });

//     // Check if the response is JSON by looking at the Content-Type header
//     const contentType = response.headers.get("content-type");
//     if (contentType && contentType.includes("application/json")) {
//       const data = await response.json();
//       res.json(data);
//     } else {
//       // Handle non-JSON response, such as HTML error page
//       const text = await response.text();
//       console.error("Unexpected response format:", text);
//       res.status(500).send("Unexpected response format from API");
//     }
//   } catch (error) {
//     console.error("Error in proxy:", error);
//     res.status(500).send("Error in proxy server");
//   }
// });

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
