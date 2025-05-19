import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Allow cross-origin requests from the specified IP addresses during development
  experimental: {
    serverActions: {
      allowedOrigins: [
        "10.177.103.154", // The IP address from the warning message
        "localhost", // Also include localhost for local development
      ],
    },
  },
};

export default nextConfig;
