/** @type {import('next').NextConfig} */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");

const nextConfig = {
  // "/ai" when the site is served at wikitongues.org/ai; empty on its own domain.
  ...(basePath ? { basePath } : {}),
  // Produces a fully static ./out directory. No server runtime on Vercel.
  output: "export",
  // Required for static export: disables the on-demand image optimizer.
  images: { unoptimized: true },
  // Emits /section/index.html style paths and keeps anchor links stable.
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
