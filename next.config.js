/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "https://premium.gro-technologies.com/",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
      GOOGLEPAY_MERCHANDID: process.env.GOOGLEPAY_MERCHANDID,
      PAYPAL_CLIENTID: process.env.PAYPAL_CLIENTID,
      BASE_URL: process.env.BASE_URL,
      BILLWERK_ACCESS_TOKEN: process.env.BILLWERK_ACCESS_TOKEN,
      BASE_API_URL: process.env.BASE_API_URL
  },
};

module.exports = nextConfig;
