const config = {
  testDir: 'e2e',
  webServer: {
    command: 'npx http-server public -p 8081',
    port: 8081,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:8081',
    headless: true,
  },
};

module.exports = config;
