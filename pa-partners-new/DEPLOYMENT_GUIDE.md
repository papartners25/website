# Deployment Guide - PA Partners Investor Portal

## 🎯 Overview

This guide will walk you through deploying the complete investor portal with:
- ✅ Supabase authentication
- ✅ Database with investor profiles
- ✅ Admin approval workflow
- ✅ Resend email integration
- ✅ Netlify deployment

## 📋 Prerequisites

You'll need access to:
- [x] Supabase project (already set up)
- [x] Resend account (API key: `re_CJyxTYCW_6sC8jgzVUM6EW8yQcWoJJsUM`)
- [x] Netlify (deployment platform)
- [x] Admin email: `info@papartners.co`

## Step 1: Set Up Supabase Database

### 1.1 Run SQL Schema

1. Go to your Supabase dashboard:
   ```
   https://supabase.com/dashboard/project/ozmyzvrifgfuxedqimzr
   ```

2. Click **SQL Editor** in the left sidebar

3. Click **New Query**

4. Copy the entire contents of `supabase-schema.sql` and paste it

5. Click **Run** (or press Cmd/Ctrl + Enter)

6. Wait for completion message: ✅ Success. No rows returned

### What This Creates:
- ✅ `investor_profiles` table with approval workflow
- ✅ `investments` table for portfolio tracking
- ✅ `distributions` table for payment history
- ✅ `tax_documents` table for K-1s and statements
- ✅ `approval_tokens` table for email approval links
- ✅ Row Level Security (RLS) policies
- ✅ Automatic profile creation on signup
- ✅ Indexes for performance

## Step 2: Configure Resend Email Domain

### 2.1 Set Up Sender Domain

1. Go to Resend dashboard: https://resend.com/domains

2. Click **Add Domain**

3. Enter: `papartners.co`

4. Add the DNS records shown to your domain provider:

   **SPF Record:**
   ```
   Type: TXT
   Name: @
   Value: v=spf1 include:_spf.resend.com ~all
   ```

   **DKIM Record:**
   ```
   Type: TXT
   Name: resend._domainkey
   Value: [provided by Resend]
   ```

   **DMARC Record:**
   ```
   Type: TXT
   Name: _dmarc
   Value: v=DMARC1; p=none; rua=mailto:dmarc@papartners.co
   ```

5. Wait for DNS propagation (~15 minutes)

6. Click **Verify Domain** in Resend

### 2.2 Add Verified Sender Email

1. In Resend, go to **Settings** → **Domains**

2. Once domain is verified, you can send from:
   - `onboarding@papartners.co` (signup notifications)
   - `info@papartners.co` (admin emails)

## Step 3: Add Environment Variables to Netlify

### 3.1 Navigate to Site Settings

1. Go to Netlify: https://app.netlify.com
2. Select your `papartners` site
3. Click **Site settings** → **Environment variables**

### 3.2 Add Required Variables

Click **Add a variable** and add each of these:

| Key | Value | Notes |
|-----|-------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ozmyzvrifgfuxedqimzr.supabase.co` | Public - OK to expose |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Public - OK to expose |
| `RESEND_API_KEY` | `re_CJyxTYCW_6sC8jgzVUM6EW8yQcWoJJsUM` | Secret - server only |
| `ADMIN_EMAIL` | `info@papartners.co` | Where approval requests go |
| `NEXT_PUBLIC_SITE_URL` | `https://papartners.co` | For email links |

### 3.3 Save and Redeploy

1. After adding all variables, click **Save**
2. Click **Deploys** in top navigation
3. Click **Trigger deploy** → **Deploy site**
4. Wait for deployment to complete (~2 minutes)

## Step 4: Test the Complete Workflow

### 4.1 Test Sign Up Flow

1. Visit: `https://papartners.co/signup`

2. Fill out the form:
   ```
   Full Name: Test Investor
   Email: your-test-email@example.com
   Password: TestPass123
   Company: Test LLC
   Notes: Testing the approval workflow
   ```

3. Click **Submit Application**

4. You should see: ✅ "Application Submitted" success page

### 4.2 Check Admin Email

1. Check inbox for `info@papartners.co`

2. You should receive an email titled:
   **"New Investor Access Request: Test Investor"**

3. Email will contain:
   - Investor details
   - ✅ **Approve Access** button (green)
   - ✕ **Deny Access** button (red)

### 4.3 Test Approval

1. Click **Approve Access** button in email

2. You'll see a success page confirming approval

3. Check the test investor's email inbox

4. They should receive:
   **"Welcome to PA Partners Investor Portal"**
   with a **Log In to Portal** button

### 4.4 Test Login

1. Visit: `https://papartners.co/login`

2. Enter the test investor credentials

