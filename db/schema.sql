DROP TABLE IF EXISTS professors;

DROP TABLE IF EXISTS departments;

DROP TABLE IF EXISTS users;

CREATE TABLE
  departments (
    id serial PRIMARY KEY,
    name varchar(255) UNIQUE NOT NULL,
    description text,
    images text ARRAY,
    email varchar(255) UNIQUE,
    phone varchar(255) UNIQUE
  );

CREATE TABLE
  professors (
    id serial PRIMARY KEY,
    name varchar(255) UNIQUE NOT NULL,
    bio varchar(255),
    profile_image text,
    email varchar(255) UNIQUE,
    phone varchar(255) UNIQUE,
    department_id int NOT NULL REFERENCES departments (id) ON DELETE CASCADE
  );

CREATE TABLE
  users (
    id serial PRIMARY KEY,
    username varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL
  );