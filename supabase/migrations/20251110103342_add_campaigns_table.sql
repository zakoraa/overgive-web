-- Enum kategori kampanye
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

-- Enum status kampanye
create type campaign_status as enum (
  'ongoing',
  'completed'
);

-- Tabel campaigns
create table public.campaigns (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null, 
  background_html text not null,
  category campaign_category not null,
  target_amount numeric,
  collected_amount numeric default 0,
  status campaign_status default 'ongoing',
  created_by uuid references public.users(id),
  ended_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  deleted_at timestamp with time zone
);
