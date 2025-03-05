// next.config.js

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // 301 redirect (permanent)
      },
    ];
  },
};
