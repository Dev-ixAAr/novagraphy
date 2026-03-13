import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com', // For your logo/hero images
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // 👈 ADD THIS for the Event/MV images
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
