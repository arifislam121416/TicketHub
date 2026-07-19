/** @type {import('next').NextConfig} */

const nextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
       {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  darkMode: "class", // Add this line here
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  /* config options here */
};

export default nextConfig;
