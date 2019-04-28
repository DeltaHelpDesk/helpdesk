# Project for Delta HelpDesk
## Project structure
### Backend - /backend
Written using NestJS with TypeORM and GraphQL
`yarn start:dev`
### React frontend - /frontend

##Without Docker
### Setup
Frontend/Backend - `yarn install` / `npm install` 

### Run
Frontend - `yarn start` / `npm start`

Backend - `yarn start` / `npm start`

##Docker

### Setup
Docker for windows - run `init.bat` in powershell/cmd

Docker toolbox (virtualbox) - run `./init.sh` in Docker quickstart terminal

### Some useful commands
#### `docker-compose up [-d] [services]`
Start all services specified in `docker-compose.yml`. Argument `d` will start containers in detached mode. You can specify which services you want to start.
#### `docker-compose stop`
Stop all running containers.
#### `docker-compose logs [service]`
View logs from containers.

### Services
Backend team
- backend
- mysql

Frontend team
- backend
- frontend
- storybook (optional)

### Examples
FE - `docker-compose up -d frontend backend`

FE - `docker-compose up -d frontend`

BE - `docker-compose up -d backend mysql`