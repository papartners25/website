"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CostSegPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Title
    {
      title: "Weinland Park Summit Portfolio",
      subtitle: "Tax-Advantaged Value-Add Investment Strategy",
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-blue-600">$3.425M Acquisition</div>
            <div className="text-2xl text-gray-600">32-Unit Value-Add Multifamily</div>
            <div className="text-xl text-gray-500">Weinland Park, Columbus OH</div>
          </div>
          <div className="bg-blue-50 p-8 rounded-lg max-w-2xl border-2 border-blue-200">
            <p className="text-xl text-center text-gray-700">
              Accelerated tax strategy delivering <span className="font-bold text-blue-600">$346K in Year 1 tax benefits</span> + 
              <span className="font-bold text-green-600"> Year 2 value-add exit</span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg text-center">
              <div className="text-sm text-purple-600 font-semibold mb-2">YEAR 1</div>
              <div className="text-3xl font-bold text-purple-900">Tax Benefits</div>
              <div className="text-lg text-purple-700 mt-2">~$346K to LPs</div>
              <div className="text-sm text-purple-600 mt-1">36% effective discount</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg text-center">
              <div className="text-sm text-green-600 font-semibold mb-2">YEAR 2</div>
              <div className="text-3xl font-bold text-green-900">Strategic Exit</div>
              <div className="text-lg text-green-700 mt-2">Post-Stabilization Sale</div>
              <div className="text-sm text-green-600 mt-1">Capture value-add upside</div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 2: Deal Structure
    {
      title: "Deal Structure Overview",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-300">
              <div className="text-sm text-blue-600 font-semibold mb-2">PURCHASE PRICE</div>
              <div className="text-4xl font-bold text-blue-900">$3,425,000</div>
              <div className="text-sm text-gray-600 mt-2">32 units @ $107,031/unit</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-300">
              <div className="text-sm text-green-600 font-semibold mb-2">TOTAL PROJECT COST</div>
              <div className="text-4xl font-bold text-green-900">$4,031,000</div>
              <div className="text-sm text-gray-600 mt-2">Including all closing, hard & soft costs</div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Capital Stack</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
                <span className="font-semibold text-gray-900">Senior Debt (74.81% LTC):</span>
                <span className="text-2xl font-bold text-gray-900">$3,015,750</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded border-2 border-blue-300">
                <span className="font-semibold text-gray-900">Total Equity Required:</span>
                <span className="text-2xl font-bold text-blue-700">$1,015,250</span>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Investment Structure</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded">
                  <div className="text-sm text-gray-600 mb-1">LP Ownership</div>
                  <div className="text-3xl font-bold text-blue-600">95%</div>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <div className="text-sm text-gray-600 mb-1">GP Ownership</div>
                  <div className="text-3xl font-bold text-green-600">5%</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded">
                  <div className="text-sm text-gray-600 mb-1">LP Profit Share</div>
                  <div className="text-3xl font-bold text-blue-600">70%</div>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <div className="text-sm text-gray-600 mb-1">GP Profit Share</div>
                  <div className="text-3xl font-bold text-green-600">30%</div>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-blue-50 p-4 rounded">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">LP Equity</div>
                  <div className="text-2xl font-bold text-blue-700">$964,488</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">GP Equity</div>
                  <div className="text-2xl font-bold text-green-700">$50,762</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Tax Planning Strategy</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-white rounded">
                <span className="font-semibold text-gray-900">Cost Segregation Study:</span>
                <span className="text-lg font-semibold text-purple-700">CORE Specialty Tax Advisors</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white rounded">
                <span className="font-semibold text-gray-900">100% Bonus Depreciation:</span>
                <span className="text-lg font-semibold text-green-700">Eligible</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white rounded">
                <span className="font-semibold text-gray-900">Year 1 Accelerated Benefit:</span>
                <span className="text-2xl font-bold text-blue-700">$984,830</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
            <p className="text-center text-gray-700">
              <span className="font-bold text-blue-700">Strategy:</span> Maximize Year 1 tax benefits through accelerated depreciation, 
              execute value-add business plan, then exit at stabilization in Year 2 to capture upside.
            </p>
          </div>
        </div>
      )
    },

    // Slide 3: CORE Cost Seg Analysis
    {
      title: "CORE Specialty Tax Advisors Analysis",
      subtitle: "Professional Cost Segregation Study Results",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-lg">
            <div className="text-center">
              <div className="text-sm font-semibold opacity-90 mb-2">PREPARED BY</div>
              <div className="text-3xl font-bold">CORE Specialty Tax Advisors</div>
              <div className="text-sm opacity-90 mt-2">Engineering-Based Cost Segregation Specialists</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Property Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-sm text-gray-600 mb-1">Entity</div>
                <div className="text-xl font-bold text-gray-900">PA Partners</div>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-sm text-gray-600 mb-1">Property Type</div>
                <div className="text-xl font-bold text-gray-900">Apartments</div>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-sm text-gray-600 mb-1">Purchase Price</div>
                <div className="text-xl font-bold text-gray-900">$3,425,000</div>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-sm text-gray-600 mb-1">Placed-in-Service</div>
                <div className="text-xl font-bold text-gray-900">12/31/25</div>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-sm text-gray-600 mb-1">Land Allocation</div>
                <div className="text-xl font-bold text-gray-900">15%</div>
              </div>
              <div className="bg-blue-50 p-4 rounded border-2 border-blue-300">
                <div className="text-sm text-gray-600 mb-1">Depreciable Basis</div>
                <div className="text-2xl font-bold text-blue-700">$2,911,250</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-green-300">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Estimated Accelerated Depreciation</h3>
            <div className="space-y-4">
              <div className="bg-green-50 p-5 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Accelerated Depreciation (28% of basis)</div>
                    <div className="text-xs text-gray-500">5 & 15-year property reclassification</div>
                  </div>
                  <div className="text-3xl font-bold text-green-700">$815,150</div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-5 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">1st-Year Bonus Depreciation (100%)</div>
                    <div className="text-xs text-gray-500">Immediate deduction in Year 1</div>
                  </div>
                  <div className="text-3xl font-bold text-blue-700">$815,150</div>
                </div>
              </div>

              <div className="bg-purple-50 p-5 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">1st-Year Renovation Bonus (100%)</div>
                    <div className="text-xs text-gray-500">Unit upgrade depreciation</div>
                  </div>
                  <div className="text-3xl font-bold text-purple-700">$169,680</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-lg font-bold">TOTAL YEAR 1 DEPRECIATION</div>
                    <div className="text-sm opacity-90">Available to offset investor income</div>
                  </div>
                  <div className="text-5xl font-bold">$984,830</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">ℹ️</div>
              <div className="text-sm text-gray-700">
                <span className="font-semibold">Note:</span> This estimate assumes 15% land value and may be adjusted by your CPA during final review. 
                CORE will conduct a full engineering-based study post-closing to validate these projections.
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">Comparison: With vs. Without Cost Segregation</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-red-50 p-5 rounded-lg text-center border-2 border-red-300">
                <div className="text-sm text-gray-600 mb-2">WITHOUT Cost Seg</div>
                <div className="text-4xl font-bold text-red-600 mb-2">$105,864</div>
                <div className="text-xs text-gray-500">Standard 27.5-year depreciation</div>
              </div>
              <div className="bg-green-50 p-5 rounded-lg text-center border-2 border-green-300">
                <div className="text-sm text-gray-600 mb-2">WITH Cost Seg</div>
                <div className="text-4xl font-bold text-green-600 mb-2">$984,830</div>
                <div className="text-xs text-gray-500">Accelerated + bonus depreciation</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="text-sm text-gray-600">Additional Year 1 Depreciation</div>
              <div className="text-3xl font-bold text-blue-700">$878,966</div>
              <div className="text-sm text-gray-500 mt-1">830% increase in Year 1 tax losses</div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 4: LP Tax Benefit Analysis
    {
      title: "Limited Partner Tax Benefits",
      subtitle: "Year 1 Impact for 95% Ownership",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg">
            <div className="text-center space-y-3">
              <div className="text-sm font-semibold opacity-90">YEAR 1 TAX LOSSES TO LPs</div>
              <div className="text-6xl font-bold">$935,589</div>
              <div className="text-sm opacity-90">95% of total depreciation allocated to Limited Partners</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-purple-500">
              <div className="text-sm text-gray-600 mb-2">AT 37% TAX BRACKET</div>
              <div className="text-3xl font-bold text-purple-600">$346,168</div>
              <div className="text-xs text-gray-500 mt-2">Total LP tax savings</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-purple-400">
              <div className="text-sm text-gray-600 mb-2">AT 32% TAX BRACKET</div>
              <div className="text-3xl font-bold text-purple-500">$299,388</div>
              <div className="text-xs text-gray-500 mt-2">Total LP tax savings</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-purple-300">
              <div className="text-sm text-gray-600 mb-2">AT 24% TAX BRACKET</div>
              <div className="text-3xl font-bold text-purple-400">$224,541</div>
              <div className="text-xs text-gray-500 mt-2">Total LP tax savings</div>
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Example: $100K LP Investment</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded">
                <span className="text-gray-900">Capital Invested</span>
                <span className="font-bold text-gray-900">$100,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded">
                <span className="text-gray-900">Year 1 Tax Loss Allocation</span>
                <span className="font-bold text-blue-600">$97,013</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded">
                <span className="text-gray-900">Tax Savings (37% bracket)</span>
                <span className="font-bold text-green-600">$35,895</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-500 to-green-600 rounded text-white">
                <span className="font-bold">Effective Cost Basis After Tax Benefit</span>
                <span className="font-bold text-xl">$64,105</span>
              </div>
            </div>
            <div className="mt-4 p-4 bg-green-100 rounded">
              <p className="text-center text-sm text-gray-700">
                <span className="font-bold text-green-800">36% Effective Discount:</span> High-bracket investors reduce their economic 
                cost basis by 36% through Year 1 tax savings
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Total LP Investment Impact</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Total LP Equity Required</div>
                    <div className="text-xs text-gray-500">(95% of $1,015,250 total equity)</div>
                  </div>
                  <div className="text-3xl font-bold text-blue-700">$964,488</div>
                </div>
              </div>
              <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-500">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Year 1 Tax Benefit Pool @ 37%</div>
                    <div className="text-xs text-gray-500">Total savings across all LPs</div>
                  </div>
                  <div className="text-3xl font-bold text-green-700">$346,168</div>
                </div>
              </div>
              <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-500">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Effective LP Economic Outlay</div>
                    <div className="text-xs text-gray-500">After Year 1 tax benefit</div>
                  </div>
                  <div className="text-3xl font-bold text-purple-700">$618,320</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-5 rounded-lg">
            <p className="text-center text-gray-700">
              <span className="font-bold text-blue-700">Strategic Advantage:</span> Tax savings effectively reduce LP cost basis by 36%, 
              then LPs participate in full appreciation upside at Year 2 exit
            </p>
          </div>
        </div>
      )
    },

    // Slide 5: Value-Add Timeline
    {
      title: "18-Month Value-Add Execution",
      subtitle: "From Acquisition to Stabilization",
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Renovation Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">0</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Acquisition & Cost Seg Filing</div>
                  <div className="text-sm text-gray-600">Close on property, initiate CORE study</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">NOI Run-Rate</div>
                  <div className="font-bold text-gray-900">$180,000</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">6</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">11 Units Renovated (35%)</div>
                  <div className="text-sm text-gray-600">First phase complete</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">NOI Run-Rate</div>
                  <div className="font-bold text-green-700">$215,000</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">12</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">22 Units Renovated (71%)</div>
                  <div className="text-sm text-gray-600">Strong momentum</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">NOI Run-Rate</div>
                  <div className="font-bold text-green-700">$260,000</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded border-2 border-green-300">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">18</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">31 Units Renovated (100%)</div>
                  <div className="text-sm text-gray-600">Fully stabilized & market-ready</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">NOI Run-Rate</div>
                  <div className="font-bold text-green-700">$290,000</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded border-2 border-blue-300">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">24</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Strategic Exit</div>
                  <div className="text-sm text-gray-600">Market property to institutional buyers</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Target</div>
                  <div className="font-bold text-blue-700">Sale Close</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-red-500">
              <h4 className="font-bold text-red-700 text-lg mb-4 text-center">At Acquisition</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                  <span className="text-sm text-gray-900">Purchase Price</span>
                  <span className="font-bold text-gray-900">$3,425,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                  <span className="text-sm text-gray-900">Going-In NOI</span>
                  <span className="font-bold text-gray-900">$180,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                  <span className="text-sm text-gray-900">Going-In Cap Rate</span>
                  <span className="font-bold text-gray-900">5.3%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-500">
              <h4 className="font-bold text-green-700 text-lg mb-4 text-center">At Stabilization (Month 18)</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span className="text-sm text-gray-900">Projected Value</span>
                  <span className="font-bold text-gray-900">$4,640,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span className="text-sm text-gray-900">Stabilized NOI</span>
                  <span className="font-bold text-gray-900">$290,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span className="text-sm text-gray-900">Exit Cap Rate</span>
                  <span className="font-bold text-gray-900">6.25%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-300">
            <h4 className="font-bold text-blue-800 mb-4 text-center text-xl">Value Creation Summary</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded text-center">
                <div className="text-sm text-gray-600 mb-1">NOI Growth</div>
                <div className="text-3xl font-bold text-green-600">+61%</div>
                <div className="text-xs text-gray-500 mt-1">$180K → $290K</div>
              </div>
              <div className="bg-white p-4 rounded text-center">
                <div className="text-sm text-gray-600 mb-1">Asset Appreciation</div>
                <div className="text-3xl font-bold text-blue-600">+35%</div>
                <div className="text-xs text-gray-500 mt-1">$3.4M → $4.6M</div>
              </div>
              <div className="bg-white p-4 rounded text-center">
                <div className="text-sm text-gray-600 mb-1">Value Added</div>
                <div className="text-3xl font-bold text-purple-600">$1.2M+</div>
                <div className="text-xs text-gray-500 mt-1">Gross appreciation</div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded">
            <div className="flex items-start space-x-3">
              <div className="text-3xl">🎯</div>
              <div>
                <div className="font-bold text-green-800 mb-2">Exit Strategy</div>
                <p className="text-sm text-gray-700">
                  Once fully stabilized at Month 18, we&apos;ll market the property to institutional buyers and 1031 exchange investors 
                  seeking turnkey, cash-flowing multifamily assets. Target sale close by Month 24 to capture maximum value.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 6: Complete Economic Picture
    {
      title: "Complete LP Investment Journey",
      subtitle: "Tax Benefits + Value-Add Exit Strategy",
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-gray-300">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">LP Economic Timeline</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-5 bg-red-50 border-l-4 border-red-500 rounded">
                <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  Mo 0
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg text-gray-800">Initial Investment</div>
                  <div className="text-sm text-gray-600 mt-1">LP equity contribution to close</div>
                  <div className="text-3xl font-bold text-red-600 mt-2">-$964,488</div>
                  <div className="text-right text-sm text-gray-600 mt-2">Economic Outlay: <span className="font-bold">$964,488</span></div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 bg-green-50 border-l-4 border-green-500 rounded">
                <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  Mo 12
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg text-gray-800">Year 1 Tax Filing</div>
                  <div className="text-sm text-gray-600 mt-1">IRS refund / reduced tax liability (37% bracket)</div>
                  <div className="text-3xl font-bold text-green-600 mt-2">+$346,168</div>
                  <div className="text-right text-sm text-gray-600 mt-2">Economic Outlay: <span className="font-bold text-green-600">$478,112</span></div>
                  <div className="text-right text-xs text-gray-500 mt-1">42% effective discount on investment</div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 bg-blue-50 border-l-4 border-blue-500 rounded">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  Mo 18
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg text-gray-800">Ongoing Cash Flow</div>
                  <div className="text-sm text-gray-600 mt-1">Receive 70% of quarterly distributions during hold</div>
                  <div className="text-lg font-bold text-blue-600 mt-2">Stabilized property generating strong NOI</div>
                  <div className="text-sm text-gray-600 mt-2 italic">Property fully renovated and ready for sale</div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 bg-purple-50 border-l-4 border-purple-500 rounded">
                <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold flex-shrink-0">
                  Mo 24
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg text-gray-800">Strategic Exit</div>
                  <div className="text-sm text-gray-600 mt-1">Sale to institutional buyer at stabilized value</div>
                  <div className="text-lg font-bold text-purple-600 mt-2">Participate in distribution waterfall</div>
                  <div className="text-sm text-gray-600 mt-2">
                    • Return of capital (pro-rata)<br/>
                    • Preferred return (70/30)<br/>
                    • Remaining profits (70/30)
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-300">
            <h4 className="font-bold text-green-800 mb-4 text-center text-xl">Tax-Advantaged Returns Model</h4>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded">
                <div className="flex justify-between items-center">
                  <span className="text-gray-900">Initial LP Investment</span>
                  <span className="font-bold text-gray-900">$964,488</span>
                </div>
              </div>
              <div className="bg-green-100 p-4 rounded">
                <div className="flex justify-between items-center">
                  <span className="text-gray-900">Less: Year 1 Tax Benefit (37%)</span>
                  <span className="font-bold text-green-700">($346,168)</span>
                </div>
              </div>
              <div className="bg-blue-100 p-4 rounded border-2 border-blue-400">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800">Effective Basis for Return Calculation</span>
                  <span className="font-bold text-blue-700 text-xl">$618,320</span>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-white rounded">
              <p className="text-sm text-gray-700 text-center">
                <span className="font-semibold text-green-800">Key Advantage:</span> All distributions and sale proceeds 
                calculated on returns from reduced effective basis, dramatically improving IRR and equity multiple metrics
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-red-500">
              <h4 className="font-bold text-red-700 text-lg mb-4 text-center">Without Cost Seg</h4>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-600">Investment Basis</div>
                  <div className="text-2xl font-bold text-gray-900">$964,488</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-600">Year 1 Tax Benefit</div>
                  <div className="text-2xl font-bold text-red-600">$37,170</div>
                  <div className="text-xs text-gray-500">Standard depreciation @ 37%</div>
                </div>
                <div className="bg-red-100 p-3 rounded">
                  <div className="text-sm text-gray-600">Effective Basis</div>
                  <div className="text-2xl font-bold text-red-700">$927,318</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-500">
              <h4 className="font-bold text-green-700 text-lg mb-4 text-center">With Cost Seg</h4>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-600">Investment Basis</div>
                  <div className="text-2xl font-bold text-gray-900">$964,488</div>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <div className="text-sm text-gray-600">Year 1 Tax Benefit</div>
                  <div className="text-2xl font-bold text-green-600">$346,168</div>
                  <div className="text-xs text-gray-500">Accelerated + bonus @ 37%</div>
                </div>
                <div className="bg-green-100 p-3 rounded">
                  <div className="text-sm text-gray-600">Effective Basis</div>
                  <div className="text-2xl font-bold text-green-700">$618,320</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-center text-gray-700 text-lg">
              <span className="font-bold text-blue-700">Result:</span> Cost segregation reduces LP effective basis by 
              <span className="font-bold text-blue-700"> $309K</span>, improving all return metrics and reducing downside risk
            </p>
          </div>
        </div>
      )
    },

    // Slide 7: Tax Recapture at Sale
    {
      title: "Understanding Tax Recapture",
      subtitle: "What Happens at Year 2 Sale",
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <p className="text-lg text-gray-700 leading-relaxed">
              When the property is sold, depreciation taken must be &quot;recaptured&quot; and taxed. However, in a <span className="font-bold">24-month hold</span>, 
              you still benefit from the <span className="font-bold">time value of money</span> and <span className="font-bold">rate arbitrage</span>.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Example: Sale in Month 24</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-900">Projected Sale Price</span>
                <span className="font-mono font-bold text-gray-900">$4,640,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-900">Less: Debt Payoff</span>
                <span className="font-mono font-bold text-gray-900">($3,015,750)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-900">Adjusted Basis (after depreciation)</span>
                <span className="font-mono font-bold text-gray-900">$2,440,170</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                <span className="font-semibold text-gray-900">Total Taxable Gain</span>
                <span className="font-mono font-bold text-blue-600">$2,199,830</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-orange-500">
              <h4 className="font-bold text-orange-700 mb-4">Depreciation Recapture</h4>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">Amount recaptured</div>
                <div className="text-3xl font-bold text-gray-800">$984,830</div>
                <div className="text-sm text-gray-600 mt-2">Tax rate</div>
                <div className="text-2xl font-bold text-orange-600">25%</div>
                <div className="border-t-2 border-orange-200 mt-3 pt-3">
                  <div className="text-sm text-gray-600">Tax owed</div>
                  <div className="text-2xl font-bold text-orange-700">$246,208</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-500">
              <h4 className="font-bold text-green-700 mb-4">Long-Term Capital Gains</h4>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">Gain amount</div>
                <div className="text-3xl font-bold text-gray-800">$1,215,000</div>
                <div className="text-sm text-gray-600 mt-2">Tax rate</div>
                <div className="text-2xl font-bold text-green-600">20%</div>
                <div className="border-t-2 border-green-200 mt-3 pt-3">
                  <div className="text-sm text-gray-600">Tax owed</div>
                  <div className="text-2xl font-bold text-green-700">$243,000</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-300">
            <h4 className="font-bold text-purple-800 mb-4 text-center text-xl">Net Tax Benefit Analysis</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded">
                <span className="text-gray-900">Year 1 Tax Savings (LP @ 37%)</span>
                <span className="font-bold text-green-600">+$346,168</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded">
                <span className="text-gray-900">Year 2 Total Tax at Sale</span>
                <span className="font-bold text-red-600">$489,208</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded">
                <span className="text-gray-900">LP Tax Allocation (95% of gain)</span>
                <span className="font-bold text-red-600">-$464,748</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded text-white">
                <span className="font-bold text-lg">NET TAX COST TO LPs</span>
                <span className="font-bold text-2xl">-$118,580</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white rounded text-xs">
              <p className="text-gray-700">
                <span className="font-semibold">Note:</span> Even after accounting for recapture, LPs still saved $346K in Year 1 
                and only pay back $465K at sale—but they had 24 months of time value benefit, plus saved at 37% and pay blended ~22.2%.
              </p>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
            <div className="flex items-start space-x-3">
              <div className="text-3xl">✓</div>
              <div>
                <div className="font-bold text-green-800 mb-2">Why This Still Makes Sense (Even in 24 Months)</div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <span className="font-semibold">Time value of money:</span> $346K benefit in Year 1 vs. $465K tax in Year 2 (24 months to invest/use that capital)</li>
                  <li>• <span className="font-semibold">Rate arbitrage:</span> Saved at 37% effective rate, pay back at blended ~22.2% rate</li>
                  <li>• <span className="font-semibold">Reduced risk:</span> Lower effective basis means better downside protection</li>
                  <li>• <span className="font-semibold">Improved metrics:</span> All return calculations based on $618K basis, not $964K</li>
                  <li>• <span className="font-semibold">1031 exchange option:</span> Can defer all taxes by exchanging into another property</li>
                  <li>• <span className="font-semibold">Appreciation capture:</span> $1.2M+ value creation far exceeds net tax cost</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-center text-gray-700">
              <span className="font-bold text-blue-700">Important:</span> Even after recapture, the combination of reduced effective basis, 
              strong NOI growth (61%), and asset appreciation (35%) delivers compelling tax-adjusted returns over the 24-month hold period.
            </p>
          </div>
        </div>
      )
    },

    // Slide 8: Who Benefits Most
    {
      title: "Who Benefits Most from This Strategy?",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-400">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">✓</div>
                <h3 className="text-xl font-bold text-green-800">Ideal Candidates</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span className="text-gray-900"><span className="font-semibold">High-income earners</span> in the 32-37% tax brackets</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span className="text-gray-900"><span className="font-semibold">Real estate professionals</span> (750+ hours, more than any other job)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span className="text-gray-900"><span className="font-semibold">Investors with passive income</span> from other real estate or businesses</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span className="text-gray-900"><span className="font-semibold">Active participants</span> in real estate investing (multiple properties)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span className="text-gray-900"><span className="font-semibold">Investors seeking tax-efficient exits</span> via 1031 exchange</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span className="text-gray-900"><span className="font-semibold">Sophisticated investors</span> who understand short-hold tax strategies</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg border-2 border-yellow-400">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">⚠️</div>
                <h3 className="text-xl font-bold text-yellow-800">Limited Immediate Benefit</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span className="text-gray-900"><span className="font-semibold">Lower tax bracket investors</span> (benefit exists but is reduced)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span className="text-gray-900"><span className="font-semibold">W-2 employees without passive income</span> (losses suspended until sale)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span className="text-gray-900"><span className="font-semibold">First-time passive investors</span> (still benefit at sale, but not Year 1)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span className="text-gray-900"><span className="font-semibold">Investors using 1031 exchange IN</span> (reduced depreciable basis coming in)</span>
                </li>
              </ul>
              <div className="mt-4 p-4 bg-yellow-200 rounded text-xs">
                <p className="font-semibold text-yellow-900">Note: Suspended losses aren&apos;t lost—they&apos;ll be used to offset gain at the Year 2 sale, reducing tax liability at exit.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Passive Activity Loss (PAL) Rules</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-bold text-blue-700 mb-2">Real Estate Professional</div>
                <div className="text-sm text-gray-700">Can use losses against ALL income (including W-2) if material participation tests met</div>
                <div className="mt-3 text-2xl font-bold text-blue-600">100%</div>
                <div className="text-xs text-gray-600">Immediate Year 1 benefit</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="font-bold text-purple-700 mb-2">Has Passive Income</div>
                <div className="text-sm text-gray-700">Can use losses to offset passive income from other sources</div>
                <div className="mt-3 text-2xl font-bold text-purple-600">100%</div>
                <div className="text-xs text-gray-600">Immediate Year 1 benefit</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="font-bold text-orange-700 mb-2">W-2 Employee Only</div>
                <div className="text-sm text-gray-700">Losses suspended in Year 1, then used to offset gain at Year 2 sale</div>
                <div className="mt-3 text-2xl font-bold text-orange-600">Delayed</div>
                <div className="text-xs text-gray-600">Year 2 benefit at sale</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <p className="text-center text-gray-700">
              <span className="font-bold text-blue-700">Bottom Line:</span> Even if you can&apos;t use losses in Year 1, they automatically 
              offset your gain at the Year 2 sale, reducing your tax bill then. Either way, the tax benefit creates value—it&apos;s just a 
              question of <span className="font-bold">when</span> you receive it (Year 1 vs. Year 2).
            </p>
          </div>
        </div>
      )
    },

    // Slide 9: Important Disclaimers
    {
      title: "Important Considerations & Disclaimers",
      content: (
        <div className="space-y-5">
          <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded">
            <h4 className="font-bold text-red-800 mb-2 flex items-center">
              <span className="text-2xl mr-2">⚠️</span>
              Tax Professional Consultation Required
            </h4>
            <p className="text-sm text-gray-700">
              These projections are for illustrative purposes only and based on CORE Specialty Tax Advisors&apos; preliminary estimate. 
              Actual tax benefits depend on your individual tax situation, income sources, filing status, and ability to utilize passive losses. 
              <span className="font-bold"> You must consult with your CPA or tax advisor</span> before relying on these estimates.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-blue-500">
            <h4 className="font-bold text-blue-800 mb-3">Key Assumptions</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Cost segregation estimate from CORE assumes 28% accelerated depreciation (may vary in final study)</li>
              <li>• Renovation bonus depreciation of $169,680 assumes completion in Year 1</li>
              <li>• Land allocation of 15% per CORE estimate (may be adjusted by CPA during final review)</li>
              <li>• Tax brackets and rates based on 2025 federal tax law and may change</li>
              <li>• 100% bonus depreciation available under current law but subject to change</li>
              <li>• Year 2 sale assumes successful value-add execution and favorable market conditions</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-yellow-500">
            <h4 className="font-bold text-yellow-800 mb-3">Risks & Limitations</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <span className="font-semibold">Passive loss limitations:</span> W-2 employees may not be able to use losses in Year 1 (benefits at sale instead)</li>
              <li>• <span className="font-semibold">Short-term recapture:</span> 24-month hold means immediate recapture taxes at exit</li>
              <li>• <span className="font-semibold">Market risk:</span> Sale value depends on market conditions, cap rates, and buyer demand at Month 24</li>
              <li>• <span className="font-semibold">Execution risk:</span> Value-add success depends on timely renovations and lease-up</li>
              <li>• <span className="font-semibold">Legislative risk:</span> Tax laws can change; bonus depreciation may be reduced or eliminated</li>
              <li>• <span className="font-semibold">Alternative Minimum Tax:</span> Some investors may be subject to AMT, reducing benefits</li>
              <li>• <span className="font-semibold">State taxes:</span> State tax treatment varies; some states don&apos;t allow bonus depreciation</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-green-500">
            <h4 className="font-bold text-green-800 mb-3">CORE Study Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded">
                <div className="text-sm text-gray-600 mb-1">Estimated Study Cost</div>
                <div className="text-2xl font-bold text-green-700">$8,000 - $12,000</div>
                <div className="text-xs text-gray-600 mt-1">One-time expense</div>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <div className="text-sm text-gray-600 mb-1">Timeline</div>
                <div className="text-2xl font-bold text-green-700">4-8 weeks</div>
                <div className="text-xs text-gray-600 mt-1">From close to delivery</div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-5 rounded">
            <h4 className="font-bold text-purple-800 mb-2">IRS Compliance & Audit Support</h4>
            <p className="text-sm text-gray-700">
              CORE Specialty Tax Advisors will perform an engineering-based cost segregation study following IRS guidelines and the 
              Cost Segregation Audit Techniques Guide. The study includes IRS audit support and documentation to defend the classifications.
            </p>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded">
            <h4 className="font-bold text-orange-800 mb-2">Conservative Underwriting</h4>
            <p className="text-sm text-gray-700">
              Our base case financial projections <span className="font-bold">do not include or rely upon</span> cost segregation benefits 
              to achieve targeted returns. Tax benefits represent <span className="font-bold">upside</span> to our conservative underwriting. 
              The deal must work on fundamentals alone: strong location, value-add potential, and institutional exit demand.
            </p>
          </div>

          <div className="bg-gray-100 p-5 rounded text-center">
            <p className="text-sm text-gray-600 italic">
              This presentation is for informational purposes only and does not constitute tax, legal, or investment advice. 
              Tax benefits are not guaranteed and depend on individual circumstances. Estimates are preliminary and subject to final study results. 
              Please read the Private Placement Memorandum for complete details on risks and terms.
            </p>
          </div>
        </div>
      )
    },

    // Slide 10: Summary
    {
      title: "Executive Summary",
      subtitle: "Weinland Park Summit Portfolio - Tax-Advantaged Strategy",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg text-center">
            <h3 className="text-3xl font-bold mb-3">Strategic Value Creation in 24 Months</h3>
            <p className="text-lg opacity-90">Accelerated tax benefits + disciplined value-add execution + strategic exit</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-purple-500">
              <h4 className="font-bold text-purple-700 text-xl mb-4 text-center">Tax Strategy</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                  <span className="text-sm text-gray-900">Year 1 LP Benefit</span>
                  <span className="font-bold text-purple-600">$346K</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                  <span className="text-sm text-gray-900">Per $100K Invested</span>
                  <span className="font-bold text-purple-600">$36K</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                  <span className="text-sm text-gray-900">Effective Discount</span>
                  <span className="font-bold text-purple-600">36%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-500">
              <h4 className="font-bold text-green-700 text-xl mb-4 text-center">Value Creation</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span className="text-sm text-gray-900">NOI Growth</span>
                  <span className="font-bold text-green-600">+61%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span className="text-sm text-gray-900">Asset Appreciation</span>
                  <span className="font-bold text-green-600">+30%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span className="text-sm text-gray-900">Value Added</span>
                  <span className="font-bold text-green-600">$1M+</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-500">
              <h4 className="font-bold text-blue-700 text-xl mb-4 text-center">Exit Strategy</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="text-sm text-gray-900">Hold Period</span>
                  <span className="font-bold text-blue-600">24 Mo</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="text-sm text-gray-900">Target Sale</span>
                  <span className="font-bold text-blue-600">$4.5M</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="text-sm text-gray-900">Strategy</span>
                  <span className="font-bold text-blue-600">Stab&apos;d</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-300">
            <h4 className="font-bold text-purple-800 mb-4 text-center text-xl">LP Economic Summary</h4>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="bg-white p-4 rounded">
                  <div className="text-sm text-gray-600 mb-1">Total LP Equity Required</div>
                  <div className="text-2xl font-bold text-gray-900">$1,019,730</div>
                </div>
                <div className="bg-green-100 p-4 rounded">
                  <div className="text-sm text-gray-600 mb-1">Less: Year 1 Tax Benefit (37%)</div>
                  <div className="text-2xl font-bold text-green-700">($346,168)</div>
                </div>
                <div className="bg-blue-100 p-4 rounded border-2 border-blue-400">
                  <div className="text-sm text-gray-900 mb-1 font-semibold">Effective Economic Basis</div>
                  <div className="text-3xl font-bold text-blue-700">$673,562</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-purple-600 mb-2">34%</div>
                  <div className="text-lg text-gray-700">Effective discount on investment through tax savings</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h4 className="font-bold text-gray-800 text-xl mb-4 text-center">Why This Strategy Works</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl mb-2">💰</div>
                <div className="font-bold text-blue-700 mb-1">Tax Efficiency</div>
                <p className="text-sm text-gray-600">Accelerated depreciation reduces effective cost basis by 36%</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl mb-2">📈</div>
                <div className="font-bold text-green-700 mb-1">Value Creation</div>
                <p className="text-sm text-gray-600">61% NOI growth through disciplined renovations</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl mb-2">🎯</div>
                <div className="font-bold text-purple-700 mb-1">Strategic Exit</div>
                <p className="text-sm text-gray-600">24-month hold captures upside at peak value</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
            <div className="flex items-start space-x-3">
              <div className="text-3xl">💡</div>
              <div>
                <div className="font-bold text-yellow-800 mb-2">Conservative Foundation</div>
                <p className="text-gray-700">
                  We&apos;ve underwritten this deal <span className="font-bold">WITHOUT</span> relying on cost segregation benefits to hit return targets. 
                  Tax strategy represents <span className="font-bold">pure upside</span> to a fundamentally sound value-add investment in a strong 
                  Columbus submarket with institutional exit demand.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8 rounded-lg text-center">
            <p className="text-2xl font-bold mb-3">Questions About This Strategy?</p>
            <p className="text-lg mb-4">Let&apos;s discuss how cost segregation fits your investment profile and tax situation</p>
            <div className="text-sm opacity-75">
              Consult with your tax advisor to determine your individual benefits
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden" style={{ height: '900px' }}>
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold">{slides[currentSlide].title}</h1>
        {slides[currentSlide].subtitle && (
          <p className="text-lg mt-2 opacity-90">{slides[currentSlide].subtitle}</p>
        )}
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        {slides[currentSlide].content}
      </div>

      <div className="bg-gray-50 border-t border-gray-200 p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all ${
              currentSlide === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <ChevronLeft size={20} />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-blue-600 w-6'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all ${
              currentSlide === slides.length - 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <span>Next</span>
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="text-center mt-3 text-sm text-gray-600">
          Slide {currentSlide + 1} of {slides.length}
        </div>
      </div>
    </div>
  );
};

export default CostSegPresentation;
