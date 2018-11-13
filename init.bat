docker run --rm -v %cd%\backend:/backend -w="/backend" kkarczmarczyk/node-yarn:latest yarn install
docker run --rm -v %cd%\frontend:/frontend -w="/frontend" kkarczmarczyk/node-yarn:latest yarn install
copy .\dckr\env\mysql-example.env .\dckr\env\mysql.env
copy .\dckr\mysql\docker-entrypoint-initdb.d\createdb.sql.example .\dckr\mysql\docker-entrypoint-initdb.d\createdb.sql
copy .\.env-example .\.env
copy .\frontend\env-example .\frontend\.env
copy .\backend\env-example .\backend\.env
pause