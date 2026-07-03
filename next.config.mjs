/** @type {import("next").NextConfig} */
// migration wave1: org build + author-gate verification (contact@reitransfer.com)
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
// rebuild: revert to Houston TX + pixel 2026-04-08