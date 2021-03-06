# Project for Delta HelpDesk
## Project structure

### Backend - /backend
Written using NestJS with TypeORM and GraphQL.

### NextJS frontend - /fe
Written using NextJS.

### Mobile application - /flutter/helpdesk_mobile
Writting using Flutter.

[![Build Status](https://helpdesk.semaphoreci.com/badges/helpdesk/branches/dev.svg)](https://helpdesk.semaphoreci.com/projects/helpdesk)

## Quick links

- [Frontend](https://delta-nextjs.herokuapp.com/)
- [Backend](https://delta-helpdesk.herokuapp.com/)
- [Trello](https://trello.com/b/MXKHJvS8/helpdesk)

## Installation/Start

### Backend

1. `cd backend`

2. `yarn install`

3. For local MySQL server (docker): `yarn begin`

4. 
   - a) Remote MySQL database: `yarn start:remote`
   - b) Local docker MySQL database: `yarn start:local` See: [Docker setup](#Docker)
   - c) Remote production MySQL database: `yarn start:prod`
 
### Frontend (Next.js)

1. Project directory `cd fe`

2. `yarn install`

3. `yarn dev`

### Docker

#### Setup

##### Windows 10 Pro + NO VirtualBox
1. Install Docker Desktop. -> Use Linux Containers
2. Go to settings -> Shared Drives
3. Select one drive

##### Windows 10 or older
1. Install [Docker Toolbox](https://github.com/docker/toolbox/releases)


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