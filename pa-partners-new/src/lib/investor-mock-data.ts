/**
 * Mock data service for investor dashboard
 * This provides sample data structure that can be easily replaced with
 * real API calls to AppFolio, QuickBooks, Stripe, or an internal data service
 */

import {
  Investor,
  Investment,
  Distribution,
  PortfolioMetrics,
  TaxDocument,
  PropertyPerformance,
  AccountActivity,
} from './investor-types';

/**
 * Simulates fetching investor profile
 * Replace with: GET /api/investor/profile or aggregated account data
 */
export async function getInvestorProfile(_investorId: string): Promise<Investor | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock data - replace with actual API call
  return {
    id: _investorId,
    name: 'John Investor',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    entityName: 'JI Holdings LLC',
    taxId: '**-***1234',
    totalCommitment: 2500000,
    fundsDeployed: 1850000,
    availableCapital: 650000,
    memberSince: '2022-03-15',
  };
}

/**
 * Fetches all investments for an investor
 * Replace with: AppFolio API + QuickBooks for financials
 */
export async function getInvestments(_investorId: string): Promise<Investment[]> {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return [
    {
      id: 'inv-1',
      propertyId: 'prop-001',
      propertyName: 'Capital Account A',
      propertyAddress: 'Private reporting workspace',
      investmentAmount: 750000,
      ownershipPercentage: 22.5,
      acquisitionDate: '2023-06-15',
      propertyType: 'multifamily',
      status: 'active',
      currentValue: 892000,
      totalReturn: 142000,
      returnPercentage: 18.93,
      cashOnCash: 8.5,
      irr: 15.2,
    },
    {
      id: 'inv-2',
      propertyId: 'prop-002',
      propertyName: 'Development Account B',
      propertyAddress: 'Private reporting workspace',
      investmentAmount: 1100000,
      ownershipPercentage: 31.4,
      acquisitionDate: '2022-11-20',
      propertyType: 'mixed-use',
      status: 'active',
      currentValue: 1285000,
      totalReturn: 185000,
      returnPercentage: 16.82,
      cashOnCash: 9.2,
      irr: 14.8,
    },
  ];
}

/**
 * Fetches distribution history
 * Replace with: Stripe API or QuickBooks for payment data
 */
export async function getDistributions(_investorId: string): Promise<Distribution[]> {
  await new Promise(resolve => setTimeout(resolve, 350));
  
  return [
    {
      id: 'dist-1',
      investmentId: 'inv-1',
      propertyName: 'Capital Account A',
      amount: 15750,
      distributionDate: '2025-09-15',
      period: 'Q3 2025',
      type: 'operating-income',
      status: 'paid',
      paymentMethod: 'ACH',
      transactionId: 'stripe_123abc',
    },
    {
      id: 'dist-2',
      investmentId: 'inv-2',
      propertyName: 'Development Account B',
      amount: 25300,
      distributionDate: '2025-09-15',
      period: 'Q3 2025',
      type: 'operating-income',
      status: 'paid',
      paymentMethod: 'ACH',
      transactionId: 'stripe_456def',
    },
    {
      id: 'dist-3',
      investmentId: 'inv-1',
      propertyName: 'Capital Account A',
      amount: 14200,
      distributionDate: '2025-06-15',
      period: 'Q2 2025',
      type: 'operating-income',
      status: 'paid',
    },
    {
      id: 'dist-4',
      investmentId: 'inv-2',
      propertyName: 'Development Account B',
      amount: 23800,
      distributionDate: '2025-06-15',
      period: 'Q2 2025',
      type: 'operating-income',
      status: 'paid',
    },
  ];
}

/**
 * Calculates portfolio metrics
 * Replace with: aggregated data from internal APIs or a custom calculation service
 */
export async function getPortfolioMetrics(_investorId: string): Promise<PortfolioMetrics> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    totalInvested: 1850000,
    currentValue: 2177000,
    totalDistributions: 127850,
    unrealizedGains: 327000,
    realizedGains: 0,
    totalReturn: 454850,
    totalReturnPercentage: 24.58,
    averageIRR: 15.0,
    averageCashOnCash: 8.85,
    numberOfProperties: 2,
  };
}

/**
 * Fetches tax documents
 * Replace with: Document storage API or QuickBooks document export
 */
export async function getTaxDocuments(_investorId: string): Promise<TaxDocument[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [
    {
      id: 'tax-1',
      year: 2024,
      documentType: 'k1',
      documentName: 'Schedule K-1 - Capital Account A',
      fileUrl: '/documents/k1-capital-account-a-2024.pdf',
      fileSize: 245000,
      uploadDate: '2025-03-01',
      status: 'available',
      investmentId: 'inv-1',
      propertyName: 'Capital Account A',
    },
    {
      id: 'tax-2',
      year: 2024,
      documentType: 'k1',
      documentName: 'Schedule K-1 - Development Account B',
      fileUrl: '/documents/k1-development-account-b-2024.pdf',
      fileSize: 238000,
      uploadDate: '2025-03-01',
      status: 'available',
      investmentId: 'inv-2',
      propertyName: 'Development Account B',
    },
    {
      id: 'tax-3',
      year: 2024,
      documentType: 'year-end-statement',
      documentName: '2024 Year-End Investment Summary',
      fileUrl: '/documents/year-end-2024.pdf',
      fileSize: 512000,
      uploadDate: '2025-01-15',
      status: 'available',
    },
  ];
}

/**
 * Fetches property performance data
 * Replace with: AppFolio API for real-time property metrics
 */
export async function getPropertyPerformance(propertyId: string): Promise<PropertyPerformance> {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  
  return {
    propertyId,
    propertyName: 'Capital Account A',
    monthlyData: months.map((month) => ({
      month: `${month} '25`,
      occupancy: 92 + Math.random() * 6,
      revenue: 48000 + Math.random() * 8000,
      expenses: 22000 + Math.random() * 4000,
      noi: 26000 + Math.random() * 5000,
    })),
  };
}

/**
 * Fetches account activity
 * Replace with: Combined data from Stripe + QuickBooks
 */
export async function getAccountActivity(_investorId: string): Promise<AccountActivity[]> {
  await new Promise(resolve => setTimeout(resolve, 350));
  
  return [
    {
      id: 'act-1',
      date: '2025-09-15',
      type: 'distribution',
      description: 'Q3 2025 Distribution - Capital Account A',
      amount: 15750,
      balance: 1977000,
      relatedProperty: 'Capital Account A',
    },
    {
      id: 'act-2',
      date: '2025-09-15',
      type: 'distribution',
      description: 'Q3 2025 Distribution - Development Account B',
      amount: 25300,
      balance: 1961250,
      relatedProperty: 'Development Account B',
    },
    {
      id: 'act-3',
      date: '2025-06-15',
      type: 'distribution',
      description: 'Q2 2025 Distribution - Capital Account A',
      amount: 14200,
      balance: 1935950,
      relatedProperty: 'Capital Account A',
    },
  ];
}

/**
 * Helper function to check if investor has any data
 * Useful for empty state handling
 */
export function hasInvestorData(investments: Investment[]): boolean {
  return investments.length > 0;
}
