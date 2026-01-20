/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Handle pdfkit's font files
      config.externals = config.externals || []
      config.externals.push({
        'pdfkit': 'commonjs pdfkit',
      })
    }
    return config
  },
  // Ensure pdfkit works in API routes
  experimental: {
    serverComponentsExternalPackages: ['pdfkit'],
  },
}

export default nextConfig
