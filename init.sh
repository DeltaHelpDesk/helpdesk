#!/usr/bin/env sh
# docker-compose run --no-deps backend yarn install
# docker-compose run --no-deps frontend yarn install
# docker-compose run --no-deps mobile yarn install

cp -i ./dckr/env/mysql-example.env ./dckr/env/mysql.env
cp -i ./dckr/mysql/docker-entrypoint-initdb.d/createdb.sql.example ./dckr/mysql/docker-entrypoint-initdb.d/createdb.sql
cp -i ./.env-example ./.env
cp -i ./frontend/env-example ./frontend/.env
cp -i ./backend/env-example ./backend/.env
