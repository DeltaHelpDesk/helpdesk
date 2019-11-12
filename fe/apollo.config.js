// const config = require('./next.config.js');

module.exports = {
    client: {
        excludes: [
            './pages/**/*.tsx',
            './queries/**/*.ts',
            './components/**/*.tsx',
            './generated/**/*',
        ],
        tagName: 'gql',
        addTypename: true,
        service: {
            name: 'graphql-gateway',
            url: 'https://delta-helpdesk.herokuapp.com/graphql',
            localSchemaFile: './generated/schema.json',
        },
    },
};