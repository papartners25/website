# Authentication Workflow

## Current Implementation (Mock Auth)

The investor portal uses a simple sessionStorage-based authentication system for development. This will be replaced with Supabase authentication in production.

### User Flow

```
Public Website
    ↓
Login Page (/login)
    ↓
[Authentication Check]
    ↓
Dashboard (/dashboard)
    ├── Overview Tab (Portfolio Summary + New Opportunities CTA)
    ├── Investments Tab (Existing Investments)
    ├── Distributions Tab (Payment History)
    └── Tax Documents Tab (K-1s, Statements)
    ↓
Opportunities Page (/opportunities)
    └── Browse Available Deals (Dataroom Content)
```

### Protected Routes

1. **`/dashboard`** - Investor portfolio and account overview
2. **`/opportunities`** - Available investment deals (requires authentication)

### Public Routes

1. **`/`** - Homepage
2. **`/about`** - About PA Partners
3. **`/portfolio`** - Portfolio showcase with portal preview
4. **`/real-estate`** - Real estate information
5. **`/team`** - Team page
6. **`/contact`** - Contact form
7. **`/login`** - Login page
8. **`/dataroom`** - Currently shows access gate (will be replaced by `/opportunities` for authenticated users)

## Authentication Logic

### Login (`/login`)
```typescript
// On successful login
sessionStorage.setItem("isLoggedIn", "true");
router.push("/dashboard");
```

### Protected Page Check (`/opportunities`)
```typescript
// Check if user is authenticated
const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
if (!isLoggedIn) {
  router.push("/login");
}
```

### Logout
```typescript
// Clear authentication
sessionStorage.removeItem("isLoggedIn");
window.location.href = "/";
```

## Dashboard Features

### Overview Tab
- Portfolio metrics (Total Invested, Current Value, Distributions, Returns)
- Performance charts
- Active investments summary
- Recent distributions
- **New Opportunities CTA** - Prominent banner linking to `/opportunities`

### Opportunities Page
- Shows all available deals from dataroom
- Quick stats (Available Deals, Target IRR, Hold Period)
- Full deal cards with expandable details
- Filter by property type
- Investment process guidance
- Back navigation to dashboard

## Design Principles

### UX/UI Features
1. **Clean Navigation** - Clear pathways between portfolio and opportunities
2. **Visual Hierarchy** - Important CTAs stand out with amber accents
3. **Empty States** - Helpful messages when no data is available
4. **Consistent Design** - All pages use the same surface, shadow, and color system
5. **Mobile Responsive** - Works on all device sizes
6. **Loading States** - Smooth transitions and loading indicators

### Security (Current)
- Basic session-based authentication
- Routes redirect to login if not authenticated
- Session cleared on logout
- **Note**: This is for development only. Production requires proper authentication.

## Migration to Supabase

When ready to implement real authentication:

1. **Install Supabase**
   ```bash
   npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
   ```

2. **Replace Login Logic**
   ```typescript
   // src/app/login/page.tsx
   const { data, error } = await supabase.auth.signInWithPassword({
     email: formData.get('email') as string,
     password: formData.get('password') as string,
   });
   ```

3. **Update Protected Routes**
   ```typescript
   // src/app/opportunities/page.tsx
   const { data: { session } } = await supabase.auth.getSession();
   if (!session) router.push('/login');
   ```

4. **Update Logout**
   ```typescript
   // src/app/dashboard/page.tsx
   await supabase.auth.signOut();
   ```

5. **Remove Mock Auth**
   - Delete sessionStorage calls
   - Remove DATAROOM_LOCKED flag from `/dataroom/page.tsx`
   - Integrate user data with investor profile

## Data Integration

### Current State
- Mock data in `/src/lib/investor-mock-data.ts`
- Static investor profile and portfolio data

### Production Integration
Replace mock functions with:
- **AppFolio** - Property performance and occupancy data
- **QuickBooks** - Financial data and tax documents
- **Stripe** - Distribution payment tracking
- **Lindy AI** - Unified data aggregation layer

See `DASHBOARD_README.md` for detailed API integration guide.

## Temporary Access Control

The `/dataroom` page currently shows an access gate to protect confidential information. Once authentication is live:

1. Set `DATAROOM_LOCKED = false` in `/src/app/dataroom/page.tsx`
2. Or redirect `/dataroom` to `/opportunities` for authenticated users
3. Keep the access gate for non-authenticated visitors

## Testing

### Test the Flow
1. Visit http://localhost:3000
2. Click "Investor Login" or navigate to `/login`
3. Enter any email/password and click "Sign in"
4. You'll be routed to `/dashboard`
5. Click "Browse Deals" in the opportunities banner
6. View available deals on `/opportunities`
7. Click "Back to Dashboard" to return
8. Click "Logout" to clear session and return to homepage

### Reset Session
To test the auth flow again:
- Click logout
- Or clear sessionStorage in browser DevTools
- Or open an incognito window
