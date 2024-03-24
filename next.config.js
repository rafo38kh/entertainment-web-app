/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    API_AUTH: process.env.NEXT_PUBLIC_API_AUTH,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
    ],
    domains: ["lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
