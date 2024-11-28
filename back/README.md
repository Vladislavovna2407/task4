docker run \
    --name task4 \
    --env=POSTGRES_PASSWORD=root \
    --env=POSTGRES_USER=root \
    --env=POSTGRES_DB=task4 \
    -p 5432:5432 -d postgres:16-alpine

docker run \
    --name pgadmin-container \
    --env PGADMIN_DEFAULT_EMAIL=root@root.com \
    --env PGADMIN_DEFAULT_PASSWORD=root \
    -p 5433:80 -d dpage/pgadmin4

https://medium.com/@marvinjungre/get-postgresql-and-pgadmin-4-up-and-running-with-docker-4a8d81048aea

docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' task4    


CREATE TABLE app_user (
    app_user_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    is_active BOOLEAN NOT NULL,
    last_changed TIMESTAMP NOT NULL
);

CREATE UNIQUE INDEX email_lower_idx ON app_user (LOWER(email));


INSERT INTO public.app_user(
	email, name, password, is_active, last_changed)
	VALUES ('sergey@gmail.com', 'Sergey', 'root', true, CURRENT_TIMESTAMP)

select * from app_user