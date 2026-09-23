-- VeloSys Multi-Tenant Schema (safe upgrade)
-- Run this entire script in Supabase SQL Editor

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────
-- TENANTS
-- ─────────────────────────────────────────────────────────────
create table if not exists public.tenants (
  id                uuid primary key default gen_random_uuid(),
  owner_user_id     uuid not null references auth.users(id) on delete cascade,
  name              text not null,
  slug              text unique,
  industry          text not null default 'general',
  brand_voice       text default 'friendly, professional, direct',
  logo_url          text,
  primary_color     text default '#1D4ED8',
  timezone          text default 'America/Chicago',
  status            text not null default 'trial'
                    check (status in ('trial', 'active', 'paused', 'cancelled')),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists tenants_owner_idx on public.tenants(owner_user_id);
create index if not exists tenants_slug_idx on public.tenants(slug);

-- ─────────────────────────────────────────────────────────────
-- PHONE NUMBERS
-- ─────────────────────────────────────────────────────────────
create table if not exists public.phone_numbers (
  id                uuid primary key default gen_random_uuid(),
  tenant_id         uuid not null references public.tenants(id) on delete cascade,
  twilio_sid        text,
  phone_number      text not null,
  friendly_name     text,
  is_primary        boolean not null default true,
  a2p_status        text not null default 'pending'
                    check (a2p_status in ('pending', 'in_review', 'verified', 'rejected')),
  created_at        timestamptz not null default now()
);

create index if not exists phone_numbers_tenant_idx on public.phone_numbers(tenant_id);

-- ─────────────────────────────────────────────────────────────
-- LEADS — upgrade existing table if present
-- ─────────────────────────────────────────────────────────────
create table if not exists public.leads (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now()
);

-- Add columns that may be missing (safe on existing LeadFlow table)
alter table public.leads add column if not exists tenant_id uuid;
alter table public.leads add column if not exists homeowner_name text;
alter table public.leads add column if not exists phone text;
alter table public.leads add column if not exists email text;
alter table public.leads add column if not exists company text;
alter table public.leads add column if not exists address text;
alter table public.leads add column if not exists city text;
alter table public.leads add column if not exists source text default 'manual';
alter table public.leads add column if not exists status text default 'new';
alter table public.leads add column if not exists score integer default 0;
alter table public.leads add column if not exists estimated_value numeric(12,2);
alter table public.leads add column if not exists custom_fields jsonb default '{}'::jsonb;
alter table public.leads add column if not exists next_follow_up_at timestamptz;
alter table public.leads add column if not exists follow_up_step integer default 0;
alter table public.leads add column if not exists notes text;
alter table public.leads add column if not exists updated_at timestamptz default now();
alter table public.leads add column if not exists user_id uuid;

-- Backfill homeowner_name from old "name" column if it exists
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'leads' and column_name = 'name'
  ) then
    update public.leads
    set homeowner_name = name
    where homeowner_name is null and name is not null;
  end if;
end $$;

-- Ensure homeowner_name has a value
update public.leads set homeowner_name = coalesce(homeowner_name, 'Unknown') where homeowner_name is null;

-- Indexes
create index if not exists leads_tenant_idx on public.leads(tenant_id);
create index if not exists leads_status_idx on public.leads(tenant_id, status);
create index if not exists leads_next_followup_idx on public.leads(tenant_id, next_follow_up_at)
  where next_follow_up_at is not null;

-- ─────────────────────────────────────────────────────────────
-- MESSAGES
-- ─────────────────────────────────────────────────────────────
create table if not exists public.messages (
  id                uuid primary key default gen_random_uuid(),
  tenant_id         uuid not null references public.tenants(id) on delete cascade,
  lead_id           uuid not null references public.leads(id) on delete cascade,
  direction         text not null check (direction in ('inbound', 'outbound')),
  channel           text not null default 'sms' check (channel in ('sms', 'email', 'voice')),
  body              text not null,
  twilio_sid        text,
  status            text,
  is_ai_generated   boolean not null default false,
  created_at        timestamptz not null default now()
);

create index if not exists messages_lead_idx on public.messages(lead_id);
create index if not exists messages_tenant_idx on public.messages(tenant_id);

