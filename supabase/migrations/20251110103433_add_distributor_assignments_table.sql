create table public.distributor_assignments (
  id uuid primary key default gen_random_uuid(),
  distributor_id uuid references public.users(id),
  campaign_id uuid references public.campaigns(id),
  assigned_by uuid references public.users(id),
  assigned_at timestamp with time zone default now(),
  created_at timestamp with time zone default now(),
  deleted_at timestamp with time zone
);
