const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  // Extending default storybook config, we need to add ts loader due to tsx files.

  // For example, add typescript loader:
  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: path.resolve(__dirname, "../src"),
    loader: require.resolve("ts-loader")
  });
  defaultConfig.resolve.extensions.push(".ts", ".tsx");

  return defaultConfig;
};