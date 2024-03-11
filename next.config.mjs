/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
  },
  async rewrites() {
    return [
      {
        source: "/:slug",
        destination: "/category/sport/:slug",
      },
      {
        source: "/tag/:slug",
        destination: "/category/tag/:slug",
      },
    ];
  },
};

export default nextConfig;
