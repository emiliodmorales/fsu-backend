DROP TABLE IF EXISTS professors;

DROP TABLE IF EXISTS departments;

DROP TABLE IF EXISTS admins;

CREATE TABLE
  departments (
    id serial PRIMARY KEY,
    name text UNIQUE,
    description text,
    images text ARRAY,
    email text UNIQUE,
    phone text UNIQUE
  );

CREATE TABLE
  professors (
    id serial PRIMARY KEY,
    name text UNIQUE,
    bio text,
    profile_image text,
    email text UNIQUE,
    phone text UNIQUE,
    department bigint REFERENCES departments (id) ON DELETE CASCADE
  );

CREATE TABLE
  admins (
    id serial PRIMARY KEY,
    username text UNIQUE,
    password text
  );