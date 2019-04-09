# Requirements
backend & database
(in root directory)

`docker-compose up mysql backend`

# Initial setup
(in mobile directory)

`npm install`

`npm start`

app will now be server on `localhost:4200`

# Run in emulator (Android)
(in mobile directory)

(using **capacitor** & Android studio)

(https://ionicframework.com/docs/building/android)

(https://capacitor.ionicframework.com/docs/basics/building-your-app)

At leate once wee need to build our application:

`npm run build-emulator`

`npx cap copy`

`npx cap open android`

start project in Android studio

every time we change build of our application, 
we need to sync files to android studio project

`npx cap copy`

# Create typed queries to GraphQL server
(in mobile directory)
- write query to folder `/queries`
- run `npm run gql-download`
- run `npm run gql-generate`
- query types (Typescript) are generate in `/types/types.ts`

# Application stucture

```
src
    app
        components
        - Universal components without state
        ----
        guards
        - Guards pages - authentication access restrictions
        ----
        assets
        - images, fonts, icons, static content
        ----
        pages
            about: mobile application developers presentation page
            task
              task-detail: task detail page
              task-form: create new task page
              task-list: task list page
              authenticate: login page
            ----
        queries
        - raw queries to graphql backend
        ----
        services
        - model layers - fetch data from graphql backend
enviroments
- environment specific settings
```