/**
 * This file is here because apollo service:download use localSchemaFile from base config
 * instead of remote endpoint. But we want to keep localSchemaFile in base config for IDE
 * to make autocomplete and validations working without running Express server.
 */
const baseConfig = require('./apollo.config.js');

module.exports = {
  client: {
    ...baseConfig.client,
    service: {
      ...baseConfig.client.service,
      localSchemaFile: undefined,
    },
  },
};