3. Should redirect to `/dashboard` ✅

4. Should see portfolio with mock data

5. Click **Browse Deals** → should see opportunities

6. Click **Logout** → should return to homepage

### 4.5 Test Denial (Optional)

1. Create another test account

2. In admin email, click **Deny Access**

3. Should see denial confirmation page

4. Test investor receives polite rejection email

5. If they try to login, they'll be denied access

## Step 5: Verify Database Records

### 5.1 Check Supabase Tables

1. Go to Supabase → **Table Editor**

2. Check `investor_profiles`:
   ```sql
   SELECT * FROM investor_profiles ORDER BY created_at DESC;
   ```
   - Should see your test investors
   - `approval_status` should be 'approved' or 'denied'

3. Check `approval_tokens`:
   ```sql
   SELECT * FROM approval_tokens ORDER BY created_at DESC;
   ```
   - Should see tokens with `used = true`

## Step 6: Production Checklist

### Security

- [x] RLS policies enabled on all tables
- [x] Environment variables configured
- [x] Email domain verified
- [ ] Set up 2FA for Supabase admin account
- [ ] Set up 2FA for Resend admin account
- [ ] Review Supabase auth settings

### Email Configuration

- [ ] Verify domain in Resend (DNS records)
- [ ] Test emails from `onboarding@papartners.co`
- [ ] Set up email forwarding for `info@papartners.co`
- [ ] Configure email templates for branding

### User Management

- [ ] Create your own admin account in Supabase
- [ ] Test approval workflow with real email
- [ ] Set up notification for new signups (optional)
- [ ] Consider adding Slack/Discord webhook for new signups

### Monitoring

- [ ] Set up Sentry or error tracking
- [ ] Monitor Resend email delivery
- [ ] Check Supabase logs regularly
- [ ] Set up uptime monitoring (Pingdom/UptimeRobot)

## 📧 Email Flow Diagram

```
┌─────────────────────┐
│  Investor Signs Up  │
│   (/signup page)    │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────────┐
│ Supabase Creates User   │
│  Status: pending        │
└──────────┬──────────────┘
           │
           ↓
┌──────────────────────────────────┐
│  Email to info@papartners.co     │
│  "New Investor Access Request"   │
│  [Approve] [Deny]                │
└───────┬──────────────────────────┘
        │
        ├──────────┬──────────────────┐
        │          │                  │
   [Approve]   [Deny]            [Ignore]
        │          │                  │
        ↓          ↓                  ↓
┌───────────┐ ┌────────────┐  ┌──────────────┐
│ Status:   │ │ Status:    │  │ Token expires│
│ approved  │ │ denied     │  │ in 7 days    │
└─────┬─────┘ └──────┬─────┘  └──────────────┘
      │              │
      ↓              ↓
┌───────────────┐ ┌────────────────┐
│ Welcome Email │ │ Rejection Email│
│ to Investor   │ │ to Investor    │
└───────────────┘ └────────────────┘
      │
      ↓
┌───────────────┐
│ Investor Can  │
│ Login         │
└───────────────┘
```

## 🆘 Troubleshooting

### "Invalid API key" error
- **Cause**: Environment variables not loaded
- **Fix**: Redeploy site from Netlify dashboard

### Emails not sending
- **Cause**: Domain not verified in Resend
- **Fix**: Add DNS records and verify domain

### Approval link doesn't work
- **Cause**: Token expired or already used
- **Fix**: Regenerate by having user sign up again

### Login redirects to signup
- **Cause**: User not approved yet
- **Fix**: Check `investor_profiles` table, ensure `approval_status = 'approved'`

### Dashboard shows error
- **Cause**: RLS policies blocking data
- **Fix**: Verify user is logged in and policies are correct

## 🎉 Success Criteria

You'll know everything is working when:

1. ✅ User can sign up at `/signup`
2. ✅ Admin receives email at `info@papartners.co`
3. ✅ Clicking "Approve" sends welcome email
4. ✅ Approved user can login successfully
5. ✅ User sees dashboard with data
6. ✅ User can browse opportunities
7. ✅ Logout works correctly
8. ✅ Denied users cannot login

## 📞 Support

If you encounter issues:

1. Check Netlify deploy logs
2. Check Supabase logs (Logs Explorer)
3. Check Resend email logs
4. Review browser console for errors
5. Test in incognito mode

## Next Steps

After deployment:

1. **Create your admin account** in Supabase
2. **Test with real investors** (small group first)
3. **Monitor email delivery** for first week
4. **Collect feedback** from investors
5. **Add real investment data** to replace mocks
6. **Set up automated backups** in Supabase

---

**Ready to Deploy?** Follow the steps above in order. Each step builds on the previous one.
