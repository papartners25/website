/**
 * Type definitions for investor dashboard data
 * These types are designed to work with common property management APIs:
 * - AppFolio (property management)
 * - QuickBooks (accounting)
 * - Stripe (payments)
 * - Internal data aggregation
 */

export interface Investor {
  id: string;
  name: string;
  email: string;
  phone?: string;
  entityName?: string;
  taxId?: string;
  totalCommitment: number;
  fundsDeployed: number;
  availableCapital: number;
  memberSince: string;
}

export interface Investment {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyAddress: string;
  propertyImage?: string;
  investmentAmount: number;
  ownershipPercentage: number;
  acquisitionDate: string;
  propertyType: 'multifamily' | 'commercial' | 'industrial' | 'mixed-use' | 'land';
  status: 'active' | 'pending' | 'exited';
  currentValue: number;
  totalReturn: number;
  returnPercentage: number;
  cashOnCash: number;
  irr: number;
}

export interface Distribution {
  id: string;
  investmentId: string;
  propertyName: string;
  amount: number;
  distributionDate: string;
  period: string; // e.g., "Q1 2025"
  type: 'operating-income' | 'refinance' | 'sale' | 'capital-return';
  status: 'paid' | 'pending' | 'processing';
  paymentMethod?: string;
  transactionId?: string; // Stripe payment ID
}

export interface PortfolioMetrics {
  totalInvested: number;
  currentValue: number;
  totalDistributions: number;
  unrealizedGains: number;
  realizedGains: number;
  totalReturn: number;
  totalReturnPercentage: number;
  averageIRR: number;
  averageCashOnCash: number;
  numberOfProperties: number;
}

export interface TaxDocument {
  id: string;
  year: number;
  documentType: 'k1' | '1099' | 'year-end-statement' | 'distribution-summary';
  documentName: string;
  fileUrl: string;
  fileSize: number;
  uploadDate: string;
  status: 'available' | 'pending' | 'amended';
  investmentId?: string;
  propertyName?: string;
}

export interface PropertyPerformance {
  propertyId: string;
  propertyName: string;
  monthlyData: {
    month: string;
    occupancy: number;
    revenue: number;
    expenses: number;
    noi: number; // Net Operating Income
  }[];
}

export interface AccountActivity {
  id: string;
  date: string;
  type: 'contribution' | 'distribution' | 'investment' | 'return';
  description: string;
  amount: number;
  balance: number;
  relatedProperty?: string;
}

/**
 * API Integration Placeholders
 * These interfaces define the shape of data expected from external services
 */

export interface AppFolioPropertyData {
  propertyId: string;
  occupancyRate: number;
  rentRoll: number;
  operatingExpenses: number;
  maintenanceRequests: number;
}

export interface QuickBooksFinancialData {
  revenue: number;
  expenses: number;
  netIncome: number;
  accountsReceivable: number;
  accountsPayable: number;
}

export interface StripePaymentData {
  paymentId: string;
  amount: number;
  status: string;
  customerId: string;
  created: number;
}
