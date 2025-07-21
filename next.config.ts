import type { NextConfig } from 'next';
import { Configuration as WebpackConfig } from 'webpack';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Configuração do webpack para lidar com módulos específicos do Node.js
  webpack: (config: WebpackConfig, { isServer }) => {
    // Se não estiver no servidor (ou seja, se estiver no cliente/navegador)
    if (!isServer) {
      // Substitui módulos específicos por um módulo vazio
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        net: false,
        tls: false,
        child_process: false,
      };
    }
    return config;
  },
};

export default nextConfig;
