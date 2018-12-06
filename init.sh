#!/usr/bin/env sh
docker run --rm -v $(PWD)/backend:/backend -w="/backend" kkarczmarczyk/node-yarn:latest yarn install
docker run --rm -v $(PWD)/frontend:/frontend -w="/frontend" kkarczmarczyk/node-yarn:latest yarn install
docker run --rm -v $(PWD)/mobile:/mobile -w="/mobile" kkarczmarczyk/node-yarn:latest yarn install
cp ./dckr/env/mysql-example.env ./dckr/env/mysql.env
cp ./dckr/mysql/docker-entrypoint-initdb.d/createdb.sql.example ./dckr/mysql/docker-entrypoint-initdb.d/createdb.sql
cp ./.env-example ./.env
cp ./frontend/env-example ./frontend/.env
cp ./backend/env-example ./backend/.env
