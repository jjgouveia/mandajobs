/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects () {
    return [
      {
        source: "/github",
        destination: "https://github.com/jjgouveia/mandajobs",
        permanent: false,
      },
      {
        source: "/deploy",
        destination: "https://github.com/jjgouveia/mandajobs",
        permanent: false,
      },
    ];
  },
};
