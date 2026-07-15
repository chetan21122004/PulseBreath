import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/offers",
        destination: "/new-batch",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
