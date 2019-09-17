
## Installation

```bash
$ yarn install


# For local MySQL server
$ yarn begin
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# incremental rebuild (webpack)
$ yarn webpack
$ yarn start:hmr

# production mode
$ yarn start:prod
```

### TODO
  - [ ] problem with .env (when docker run from localhost), commit .env?
  - [ ] use cross-env & params (not .env)
  - [ ] init docker for MySQL somehow... (split init.sh)
