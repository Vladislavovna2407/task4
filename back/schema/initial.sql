CREATE TABLE app_user (
    app_user_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    is_active BOOLEAN NOT NULL,
    last_changed TIMESTAMP NOT NULL
);

CREATE INDEX email_lower_idx ON app_user (LOWER(email));