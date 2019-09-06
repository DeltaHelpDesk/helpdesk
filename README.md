# Project for Delta HelpDesk
## Project structure
### Backend - /backend
Written using NestJS with TypeORM and GraphQL
### React frontend - /frontend

### Without Docker
#### Setup
Frontend/Backend - `yarn install` / `npm install` 

#### Run
Frontend/Backend - `yarn start` / `npm start`

### Docker

#### Setup

##### Windows 10 Pro + NO VirtualBox
Install Docker Desktop.

##### Windows 10 or older
Install Docker Toolbox

Docker toolbox (virtualbox) - `bash init.sh` in Git bash
- This will generate required files (.env, ...)

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
FE & BE - `docker-compose up -d frontend backend`

FE - `docker-compose up -d frontend`

BE - `docker-compose up -d backend mysql`