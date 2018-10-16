#!/bin/sh

node_modules/.bin/wait-on tcp:mysql:3306 && yarn start:dev