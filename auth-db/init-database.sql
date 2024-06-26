CREATE DATABASE oauth;

CREATE TABLE oauth.users (name varchar(255));

INSERT INTO users VALUES ('Firts Last');

CREATE USER 'user' IDENTIFIED WITH mysql_native_password BY 'password';

GRANT INSERT, UPDATE, DELETE, SELECT on users TO 'user';

