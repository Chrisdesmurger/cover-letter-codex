-- SQL script to set up required tables for Cover Letter Codex

-- Enable uuid extension for random UUID generation
create extension if not exists "uuid-ossp";

-- Users table for credential based auth
create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  -- bcrypt hashed password
  password text not null,
  generation_count integer not null default 0
);

-- Documents uploaded by users (CVs or job offers)
create table if not exists documents (
  id uuid primary key default uuid_generate_v4(),
  path text not null,
  text text not null,
  type text not null,
  created_at timestamp with time zone default now()
);
