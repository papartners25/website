# Investor Dashboard Documentation

## Overview

The investor dashboard is a comprehensive portal for investors to track their real estate portfolio performance, view distributions, access tax documents, and monitor investment metrics in real-time.

## Features

### 1. Portfolio Overview
- **Key Metrics Display**: Total invested, current value, distributions, and returns
- **Performance Charts**: Visual representation of portfolio growth over time
- **Investment Summary**: Quick overview of all active investments
- **Recent Activity**: Latest distributions and portfolio changes

### 2. Investment Details
- Property-specific performance metrics
- Ownership percentage and investment amounts
- Key financial indicators (IRR, Cash-on-Cash, ROI)
- Property type categorization
- Investment status tracking

### 3. Distribution History
- Complete transaction history
- Payment details with Stripe integration points
- Quarterly distribution tracking
- Export functionality for tax purposes

### 4. Tax Documents
- Schedule K-1 forms
- 1099 forms
- Year-end investment summaries
- Distribution summaries
- Document download functionality

### 5. Empty State Handling
- Graceful handling when no data exists
- Clear calls-to-action for new investors
- Informative messaging about upcoming documents

## API Integration Points

The dashboard is designed to integrate with the following services:

### AppFolio (Property Management)
**Purpose**: Real-time property performance data

```typescript
// Replace in: src/lib/investor-mock-data.ts
export async function getPropertyPerformance(propertyId: string) {
  const response = await fetch(`/api/appfolio/properties/${propertyId}/performance`);
  return response.json();
}
```

**Expected Data**:
- Occupancy rates
- Rent roll
- Operating expenses
- Maintenance requests
- Tenant information

### QuickBooks (Accounting)
**Purpose**: Financial data and tax documents

```typescript
// Replace in: src/lib/investor-mock-data.ts
export async function getTaxDocuments(investorId: string) {
  const response = await fetch(`/api/quickbooks/investor/${investorId}/documents`);
  return response.json();
}
```

**Expected Data**:
- Revenue and expenses
- Net operating income
- K-1 forms
- Year-end statements
- Financial reports

### Stripe (Payment Processing)
**Purpose**: Distribution payment tracking

```typescript
// Replace in: src/lib/investor-mock-data.ts
export async function getDistributions(investorId: string) {
  const response = await fetch(`/api/stripe/payments?customer=${investorId}`);
  return response.json();
}
```

**Expected Data**:
- Payment IDs
- Transaction amounts
- Payment dates
- Payment methods
- Payment status

### Lindy AI (Agentic Data Aggregation)
**Purpose**: Unified data layer across all services

```typescript
// Recommended approach: Use Lindy AI to aggregate all data sources
export async function getDashboardData(investorId: string) {
  const response = await fetch(`/api/lindy/investor/${investorId}/dashboard`, {
    headers: {
      'Authorization': `Bearer ${process.env.LINDY_API_KEY}`
    }
  });
  return response.json();
}
```

**Benefits**:
- Single API endpoint for all investor data
- Automatic data synchronization
- Reduced API complexity
- Built-in error handling and retries

## Authentication Flow

Currently using mock authentication. To integrate Supabase:

### 1. Install Supabase
```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

### 2. Update Login Page
```typescript
// src/app/login/page.tsx
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });
  
  if (!error) {
    router.push('/dashboard');
  }
};
```

### 3. Protect Dashboard Route
```typescript
// src/app/dashboard/page.tsx
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const supabase = createClientComponentClient();
const router = useRouter();

useEffect(() => {
  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/login');
    }
  };
  checkUser();
}, []);
```

## Data Flow

```
User Login → Supabase Auth → Dashboard Page
                                    ↓
                            Load Investor Profile
                                    ↓
                    ┌───────────────┴────────────────┐
                    ↓                                ↓
            Lindy AI Aggregator              Direct API Calls
                    ↓                                ↓
        ┌───────────┼────────────┐          (AppFolio, QB, Stripe)
        ↓           ↓            ↓                   ↓
    AppFolio   QuickBooks    Stripe         Individual Endpoints
        ↓           ↓            ↓                   ↓
        └───────────┴────────────┴───────────────────┘
                            ↓
                    Dashboard Components
```

## File Structure

```
src/
├── app/
│   ├── dashboard/
│   │   └── page.tsx              # Main dashboard page
│   └── login/
│       └── page.tsx              # Login page with redirect
├── components/
│   └── dashboard/
│       ├── MetricCard.tsx        # Reusable metric display
│       ├── InvestmentCard.tsx    # Property investment cards
│       ├── DistributionHistory.tsx # Transaction table
│       ├── TaxDocuments.tsx      # Document management
│       ├── PortfolioChart.tsx    # Canvas-based charts
│       └── EmptyState.tsx        # Empty state handling
└── lib/
    ├── investor-types.ts         # TypeScript interfaces
    └── investor-mock-data.ts     # Mock data service (replace with real APIs)
```

## Key Features for Investment Advisors

### Professional Metrics
- **IRR (Internal Rate of Return)**: Time-weighted return calculation
- **Cash-on-Cash Return**: Annual income relative to investment
- **Unrealized vs Realized Gains**: Capital appreciation tracking
- **Distribution Yield**: Cash flow analysis

### Tax Preparation Support
- K-1 forms available by March 15th
- Year-end investment summaries
- Distribution summaries for tax filing
- Historical document access

### Portfolio Diversification Tracking
- Property type distribution
- Geographic diversification (future)
- Investment timeline tracking
- Risk exposure analysis (future)

### Investor Relations
- Support contact integration
- Document notifications
- Distribution announcements
- Performance updates

## Next Steps

### Phase 1: Authentication (Current Sprint)
- [ ] Install Supabase
- [ ] Set up database schema
- [ ] Implement auth flow
- [ ] Add protected routes

### Phase 2: API Integration
- [ ] Choose integration approach (Lindy AI vs Direct)
- [ ] Set up API credentials
- [ ] Replace mock data functions
- [ ] Test data synchronization

### Phase 3: Enhanced Features
- [ ] Real-time notifications
- [ ] Document upload functionality
- [ ] Advanced filtering and search
- [ ] Mobile responsive optimization

### Phase 4: Advanced Analytics
- [ ] Predictive performance modeling
- [ ] Benchmark comparisons
- [ ] Custom report generation
- [ ] Export to Excel/PDF

## Environment Variables

Add these to your `.env.local`:

```env
# Supabase (when ready)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Keys
APPFOLIO_API_KEY=your_appfolio_key
QUICKBOOKS_CLIENT_ID=your_qb_client_id
QUICKBOOKS_CLIENT_SECRET=your_qb_client_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Lindy AI (Recommended)
LINDY_API_KEY=your_lindy_api_key
LINDY_WORKSPACE_ID=your_workspace_id
```

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Support

For questions or issues, contact your development team or investor relations.
