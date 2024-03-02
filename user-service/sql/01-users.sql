create table users (
  username text primary key,
  password text not null,
  created_at timestamptz not null,
  updated_at timestamptz not null
);