CREATE DATABASE oauth;

USE oauth;

CREATE TABLE Roles (
    id int AUTO_INCREMENT PRIMARY KEY,
    role varchar(255) NOT NULL,
    CONSTRAINT roleUnique UNIQUE (role)
);

INSERT INTO
    Roles (role)
VALUES
    ('User');

CREATE TABLE Users (
    id int AUTO_INCREMENT PRIMARY KEY,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    roleId int NOT NULL,
    CONSTRAINT login UNIQUE (username),
    FOREIGN KEY (roleId) REFERENCES Roles(id)
);

CREATE USER 'user' IDENTIFIED WITH mysql_native_password BY 'password';

GRANT ALL PRIVILEGES on Users TO 'user';

GRANT ALL PRIVILEGES on Roles TO 'user';