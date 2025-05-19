import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configurar Next para mostrar imágenes desde una fuente externa
  trailingSlash: true,
  images: {
    domains: ["image.tmdb.org"],
  }
};

export default nextConfig;
