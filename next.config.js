/** @type {import('next').NextConfig} */
const urlBase = process.env.NEXT_PUBLIC_API_URL;

console.log(urlBase);

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
    /**
   * if you need proxy, then try this
   */
    async rewrites() {
      return process.env.NEXT_PUBLIC_ENVIRONMENT === 'local'
        ? [
            {
              source: '/api/:path*',
              destination: `${urlBase}/:path*`,
            },
          ]
        : [];
    },
}

module.exports = nextConfig
