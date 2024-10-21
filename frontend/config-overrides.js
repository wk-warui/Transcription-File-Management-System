// config-overrides.js
module.exports = function override(config, env) {
  if (config.devServer) {
    // Setting up middlewares correctly
    config.devServer.setupMiddlewares = (middlewares, devServer) => {
      console.log('Webpack Dev Server is running...');
      return middlewares;
    };
  } else {
    // If devServer is not defined, add a console warning
    console.warn("Warning: devServer is not defined in the config. Ensure you're using the correct setup.");
  }
  return config;
};

