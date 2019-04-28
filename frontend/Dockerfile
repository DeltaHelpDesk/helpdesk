FROM kkarczmarczyk/node-yarn as build
ARG REACT_APP_GRAPHQL_ENDPOINT
ARG REACT_APP_LOCALIZATION_ENDPOINT
ARG PORT
WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM node:10-alpine
WORKDIR /app
COPY --from=build /app/build /app
RUN npm install -g serve
CMD ["serve", "-s", "."]
