/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ["193.108.130.23"],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "193.108.130.23",
        pathname: "**",
      },
    ],
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
