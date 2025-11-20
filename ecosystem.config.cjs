module.exports = {
  apps: [
    {
      name: "infectionx-backend",
      script: "dist/server.js",
      cwd: "/var/www/infectionx",
      interpreter: "node"
    }
  ]
};

