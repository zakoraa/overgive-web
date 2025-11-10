create table public.operational_fees (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references public.campaigns(id),
  total_donated numeric,
  max_allowed_fee numeric,
  gas_fee_total numeric,
  gateway_fee_total numeric,
  other_fee_total jsonb,
  fee_taken numeric,
  net_amount numeric,
  calculated_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  deleted_at timestamp with time zone
);