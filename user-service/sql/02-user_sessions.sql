create table user_sessions (
  session_id text primary key,
  username text not null,
  token text not null,
  created_at timestamptz not null
);