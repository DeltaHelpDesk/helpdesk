# Project for Delta HelpDesk
## Project structure
### Backend - /backend
Written using NestJS with TypeORM and GraphQL
### React frontend - /frontend
Written using React. **TODO: NextJS**


## Installation/Start

### Backend

1. `cd backend`

2. `yarn install`

3. 
   - a) Remote MySQL database: `yarn start:remote`
   - b) Local docker MySQL database: See: [Docker setup](#Docker) **Not working**
   - c) Remote production MySQL database: `yarn start:prod`

### Frontend

1. Project directory `cd frontend`

2. 
   - a) Local backend: `yarn start:local`
   - b) Remote backend: `yarn start:remote`

### Docker

#### Setup

##### Windows 10 Pro + NO VirtualBox
1. a) Install Docker Desktop.

##### Windows 10 or older
1. b) Install [Docker Toolbox](https://github.com/docker/toolbox/releases)


#### Init

2. `bash init.sh` in Git bash **TODO: Without init.sh**
   - This will generate required files (.env, ...)


3. `docker-compose up mysql`
    - This **should** start MySQL server in docker

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

#### TODO
 - [ ] https://circleci.com/hooks/github - Tests