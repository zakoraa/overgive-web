create table public.campaign_delivery_histories (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references public.campaigns(id),
  note text,
  evidence_image_path jsonb,
  hash_item text,
  created_by uuid references public.users(id),
  created_at timestamp with time zone default now()
);