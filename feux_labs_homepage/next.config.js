/** @type {import('next').NextConfig} */
const nextConfig = {
  // See prototype_generator/README.md — `next build`'s parallel static-generation
  // workers crash with a native access violation on this Windows/Node setup.
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

module.exports = nextConfig;
