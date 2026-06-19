/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produces a fully static ./out directory. No server runtime on Vercel.
  output: "export",
  // Required for static export: disables the on-demand image optimizer.
  images: { unoptimized: true },
  // Emits /section/index.html style paths and keeps anchor links stable.
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
