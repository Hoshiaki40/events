/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "./");
    config.resolve.alias["@/src"] = path.resolve(__dirname, "src");
    // if (!isServer) {
    //   config.resolve.fallback = {
    //     ...config.resolve.fallback,
    //     crypto: require.resolve("crypto-browserify"),
    //     stream: require.resolve("stream-browserify"),
    //     buffer: require.resolve("buffer/"),
    //     util: require.resolve("util/"),
    //     assert: require.resolve("assert/"),
    //     http: require.resolve("stream-http"),
    //     https: require.resolve("https-browserify"),
    //     os: require.resolve("os-browserify/browser"),
    //     url: require.resolve("url/"),
    //   };
    // }
    return config;
  },
  experimental: {
    // runtime: "nodejs",
    // serverComponents: true,
  },
};

module.exports = nextConfig;
