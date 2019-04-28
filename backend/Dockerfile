FROM kkarczmarczyk/node-yarn:latest as build
WORKDIR /app
COPY . .
RUN yarn install
RUN node_modules/.bin/tsc
RUN find src -name '*.graphql' -type f -exec cp {} dist \;
RUN cp -r src/localization/localizations dist/localization/localizations
RUN yarn install --production

FROM kkarczmarczyk/node-yarn:latest
WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
CMD ["node", "dist/main.js"]
EXPOSE 3000
