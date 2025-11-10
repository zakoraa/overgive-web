create table public.users (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  role varchar,
  created_at timestamp with time zone default now(),
  deleted_at timestamp with time zone
);