-- ─────────────────────────────────────────────────────────────
-- SEQUENCES
-- ─────────────────────────────────────────────────────────────
create table if not exists public.sequences (
  id                uuid primary key default gen_random_uuid(),
  tenant_id         uuid references public.tenants(id) on delete cascade,
  name              text not null,
  industry          text,
  is_active         boolean not null default true,
  steps             jsonb not null default '[]'::jsonb,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists sequences_tenant_idx on public.sequences(tenant_id);

-- ─────────────────────────────────────────────────────────────
-- APPOINTMENTS
-- ─────────────────────────────────────────────────────────────
create table if not exists public.appointments (
  id                uuid primary key default gen_random_uuid(),
  tenant_id         uuid not null references public.tenants(id) on delete cascade,
  lead_id           uuid not null references public.leads(id) on delete cascade,
  scheduled_at      timestamptz not null,
  duration_minutes  integer not null default 60,
  service_type      text,
  status            text not null default 'scheduled'
                    check (status in ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show')),
  notes             text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists appointments_tenant_idx on public.appointments(tenant_id);
create index if not exists appointments_lead_idx on public.appointments(lead_id);

-- ─────────────────────────────────────────────────────────────
-- TENANT MEMBERS
-- ─────────────────────────────────────────────────────────────
create table if not exists public.tenant_members (
  tenant_id         uuid not null references public.tenants(id) on delete cascade,
  user_id           uuid not null references auth.users(id) on delete cascade,
  role              text not null default 'member'
                    check (role in ('owner', 'admin', 'member')),
  created_at        timestamptz not null default now(),
  primary key (tenant_id, user_id)
);

-- ─────────────────────────────────────────────────────────────
-- UPDATED_AT TRIGGER
-- ─────────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists tenants_updated_at on public.tenants;
create trigger tenants_updated_at
  before update on public.tenants
  for each row execute function public.set_updated_at();

drop trigger if exists leads_updated_at on public.leads;
create trigger leads_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

drop trigger if exists sequences_updated_at on public.sequences;
create trigger sequences_updated_at
  before update on public.sequences
  for each row execute function public.set_updated_at();

drop trigger if exists appointments_updated_at on public.appointments;
create trigger appointments_updated_at
  before update on public.appointments
  for each row execute function public.set_updated_at();

-- ─────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────────────
alter table public.tenants enable row level security;
alter table public.phone_numbers enable row level security;
alter table public.leads enable row level security;
alter table public.messages enable row level security;
alter table public.sequences enable row level security;
alter table public.appointments enable row level security;
alter table public.tenant_members enable row level security;

create or replace function public.user_tenant_ids()
returns setof uuid as $$
  select tenant_id from public.tenant_members where user_id = auth.uid()
  union
  select id from public.tenants where owner_user_id = auth.uid();
$$ language sql security definer stable;

-- Drop old policies so we can recreate cleanly
do $$
declare
  r record;
begin
  for r in
    select policyname, tablename
    from pg_policies
    where schemaname = 'public'
      and tablename in ('tenants','phone_numbers','leads','messages','sequences','appointments','tenant_members')
  loop
    execute format('drop policy if exists %I on public.%I', r.policyname, r.tablename);
  end loop;
end $$;

create policy "Users can view their tenants"
  on public.tenants for select
  using (id in (select public.user_tenant_ids()));

create policy "Users can insert their own tenant"
  on public.tenants for insert
  with check (owner_user_id = auth.uid());

create policy "Owners can update their tenants"
  on public.tenants for update
  using (owner_user_id = auth.uid());

create policy "Users can manage phone numbers of their tenants"
  on public.phone_numbers for all
  using (tenant_id in (select public.user_tenant_ids()));

create policy "Users can manage leads of their tenants"
  on public.leads for all
  using (
    tenant_id in (select public.user_tenant_ids())
    or user_id = auth.uid()
  );

create policy "Users can manage messages of their tenants"
  on public.messages for all
  using (tenant_id in (select public.user_tenant_ids()));

create policy "Users can view system + their sequences"
  on public.sequences for select
  using (tenant_id is null or tenant_id in (select public.user_tenant_ids()));

create policy "Users can manage their sequences"
  on public.sequences for all
  using (tenant_id in (select public.user_tenant_ids()));

create policy "Users can manage appointments of their tenants"
  on public.appointments for all
  using (tenant_id in (select public.user_tenant_ids()));

create policy "Users can view members of their tenants"
  on public.tenant_members for select
  using (tenant_id in (select public.user_tenant_ids()));

create policy "Owners can manage members"
  on public.tenant_members for all
  using (
    tenant_id in (
      select id from public.tenants where owner_user_id = auth.uid()
    )
  );

-- ─────────────────────────────────────────────────────────────
-- SEED: Industry starter sequences (only if not already present)
-- ─────────────────────────────────────────────────────────────
insert into public.sequences (tenant_id, name, industry, is_active, steps)
select null, 'Standard Recovery – General', 'general', true,
  '[
    {"step": 0, "delay_hours": 0,  "template": "Hey {{first_name}}, thanks for reaching out! This is the team at {{company_name}}. How can we help you today? Reply STOP to opt out."},
    {"step": 1, "delay_hours": 24, "template": "Hi {{first_name}}, just following up on your request. Still interested? Happy to answer any questions. Reply STOP to opt out."},
    {"step": 2, "delay_hours": 72, "template": "Hi {{first_name}}, checking in one more time. We have openings this week if you''d like to schedule. Reply STOP to opt out."},
    {"step": 3, "delay_hours": 168,"template": "Hey {{first_name}}, final follow-up from {{company_name}}. Should we hold a spot for you or close out this request? Reply STOP to opt out."}
  ]'::jsonb
where not exists (select 1 from public.sequences where tenant_id is null and industry = 'general');

insert into public.sequences (tenant_id, name, industry, is_active, steps)
select null, 'Standard Recovery – HVAC', 'hvac', true,
  '[
    {"step": 0, "delay_hours": 0,  "template": "Hey {{first_name}}, this is {{company_name}}. Sorry you''re dealing with {{service}} issues. What''s your zip code and is now a good time for us to call? Reply STOP to opt out."},
    {"step": 1, "delay_hours": 24, "template": "Hi {{first_name}}, just confirming we received your request. We can usually get someone out same-day or next-day. Want us to schedule? Reply STOP to opt out."},
    {"step": 2, "delay_hours": 72, "template": "Hi {{first_name}}, still need help with your system? We have technicians available this week. Reply STOP to opt out."},
    {"step": 3, "delay_hours": 168,"template": "Hey {{first_name}}, final check-in from {{company_name}}. Should we hold a service window or archive this request? Reply STOP to opt out."}
  ]'::jsonb
where not exists (select 1 from public.sequences where tenant_id is null and industry = 'hvac');

insert into public.sequences (tenant_id, name, industry, is_active, steps)
select null, 'Standard Recovery – Fence', 'fence', true,
  '[
    {"step": 0, "delay_hours": 0,  "template": "Hey {{first_name}}, it''s {{company_name}}! Saw we missed you. Still looking for a fence quote? Roughly how many feet, and wood, vinyl, or aluminum? Reply STOP to opt out."},
    {"step": 1, "delay_hours": 24, "template": "Hey {{first_name}}, just confirming you got our estimate. Any questions on materials or post footings? Reply STOP to opt out."},
    {"step": 2, "delay_hours": 72, "template": "Hi {{first_name}}, quick check on your fence project. We can waive the equipment haul fee if we book back-to-back jobs in your area. Interested? Reply STOP to opt out."},
    {"step": 3, "delay_hours": 168,"template": "Hey {{first_name}}, final follow-up from {{company_name}}. Should we hold your build date or close the file? Reply STOP to opt out."}
  ]'::jsonb
where not exists (select 1 from public.sequences where tenant_id is null and industry = 'fence');

insert into public.sequences (tenant_id, name, industry, is_active, steps)
select null, 'Standard Recovery – Roofing', 'roofing', true,
  '[
    {"step": 0, "delay_hours": 0,  "template": "Hey {{first_name}}, this is {{company_name}}. Thanks for reaching out about your roof. Is this for a repair or full replacement, and what''s the best number to reach you? Reply STOP to opt out."},
    {"step": 1, "delay_hours": 24, "template": "Hi {{first_name}}, following up on your roofing request. We offer free inspections this week. Want us to put you on the schedule? Reply STOP to opt out."},
    {"step": 2, "delay_hours": 72, "template": "Hi {{first_name}}, still thinking about the roof work? We can often work with insurance and get you a clear timeline. Reply STOP to opt out."},
    {"step": 3, "delay_hours": 168,"template": "Hey {{first_name}}, final note from {{company_name}}. Should we keep a slot open or close this request? Reply STOP to opt out."}
  ]'::jsonb
where not exists (select 1 from public.sequences where tenant_id is null and industry = 'roofing');

notify pgrst, 'reload schema';
