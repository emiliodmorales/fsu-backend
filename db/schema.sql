DROP TABLE IF EXISTS professors;

DROP TABLE IF EXISTS departments;

DROP TABLE IF EXISTS admins;

CREATE TABLE
  departments (
    id serial PRIMARY KEY,
    name text UNIQUE,
    description text,
    images text ARRAY,
    email text,
    phone text
  );

CREATE TABLE
  professors (
    id serial PRIMARY KEY,
    name text UNIQUE,
    bio text,
    profile_image text,
    email text,
    phone text,
    department bigint REFERENCES departments (id) ON DELETE CASCADE
  );

CREATE TABLE
  admins (
    id serial PRIMARY KEY,
    username text UNIQUE,
    password text
  );