create table public.donations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id),
  campaign_id uuid references public.campaigns(id),
  payment_ref text,
  metadata jsonb,
  hash_item text,
  currency varchar,
  status varchar,
  confirmed_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  deleted_at timestamp with time zone
);