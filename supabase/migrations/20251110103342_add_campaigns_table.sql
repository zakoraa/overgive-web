create type campaign_category as enum (
  'education',
  'natural_disaster',
  'health',
  'orphanage',
  'worship_place',
  'disability',
  'environment',
  'others'
);

create table public.campaigns (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category campaign_category not null,
  target_amount numeric,
  collected_amount numeric default 0,
  currency varchar,
  status varchar,
  created_by uuid references public.users(id),
  ended_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  deleted_at timestamp with time zone
);