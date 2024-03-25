/** @type {import('next').NextConfig} */
const nextConfig = {
  // publicRuntimeConfig: {
  //   // Define your environment variables here
  //   NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  //   NEXT_PUBLIC_API_AUTH: process.env.NEXT_PUBLIC_API_AUTH,
  // },s
  env: {
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    NEXT_PUBLIC_API_AUTH: process.env.NEXT_PUBLIC_API_AUTH,
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
