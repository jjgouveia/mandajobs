/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/bolodissenoura/linkesearch",
        permanent: false,
      },
      {
        source: "/deploy",
        destination: "https://github.com/bolodissenoura/linkesearch",
        permanent: false,
      },
    ];
  },
};
