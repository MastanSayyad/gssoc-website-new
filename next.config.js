module.exports = {
  images: {
    loader: "akamai",
    path: "/",
    // domains: ["user-images.githubusercontent.com"],
  },
  basePath: "",
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Or specify your allowed origin
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
  env: {
    JSON_RPC_PROVIDER: process.env.JSON_RPC_PROVIDER,
    GH_ACCESS_TOKEN: process.env.GH_ACCESS_TOKEN,
  },
  assetPrefix: "",
};
