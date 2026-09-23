# VeloSys – Multi-Tenant Implementation Notes

## What was added

### 1. Database schema (`supabase/migrations/0001_velosys_multitenant.sql`)
- `tenants` – businesses
- `phone_numbers` – Twilio numbers per tenant
- `leads` – now tenant-scoped + richer fields
- `messages` – conversation history
- `sequences` – configurable follow-up templates
- `appointments`
- `tenant_members` – for future team support
- Full RLS policies
- Industry starter sequences (General, HVAC, Fence, Roofing)

### 2. New server functions (`src/lib/tenants.ts`)
- `createTenant` – creates business + copies industry sequence
- `listMyTenants`
- `getTenant`
- `updateTenant`

### 3. Updated lead functions (`src/lib/leads.functions.ts`)
- All operations now require `tenant_id`
- Statuses expanded: `new | qualifying | follow_up | booked | won | lost | opted_out`
- Public `captureLead` now takes `tenant_id` instead of `user_id`

## Next steps to run

1. **Run the migration** in Supabase SQL Editor  
   Copy the contents of `supabase/migrations/0001_velosys_multitenant.sql` and execute it.

2. **Regenerate types** (optional but recommended)  
   ```bash
   npx supabase gen types typescript --project-id YOUR_PROJECT > src/integrations/supabase/types.ts
   ```

3. **Update the dashboard**  
   - On first login, if the user has no tenants → show a “Create your business” form that calls `createTenant`.
   - Store the active `tenant_id` in local state or a context.
   - Pass `tenant_id` to every `listLeads` / `createLead` / etc. call.

4. **Update capture form**  
   Change `/capture/$userId` → `/capture/$tenantId` (or keep userId and resolve the primary tenant).

5. **Add Twilio + AI layer** (next phase)  
   Port the recovery engine from Fence-Link once the multi-tenant foundation is solid.

## Industry options currently supported
- general
- hvac
- fence
- roofing
- plumbing
- electrical
- solar
- landscaping
- other
