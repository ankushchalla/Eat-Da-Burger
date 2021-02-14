DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;
USE burgers_db;
CREATE TABLE burgers (
    id int NOT NULL AUTO_INCREMENT,
    burger varchar(255) NOT NULL,
    devoured BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id)
);

INSERT INTO burgers (burger) VALUES
("Double-Double"), ("Bacon Cheesburger"), ("Blackbean");

