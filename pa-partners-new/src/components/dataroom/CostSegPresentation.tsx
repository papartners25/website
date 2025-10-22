"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CostSegPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Title
    {
      title: "Weinland Park Summit Portfolio",
      subtitle: "Maximizing Returns Through Strategic Tax Planning & Refinance Strategy",
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-blue-600">$3.2M Acquisition</div>
            <div className="text-2xl text-gray-600">32-Unit Value-Add Multifamily</div>
            <div className="text-xl text-gray-500">Weinland Park, Columbus OH</div>
          </div>
          <div className="bg-blue-50 p-8 rounded-lg max-w-2xl border-2 border-blue-200">
            <p className="text-xl text-center text-gray-700">
              Strategic approach delivering <span className="font-bold text-blue-600">$347K in Year 1 tax benefits</span> + 
              <span className="font-bold text-green-600"> $441K Year 2 refinance proceeds</span>
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg text-center">
              <div className="text-sm text-purple-600 font-semibold mb-2">YEAR 1</div>
              <div className="text-3xl font-bold text-purple-900">Tax Benefits</div>
              <div className="text-lg text-purple-700 mt-2">~$347K to LPs</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg text-center">
              <div className="text-sm text-green-600 font-semibold mb-2">YEAR 2</div>
              <div className="text-3xl font-bold text-green-900">Refinance</div>
              <div className="text-lg text-green-700 mt-2">~$441K to Equity</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg text-center">
              <div className="text-sm text-orange-600 font-semibold mb-2">RESULT</div>
              <div className="text-3xl font-bold text-orange-900">~100%</div>
              <div className="text-lg text-orange-700 mt-2">Capital Return</div>
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
              <div className="text-4xl font-bold text-blue-900">$3,200,000</div>
              <div className="text-sm text-gray-800 mt-2">32 units @ $100,000/unit</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-300">
              <div className="text-sm text-green-600 font-semibold mb-2">TOTAL PROJECT COST</div>
              <div className="text-4xl font-bold text-green-900">$3,768,000</div>
              <div className="text-sm text-gray-800 mt-2">Including renovations & closing</div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Capital Stack</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
                <span className="font-semibold text-gray-800">Senior Bridge Loan (LTC):</span>
                <span className="text-2xl font-bold text-gray-900">$2,637,600</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-yellow-50 rounded">
                <span className="font-semibold text-gray-800">Seller Carry Note (10%):</span>
                <span className="text-2xl font-bold text-yellow-700">$320,000</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded border-2 border-blue-300">
                <span className="font-semibold text-gray-800">Equity Required:</span>
                <span className="text-2xl font-bold text-blue-700">$810,400</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Ownership Structure</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
                  <span className="font-semibold text-gray-800">LP Ownership:</span>
                  <span className="text-2xl font-bold text-blue-600">95%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
                  <span className="font-semibold text-gray-800">GP Ownership:</span>
                  <span className="text-2xl font-bold text-green-600">5%</span>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Cash Distribution</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
                  <span className="font-semibold text-gray-800">LP Distributions:</span>
                  <span className="text-2xl font-bold text-blue-600">70%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
                  <span className="font-semibold text-gray-800">GP Distributions:</span>
                  <span className="text-2xl font-bold text-green-600">30%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-sm text-gray-800 mb-1">LP Equity Investment</div>
                <div className="text-3xl font-bold text-blue-700">$769,880</div>
              </div>
              <div>
                <div className="text-sm text-gray-800 mb-1">GP Equity Investment</div>
                <div className="text-3xl font-bold text-green-700">$40,520</div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white rounded text-xs">
              <p className="text-gray-700">
                <span className="font-semibold">Structure:</span> 95/5 ownership determines tax allocations and capital return. 
                70/30 split applies to ongoing distributions and profits after capital return and preferred return.
              </p>
            </div>
          </div>
        </div>
      )
    },

    // Slide 3: What is Cost Segregation
    {
      title: "What is Cost Segregation?",
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <p className="text-lg text-gray-700 leading-relaxed">
              Cost segregation is an IRS-approved tax strategy that <span className="font-bold">accelerates depreciation deductions</span> by 
              reclassifying components of real property from 27.5-year depreciation to shorter periods (5 and 15 years).
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
              <div className="text-3xl font-bold text-green-600 mb-2">5 Years</div>
              <div className="text-sm font-semibold text-gray-600 mb-3">PERSONAL PROPERTY</div>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Carpeting & flooring</li>
                <li>• Appliances</li>
                <li>• Window treatments</li>
                <li>• Landscaping</li>
                <li>• Decorative fixtures</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-500">
              <div className="text-3xl font-bold text-yellow-600 mb-2">15 Years</div>
              <div className="text-sm font-semibold text-gray-600 mb-3">LAND IMPROVEMENTS</div>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Parking lots</li>
                <li>• Sidewalks</li>
                <li>• Fencing</li>
                <li>• Pool & amenities</li>
                <li>• Site improvements</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gray-500">
              <div className="text-3xl font-bold text-gray-600 mb-2">27.5 Years</div>
              <div className="text-sm font-semibold text-gray-600 mb-3">BUILDING STRUCTURE</div>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Foundation</li>
                <li>• Framing</li>
                <li>• Roof structure</li>
                <li>• Exterior walls</li>
                <li>• Core systems</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="text-3xl">💡</div>
              <div>
                <div className="font-bold text-green-800 mb-2">The Bonus: 100% First-Year Depreciation</div>
                <p className="text-gray-700">
                  Under current tax law, 5 and 15-year property qualifies for <span className="font-bold">100% bonus depreciation</span>, 
                  allowing immediate deduction of these assets in Year 1.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 4: The Numbers
    {
      title: "Cost Segregation Breakdown",
      subtitle: "Weinland Park Summit - $3.2M Acquisition",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
            <div className="text-center space-y-2">
              <div className="text-sm text-blue-600 font-semibold">DEPRECIABLE BASIS</div>
              <div className="text-5xl font-bold text-blue-900">$2,560,000</div>
              <div className="text-sm text-gray-600">(Purchase price $3.2M less 20% land value)</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
              <div className="text-sm text-gray-600 mb-2">5-YEAR PROPERTY</div>
              <div className="text-3xl font-bold text-green-600 mb-1">$768,000</div>
              <div className="text-xs text-gray-500">30% of basis</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-yellow-500">
              <div className="text-sm text-gray-600 mb-2">15-YEAR PROPERTY</div>
              <div className="text-3xl font-bold text-yellow-600 mb-1">$256,000</div>
              <div className="text-xs text-gray-500">10% of basis</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-gray-400">
              <div className="text-sm text-gray-600 mb-2">27.5-YEAR PROPERTY</div>
              <div className="text-3xl font-bold text-gray-600 mb-1">$1,536,000</div>
              <div className="text-xs text-gray-500">60% of basis</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Year 1 Depreciation Comparison</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-700">Without Cost Segregation</div>
                  <div className="text-sm text-gray-500">Standard 27.5-year depreciation</div>
                </div>
                <div className="text-2xl font-bold text-red-600">$93,091</div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-700">With Cost Seg + Bonus Depreciation</div>
                  <div className="text-sm text-gray-500">Accelerated + immediate writeoff</div>
                </div>
                <div className="text-2xl font-bold text-green-600">$1,079,855</div>
              </div>

              <div className="flex justify-between items-center p-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white">
                <div>
                  <div className="font-bold text-lg">Additional Year 1 Tax Loss</div>
                  <div className="text-sm opacity-90">Available to offset investor income</div>
                </div>
                <div className="text-3xl font-bold">~$987,000</div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 5: LP Investor Impact
    {
      title: "Limited Partner (LP) Benefits",
      subtitle: "95% Ownership Allocation",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg">
            <div className="text-center space-y-3">
              <div className="text-sm font-semibold opacity-90">YEAR 1 TAX LOSS TO LPs</div>
              <div className="text-6xl font-bold">$937,600</div>
              <div className="text-sm opacity-90">95% of total depreciation allocated to Limited Partners</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-purple-500">
              <div className="text-sm text-gray-600 mb-2">AT 37% TAX BRACKET</div>
              <div className="text-3xl font-bold text-purple-600">$346,912</div>
              <div className="text-xs text-gray-500 mt-2">Total LP tax savings</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-purple-400">
              <div className="text-sm text-gray-600 mb-2">AT 32% TAX BRACKET</div>
              <div className="text-3xl font-bold text-purple-500">$300,032</div>
              <div className="text-xs text-gray-500 mt-2">Total LP tax savings</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-purple-300">
              <div className="text-sm text-gray-600 mb-2">AT 24% TAX BRACKET</div>
              <div className="text-3xl font-bold text-purple-400">$225,024</div>
              <div className="text-xs text-gray-500 mt-2">Total LP tax savings</div>
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Example: $100K LP Investment</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded">
                <span className="text-gray-700">Capital Invested</span>
                <span className="font-bold text-gray-900">$100,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded">
                <span className="text-gray-700">Year 1 Tax Loss Allocation</span>
                <span className="font-bold text-blue-600">$121,800</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded">
                <span className="text-gray-700">Tax Savings (37% bracket)</span>
                <span className="font-bold text-green-600">$45,066</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-500 to-green-600 rounded text-white">
                <span className="font-bold">Effective Cost Basis After Tax Benefit</span>
                <span className="font-bold text-xl">$54,934</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-5 rounded-lg">
            <p className="text-center text-gray-700">
              <span className="font-bold text-blue-700">Bottom Line:</span> High-bracket investors may recoup <span className="font-bold">45%+ of their investment</span> through Year 1 tax savings alone
            </p>
          </div>

          <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-3 text-gray-800">Total LP Investment Breakdown</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded">
                <div className="text-sm text-gray-600 mb-1">Total LP Equity</div>
                <div className="text-3xl font-bold text-blue-700">$769,880</div>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <div className="text-sm text-gray-600 mb-1">After Year 1 Tax Benefit</div>
                <div className="text-3xl font-bold text-green-700">$422,968</div>
                <div className="text-xs text-gray-500 mt-1">Effective economic outlay @ 37%</div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 6: Refinance Strategy
    {
      title: "Year 2 Refinance Strategy",
      subtitle: "Value-Add Execution Creates Refinance Opportunity",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-lg">
            <div className="text-center space-y-3">
              <div className="text-sm font-semibold opacity-90">PROJECTED REFINANCE PROCEEDS TO EQUITY</div>
              <div className="text-6xl font-bold">$441,000</div>
              <div className="text-lg opacity-90">Expected net fund-out at refinance (per model)</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">18-Month Value-Add Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">0</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Acquisition</div>
                  <div className="text-sm text-gray-600">Close on property, begin stabilization</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">NOI Run-Rate</div>
                  <div className="font-bold text-gray-800">$180,000</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">6</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">11 Units Renovated (35%)</div>
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
                  <div className="font-semibold text-gray-800">22 Units Renovated (71%)</div>
                  <div className="text-sm text-gray-600">Refinance eligible</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">NOI Run-Rate</div>
                  <div className="font-bold text-green-700">$260,000</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded border-2 border-green-300">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">18</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">31 Units Renovated (100%)</div>
                  <div className="text-sm text-gray-600">Fully stabilized</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">NOI Run-Rate</div>
                  <div className="font-bold text-green-700">$290,000</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-500">
              <h4 className="font-bold text-blue-700 text-lg mb-4">At Acquisition</h4>
              <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="text-sm text-gray-800">Purchase Price</span>
                  <span className="font-bold text-gray-900">$3,200,000</span>
                </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="text-sm text-gray-800">Year 1 NOI</span>
                  <span className="font-bold text-gray-900">$242,051</span>
                </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="text-sm text-gray-800">Going-In Cap Rate</span>
                  <span className="font-bold text-gray-900">7.6%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-500">
              <h4 className="font-bold text-green-700 text-lg mb-4">At Refinance (Month 18)</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span className="text-sm text-gray-800">Appraised Value</span>
                  <span className="font-bold text-gray-900">$4,450,922</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span className="text-sm text-gray-800">Stabilized NOI</span>
                  <span className="font-bold text-gray-900">$290,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span className="text-sm text-gray-800">Implied Exit Cap</span>
                  <span className="font-bold text-gray-900">6.5%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-6">
            <h4 className="font-bold text-purple-800 mb-4 text-center text-xl">Refinance Proceeds Distribution</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <div className="text-sm text-gray-600 mb-1">Total Net Refi Proceeds</div>
                <div className="text-3xl font-bold text-purple-700">$441,000</div>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <div className="text-sm text-gray-600 mb-1">New Perm Loan</div>
                <div className="text-2xl font-bold text-gray-700">$3,449,464</div>
              </div>
              <div className="bg-blue-50 p-4 rounded border-2 border-blue-300">
                <div className="text-sm text-gray-600 mb-1">LP Share (95%)</div>
                <div className="text-3xl font-bold text-blue-700">$418,950</div>
              </div>
              <div className="bg-green-50 p-4 rounded border-2 border-green-300">
                <div className="text-sm text-gray-600 mb-1">GP Share (5%)</div>
                <div className="text-2xl font-bold text-green-700">$22,050</div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white rounded text-xs">
              <p className="text-gray-700">
                <span className="font-semibold">Distribution Method:</span> Refinance proceeds distributed pro-rata (95/5) as partial return 
                of capital during catch-up period, prior to preferred return being fully satisfied.
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">⚡</div>
              <div>
                <div className="font-bold text-yellow-800 mb-1">Key Advantage: Tax-Free Cash Return</div>
                <p className="text-sm text-gray-700">
                  Because LPs will have negative or minimal tax basis after Year 1 cost segregation, the refinance proceeds are typically <span className="font-bold">tax-free</span>. This is a return of capital, not taxable income.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 7: The Complete Picture
    {
      title: "The Complete LP Economic Journey",
      subtitle: "From $769,880 Investment to Near-Zero Basis in 18 Months",
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-gray-300">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">LP Cash Flow Timeline</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-5 bg-red-50 border-l-4 border-red-500 rounded">
                <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  Mo 0
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg text-gray-800">Initial Investment</div>
                  <div className="text-sm text-gray-600 mt-1">LP equity contribution to close</div>
                  <div className="text-3xl font-bold text-red-600 mt-2">-$769,880</div>
                  <div className="text-right text-sm text-gray-600 mt-2">Running Economic Outlay: <span className="font-bold">$769,880</span></div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 bg-green-50 border-l-4 border-green-500 rounded">
                <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  Mo 12
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg text-gray-800">Year 1 Tax Filing</div>
                  <div className="text-sm text-gray-600 mt-1">IRS refund / reduced tax liability (37% bracket)</div>
                  <div className="text-3xl font-bold text-green-600 mt-2">+$346,912</div>
                  <div className="text-right text-sm text-gray-600 mt-2">Running Economic Outlay: <span className="font-bold">$422,968</span></div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 bg-blue-50 border-l-4 border-blue-500 rounded">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  Mo 18
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg text-gray-800">Refinance Distribution</div>
                  <div className="text-sm text-gray-600 mt-1">Tax-free return of capital (95% of $441K)</div>
                  <div className="text-3xl font-bold text-blue-600 mt-2">+$418,950</div>
                  <div className="text-right text-sm text-gray-600 mt-2">Running Economic Outlay: <span className="font-bold text-green-600">$4,018</span></div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 bg-purple-50 border-l-4 border-purple-500 rounded">
                <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold flex-shrink-0">
                  Mo 18+
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg text-gray-800">Ongoing Ownership</div>
                  <div className="text-sm text-gray-600 mt-1">Receiving 70% of cash distributions + 70% of profits at sale (after capital & preferred return)</div>
                  <div className="text-lg font-bold text-purple-600 mt-2">Still own 95% of $4.45M asset</div>
                  <div className="text-sm text-gray-600 mt-2 italic">All future returns calculated on ~$4K remaining basis = &quot;infinite&quot; returns</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-lg text-center">
              <div className="text-sm font-semibold opacity-90 mb-2">INITIAL INVESTMENT</div>
              <div className="text-4xl font-bold">$769,880</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg text-center">
              <div className="text-sm font-semibold opacity-90 mb-2">TOTAL RECOVERED</div>
              <div className="text-4xl font-bold">$765,862</div>
              <div className="text-sm opacity-90 mt-1">By Month 18</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg text-center">
              <div className="text-sm font-semibold opacity-90 mb-2">NET OUTLAY</div>
              <div className="text-4xl font-bold">$4,018</div>
              <div className="text-sm opacity-90 mt-1">0.5% of original</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg">
            <div className="text-center space-y-3">
              <div className="text-3xl font-bold">🎯 The Bottom Line</div>
              <p className="text-xl leading-relaxed">
                LPs recover <span className="font-bold text-yellow-300">99.5% of their capital</span> within 18 months through 
                tax benefits and refinance proceeds, while maintaining <span className="font-bold text-yellow-300">95% ownership and 70% profit participation</span>
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
            <div className="flex items-start space-x-3">
              <div className="text-3xl">💡</div>
              <div>
                <div className="font-bold text-yellow-800 mb-2">What This Means</div>
                <p className="text-gray-700">
                  This is the power of combining strategic tax planning with disciplined value-add execution. LPs achieve an &quot;infinite return&quot; position 
                  where all future cash flows and appreciation represent pure profit with minimal capital at risk.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 8: Comparison With/Without
    {
      title: "Impact Comparison",
      subtitle: "With vs. Without Cost Segregation & Refinance Strategy",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-red-500">
              <h3 className="text-xl font-bold text-center mb-6 text-red-700">WITHOUT Strategy</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded">
                  <div className="text-sm text-gray-600 mb-1">Initial Investment</div>
                  <div className="text-2xl font-bold text-gray-800">$769,880</div>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <div className="text-sm text-gray-600 mb-1">Year 1 Tax Benefit (standard)</div>
                  <div className="text-2xl font-bold text-gray-800">$32,644</div>
                  <div className="text-xs text-gray-500 mt-1">@ 37% on $88,228 depreciation</div>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <div className="text-sm text-gray-600 mb-1">Refi Proceeds (Month 18)</div>
                  <div className="text-2xl font-bold text-green-600">$418,950</div>
                  <div className="text-xs text-gray-500 mt-1">Same refi opportunity</div>
                </div>
                <div className="bg-red-100 p-4 rounded border-2 border-red-300">
                  <div className="text-sm text-gray-700 mb-1 font-semibold">Net Economic Outlay</div>
                  <div className="text-3xl font-bold text-red-700">$318,286</div>
                  <div className="text-xs text-gray-600 mt-1">Still $318K at risk</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-500">
              <h3 className="text-xl font-bold text-center mb-6 text-green-700">WITH Strategy</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded">
                  <div className="text-sm text-gray-600 mb-1">Initial Investment</div>
                  <div className="text-2xl font-bold text-gray-800">$769,880</div>
                </div>
                <div className="bg-green-50 p-4 rounded">
                  <div className="text-sm text-gray-600 mb-1">Year 1 Tax Benefit (cost seg)</div>
                  <div className="text-2xl font-bold text-green-700">$346,912</div>
                  <div className="text-xs text-gray-500 mt-1">@ 37% on $937,600 losses</div>
                </div>
                <div className="bg-green-50 p-4 rounded">
                  <div className="text-sm text-gray-600 mb-1">Refi Proceeds (Month 18)</div>
                  <div className="text-2xl font-bold text-green-600">$418,950</div>
                  <div className="text-xs text-gray-500 mt-1">Tax-free return</div>
                </div>
                <div className="bg-green-100 p-4 rounded border-2 border-green-400">
                  <div className="text-sm text-gray-700 mb-1 font-semibold">Net Economic Outlay</div>
                  <div className="text-3xl font-bold text-green-700">$4,018</div>
                  <div className="text-xs text-gray-600 mt-1">99.5% capital recovered!</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg shadow-xl">
            <div className="text-center space-y-4">
              <div className="text-sm font-semibold opacity-90">ADDITIONAL BENEFIT FROM COST SEGREGATION</div>
              <div className="text-6xl font-bold">$314,268</div>
              <div className="text-lg opacity-90">in reduced capital at risk by Month 18</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">Key Metrics Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="p-3 text-left text-gray-900">Metric</th>
                    <th className="p-3 text-right text-red-600">Without Cost Seg</th>
                    <th className="p-3 text-right text-green-600">With Cost Seg</th>
                    <th className="p-3 text-right text-blue-600">Difference</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3 text-gray-800">Year 1 Tax Benefit</td>
                    <td className="p-3 text-right font-mono text-gray-900">$32,644</td>
                    <td className="p-3 text-right font-mono text-green-600 font-bold">$346,912</td>
                    <td className="p-3 text-right font-mono text-blue-600 font-bold">+$314,268</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3 text-gray-800">Capital at Risk (Mo 18)</td>
                    <td className="p-3 text-right font-mono text-gray-900">$318,286</td>
                    <td className="p-3 text-right font-mono text-green-600 font-bold">$4,018</td>
                    <td className="p-3 text-right font-mono text-blue-600 font-bold">-$314,268</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3 text-gray-800">% Capital Recovered</td>
                    <td className="p-3 text-right font-mono text-gray-900">58.7%</td>
                    <td className="p-3 text-right font-mono text-green-600 font-bold">99.5%</td>
                    <td className="p-3 text-right font-mono text-blue-600 font-bold">+40.8%</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="p-3 font-bold text-gray-900">Ownership Position</td>
                    <td className="p-3 text-right font-mono text-gray-900">95%</td>
                    <td className="p-3 text-right font-mono text-green-600 font-bold">95%</td>
                    <td className="p-3 text-right font-mono text-gray-900">Unchanged ✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded">
            <p className="text-center text-gray-700 text-lg">
              <span className="font-bold text-purple-700">The Key Insight:</span> Both scenarios produce the same refinance proceeds, 
              but cost segregation adds <span className="font-bold">$314K in Year 1 tax savings</span>, 
              reducing LP capital at risk from $318K to just <span className="font-bold">$4K</span>
            </p>
          </div>
        </div>
      )
    },

    // Slide 9: Tax Recapture
    {
      title: "Understanding Tax Recapture",
      subtitle: "What Happens at Sale",
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <p className="text-lg text-gray-700 leading-relaxed">
              When the property is sold, depreciation taken must be "recaptured" and taxed. However, the <span className="font-bold">time value of money</span> and <span className="font-bold">favorable recapture rates</span> still result in significant net benefits.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Example: Sale in Year 5</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-700">Sale Price (assumed appreciation)</span>
                <span className="font-mono font-bold text-gray-900">$5,000,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-700">Adjusted Basis (after depreciation)</span>
                <span className="font-mono font-bold text-gray-900">$1,480,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                <span className="font-semibold text-gray-700">Total Gain</span>
                <span className="font-mono font-bold text-blue-600">$3,520,000</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-orange-500">
              <h4 className="font-bold text-orange-700 mb-4">Depreciation Recapture</h4>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">Amount recaptured</div>
                <div className="text-3xl font-bold text-gray-800">$1,080,000</div>
                <div className="text-sm text-gray-600 mt-2">Tax rate</div>
                <div className="text-2xl font-bold text-orange-600">25%</div>
                <div className="border-t-2 border-orange-200 mt-3 pt-3">
                  <div className="text-sm text-gray-600">Tax owed</div>
                  <div className="text-2xl font-bold text-orange-700">$270,000</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-500">
              <h4 className="font-bold text-green-700 mb-4">Long-Term Capital Gains</h4>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">Gain amount</div>
                <div className="text-3xl font-bold text-gray-800">$2,440,000</div>
                <div className="text-sm text-gray-600 mt-2">Tax rate</div>
                <div className="text-2xl font-bold text-green-600">20%</div>
                <div className="border-t-2 border-green-200 mt-3 pt-3">
                  <div className="text-sm text-gray-600">Tax owed</div>
                  <div className="text-2xl font-bold text-green-700">$488,000</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-300">
            <h4 className="font-bold text-purple-800 mb-4 text-center text-xl">Tax Allocation Analysis (95/5 Ownership Split)</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded">
                <span className="text-gray-700">Year 1-5 Cumulative Tax Savings (LP)</span>
                <span className="font-bold text-green-600">+$425,432</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded">
                <span className="text-gray-700">Year 5 Total Tax on Sale</span>
                <span className="font-bold text-red-600">$758,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded">
                <span className="text-gray-700">LP Tax Allocation (95% of gain)</span>
                <span className="font-bold text-red-600">-$720,100</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded text-white">
                <span className="font-bold text-lg">NET TAX POSITION</span>
                <span className="font-bold text-2xl">-$294,668</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded text-xs">
              <p className="text-gray-700">
                <span className="font-semibold">Note:</span> Tax allocations follow 95/5 ownership. Cash distributions follow waterfall: 
                return of capital (pro-rata), preferred return (70/30), remaining profits (70/30). LPs receive higher percentage of cash 
                than tax liability at sale, which is favorable.
              </p>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
            <div className="flex items-start space-x-3">
              <div className="text-3xl">✓</div>
              <div>
                <div className="font-bold text-green-800 mb-2">Why This Still Makes Sense</div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <span className="font-semibold">Time value of money:</span> $347K benefit in Year 1 vs. $720K tax in Year 5 (5 years to invest/use that capital)</li>
                  <li>• <span className="font-semibold">Rate arbitrage:</span> Saved at 37% rate, pay back weighted average of ~21.5%</li>
                  <li>• <span className="font-semibold">Refinance benefit:</span> Got $419K tax-free in Year 2 that remains tax-free forever</li>
                  <li>• <span className="font-semibold">Cash flow benefit:</span> Improved cash-on-cash returns throughout hold period</li>
                  <li>• <span className="font-semibold">1031 exchange option:</span> Can defer all taxes by exchanging into another property</li>
                  <li>• <span className="font-semibold">Appreciation gains:</span> $1.8M in appreciation (56% gain) far exceeds net tax cost</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-center text-gray-700">
              <span className="font-bold text-blue-700">Important Note:</span> Even after accounting for recapture, LPs benefit from having 
              recovered 99.5% of their capital by Month 18, plus receiving distributions throughout the hold period, plus participating in 
              $1.8M of property appreciation. The net economics are still extremely favorable.
            </p>
          </div>
        </div>
      )
    },

    // Slide 10: Who Benefits Most
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
              <ul className="space-y-3 text-sm text-gray-800">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><span className="font-semibold">High-income earners</span> in the 32-37% tax brackets</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><span className="font-semibold">Real estate professionals</span> (750+ hours, more than any other job)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><span className="font-semibold">Investors with passive income</span> from other real estate or businesses</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><span className="font-semibold">Active participants</span> in real estate investing (multiple properties)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><span className="font-semibold">Investors seeking immediate tax relief</span> to redeploy capital</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><span className="font-semibold">Long-term investors</span> who understand recapture dynamics</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg border-2 border-yellow-400">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">⚠️</div>
                <h3 className="text-xl font-bold text-yellow-800">Limited Immediate Benefit</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-800">
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span><span className="font-semibold">Lower tax bracket investors</span> (benefit exists but is reduced)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span><span className="font-semibold">W-2 employees without passive income</span> (losses suspended until sale or future passive income)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span><span className="font-semibold">First-time passive investors</span> (still benefit, but can&apos;t use losses immediately)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span><span className="font-semibold">Investors using 1031 exchange</span> (reduced depreciable basis)</span>
                </li>
              </ul>
              <div className="mt-4 p-4 bg-yellow-200 rounded text-xs">
                <p className="font-semibold text-yellow-900">Note: Suspended losses are NOT lost—they carry forward and can be used against future passive income or at the time of sale.</p>
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
                <div className="text-xs text-gray-600">Immediate benefit</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="font-bold text-purple-700 mb-2">Has Passive Income</div>
                <div className="text-sm text-gray-700">Can use losses to offset passive income from other sources</div>
                <div className="mt-3 text-2xl font-bold text-purple-600">100%</div>
                <div className="text-xs text-gray-600">Immediate benefit</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="font-bold text-orange-700 mb-2">W-2 Employee Only</div>
                <div className="text-sm text-gray-700">Losses suspended until generate passive income or sell property</div>
                <div className="mt-3 text-2xl font-bold text-orange-600">Deferred</div>
                <div className="text-xs text-gray-600">Future benefit</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <p className="text-center text-gray-700">
              <span className="font-bold text-blue-700">Bottom Line:</span> Even if you can&apos;t use losses immediately, they create value by reducing taxes at sale or when you generate future passive income. The strategy works for all investors, but provides <span className="font-bold">immediate cash benefits</span> for those who can utilize losses now. Plus, the <span className="font-bold">refinance benefit is available to everyone regardless of tax status</span>.
            </p>
          </div>
        </div>
      )
    },

    // Slide 11: Important Disclaimers
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
              These projections are for illustrative purposes only. Actual tax benefits depend on your individual tax situation, income sources, 
              filing status, and ability to utilize passive losses. <span className="font-bold">You must consult with your CPA or tax advisor</span> before 
              relying on these estimates.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-blue-500">
            <h4 className="font-bold text-blue-800 mb-3">Key Assumptions</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Cost segregation study assumptions are based on typical multifamily properties (30% 5-year, 10% 15-year property)</li>
              <li>• Actual reclassification percentages will be determined by a qualified cost segregation engineer</li>
              <li>• Tax brackets and rates are based on 2025 federal tax law and may change</li>
              <li>• 100% bonus depreciation is available under current law but may be phased out or modified</li>
              <li>• Land value assumed at 20% of purchase price (actual may vary based on appraisal)</li>
              <li>• Refinance projections are based on current proforma and subject to lender underwriting and market conditions</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-yellow-500">
            <h4 className="font-bold text-yellow-800 mb-3">Risks & Limitations</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <span className="font-semibold">Passive loss limitations:</span> W-2 employees may not be able to use losses immediately</li>
              <li>• <span className="font-semibold">Recapture risk:</span> Early sale results in recapture taxes, reducing overall benefit</li>
              <li>• <span className="font-semibold">Legislative risk:</span> Tax laws can change; bonus depreciation may be reduced or eliminated</li>
              <li>• <span className="font-semibold">Alternative Minimum Tax (AMT):</span> Some investors may be subject to AMT, reducing benefits</li>
              <li>• <span className="font-semibold">State taxes:</span> State tax treatment varies; some states don't allow bonus depreciation</li>
              <li>• <span className="font-semibold">1031 exchange impact:</span> Exchanging into this property may limit depreciable basis</li>
              <li>• <span className="font-semibold">Refinance contingencies:</span> Refinance is contingent on successful value-add execution, market conditions, and lender approval</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-green-500">
            <h4 className="font-bold text-green-800 mb-3">Study Cost & Timeline</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded">
                <div className="text-sm text-gray-600 mb-1">Estimated Cost</div>
                <div className="text-2xl font-bold text-green-700">$8,000 - $12,000</div>
                <div className="text-xs text-gray-600 mt-1">One-time expense</div>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <div className="text-sm text-gray-600 mb-1">Timeline</div>
                <div className="text-2xl font-bold text-green-700">4-8 weeks</div>
                <div className="text-xs text-gray-600 mt-1">From engagement to delivery</div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-5 rounded">
            <h4 className="font-bold text-purple-800 mb-2">IRS Compliance</h4>
            <p className="text-sm text-gray-700">
              Cost segregation studies must be performed by qualified professionals and comply with IRS guidelines. Our study will be conducted 
              by an engineering-based cost segregation firm with IRS audit defense support. The methodology follows the IRS Audit Techniques Guide 
              for cost segregation.
            </p>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded">
            <h4 className="font-bold text-orange-800 mb-2">Conservative Underwriting</h4>
            <p className="text-sm text-gray-700">
              Our base case financial projections <span className="font-bold">do not include or rely upon</span> cost segregation benefits to achieve 
              targeted returns. Tax benefits and refinance proceeds represent <span className="font-bold">upside</span> to our conservative underwriting. 
              The deal must work on fundamentals alone.
            </p>
          </div>

          <div className="bg-gray-100 p-5 rounded text-center">
            <p className="text-sm text-gray-600 italic">
              This presentation is for informational purposes only and does not constitute tax, legal, or investment advice. 
              Tax benefits are not guaranteed and depend on individual circumstances. Past performance does not guarantee future results. 
              Please read the Private Placement Memorandum for complete details on risks and terms.
            </p>
          </div>
        </div>
      )
    },

    // Slide 12: Next Steps
    {
      title: "Next Steps & Questions",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-center">Your Action Items</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="text-4xl mb-3">1️⃣</div>
                <h4 className="font-bold mb-2 text-lg text-blue-800">Consult Your CPA</h4>
                <p className="text-sm text-gray-700">
                  Share this analysis with your tax advisor to determine your specific benefit based on your tax situation
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="text-4xl mb-3">2️⃣</div>
                <h4 className="font-bold mb-2 text-lg text-blue-800">Assess Your Situation</h4>
                <p className="text-sm text-gray-700">
                  Determine if you can utilize passive losses or qualify as a real estate professional
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="text-4xl mb-3">3️⃣</div>
                <h4 className="font-bold mb-2 text-lg text-blue-800">Review Investment Docs</h4>
                <p className="text-sm text-gray-700">
                  Read the PPM and operating agreement for full tax allocation details
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="text-4xl mb-3">4️⃣</div>
                <h4 className="font-bold mb-2 text-lg text-blue-800">Ask Questions</h4>
                <p className="text-sm text-gray-700">
                  Schedule a call with our team to discuss any questions or concerns
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Common Investor Questions</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="font-semibold text-gray-800 mb-1">Q: What if I can't use the losses right away?</p>
                <p className="text-sm text-gray-600">A: Losses carry forward indefinitely and can be used when you have passive income or when the property is sold. Plus, you still benefit from the tax-free refinance proceeds.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="font-semibold text-gray-800 mb-1">Q: Does this affect my cash distributions?</p>
                <p className="text-sm text-gray-600">A: No. Cash distributions follow the 70/30 profit split. Tax allocations follow the 95/5 ownership structure. These are separate.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="font-semibold text-gray-800 mb-1">Q: Is the refinance guaranteed?</p>
                <p className="text-sm text-gray-600">A: No. The refinance is contingent on successful value-add execution, market conditions, and lender approval. However, our model is conservative and based on comparable transactions.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="font-semibold text-gray-800 mb-1">Q: What happens if we sell before Year 5?</p>
                <p className="text-sm text-gray-600">A: You&apos;ll pay recapture taxes on the depreciation taken, but you still benefit from the time value of money and rate arbitrage. The economic benefit remains positive.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="font-semibold text-gray-800 mb-1">Q: Can I do a 1031 exchange when I exit?</p>
                <p className="text-sm text-gray-600">A: Yes, and that would defer ALL taxes (both recapture and capital gains) to your next investment.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="font-semibold text-gray-800 mb-1">Q: Is this aggressive or risky tax planning?</p>
                <p className="text-sm text-gray-600">A: No. Cost segregation and bonus depreciation are mainstream, IRS-approved strategies used by institutional investors and REITs nationwide.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-5 rounded-lg text-center border-2 border-blue-200">
              <div className="text-3xl mb-2">📧</div>
              <div className="font-bold text-gray-800">Email Us</div>
              <div className="text-sm text-gray-600 mt-1">Schedule a consultation</div>
            </div>
            <div className="bg-green-50 p-5 rounded-lg text-center border-2 border-green-200">
              <div className="text-3xl mb-2">📞</div>
              <div className="font-bold text-gray-800">Call Us</div>
              <div className="text-sm text-gray-600 mt-1">Speak with our team</div>
            </div>
            <div className="bg-purple-50 p-5 rounded-lg text-center border-2 border-purple-200">
              <div className="text-3xl mb-2">📄</div>
              <div className="font-bold text-gray-800">Review Docs</div>
              <div className="text-sm text-gray-600 mt-1">Read the full PPM</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg text-center">
            <p className="text-2xl font-bold mb-2">Ready to Move Forward?</p>
            <p className="text-lg opacity-90">Let&apos;s discuss how the Weinland Park Summit opportunity fits your investment goals</p>
          </div>
        </div>
      )
    },

    // Slide 13: Summary
    {
      title: "Executive Summary",
      subtitle: "Weinland Park Summit Portfolio",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg text-center">
            <h3 className="text-3xl font-bold mb-3">The Power of Strategic Tax Planning + Value-Add Execution</h3>
            <p className="text-lg opacity-90">32-unit multifamily repositioning with accelerated capital return</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-500">
              <h4 className="font-bold text-green-700 text-xl mb-4 text-center">Tax Benefits</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span className="text-sm">Year 1 LP Benefit</span>
                  <span className="font-bold text-green-600">$347K</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span className="text-sm">Per $100K Invested</span>
                  <span className="font-bold text-green-600">$45K</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-500">
              <h4 className="font-bold text-blue-700 text-xl mb-4 text-center">Refinance</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="text-sm">Year 2 LP Proceeds</span>
                  <span className="font-bold text-blue-600">$419K</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="text-sm">Tax Treatment</span>
                  <span className="font-bold text-blue-600">Tax-Free</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-purple-500">
              <h4 className="font-bold text-purple-700 text-xl mb-4 text-center">Net Result</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                  <span className="text-sm">Capital Recovered</span>
                  <span className="font-bold text-purple-600">99.5%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                  <span className="text-sm">By Month</span>
                  <span className="font-bold text-purple-600">18</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h4 className="font-bold text-gray-800 text-xl mb-4 text-center">Why This Deal is Compelling</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl mb-2">💰</div>
                <div className="font-bold text-purple-700 mb-1">Immediate Value</div>
                <p className="text-sm text-gray-600">45% Year 1 tax benefit for high-bracket investors</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl mb-2">🏗️</div>
                <div className="font-bold text-blue-700 mb-1">Value-Add Execution</div>
                <p className="text-sm text-gray-600">NOI growth from $180K to $290K through renovations</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl mb-2">🎯</div>
                <div className="font-bold text-green-700 mb-1">Capital Efficiency</div>
                <p className="text-sm text-gray-600">$4K remaining basis while owning $4.45M asset</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-300">
            <h4 className="font-bold text-purple-800 mb-4 text-center text-xl">The Bottom Line</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded">
                <span className="text-gray-700">Total LP Equity Required</span>
                <span className="font-bold text-gray-900">$769,880</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded">
                <span className="text-gray-700">Year 1 Tax Benefit (37% bracket)</span>
                <span className="font-bold text-green-600">-$346,912</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded">
                <span className="text-gray-700">Year 2 Refi Proceeds (tax-free)</span>
                <span className="font-bold text-blue-600">-$418,950</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded text-white">
                <span className="font-bold text-lg">NET ECONOMIC OUTLAY</span>
                <span className="font-bold text-3xl">$4,018</span>
              </div>
            </div>
            <p className="text-center text-purple-800 font-semibold mt-4">
              While maintaining 95% ownership, receiving 70% of ongoing cash flows, and 70% of profits at sale
            </p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
            <div className="flex items-start space-x-3">
              <div className="text-3xl">💡</div>
              <div>
                <div className="font-bold text-yellow-800 mb-2">Conservative Underwriting</div>
                <p className="text-gray-700">
                  We've underwritten this deal <span className="font-bold">WITHOUT</span> relying on cost segregation benefits or refinance proceeds
                  to hit our return targets. These strategies represent <span className="font-bold">pure upside</span> to a fundamentally sound investment—not 
                  a requirement to make the deal work.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8 rounded-lg text-center">
            <p className="text-2xl font-bold mb-3">Questions About Weinland Park Summit?</p>
            <p className="text-lg mb-4">We&apos;re here to help you understand how this opportunity fits your portfolio</p>
            <div className="text-sm opacity-75">
              Please consult with your tax advisor to determine your individual tax benefits
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
    <div className="slide-root flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full p-6">
        {/* Slide Container */}
        <div className="bg-white rounded-lg shadow-2xl flex-1 flex flex-col overflow-hidden">
          {/* Slide Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold">{slides[currentSlide].title}</h1>
            {slides[currentSlide].subtitle && (
              <p className="text-lg mt-2 opacity-90">{slides[currentSlide].subtitle}</p>
            )}
          </div>

          {/* Slide Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            {slides[currentSlide].content}
          </div>

          {/* Slide Footer with Navigation */}
          <div className="bg-gray-50 border-t border-gray-200 p-4 rounded-b-lg">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              {/* Previous Button */}
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

              {/* Slide Indicators */}
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

              {/* Next Button */}
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

            {/* Slide Counter */}
            <div className="text-center mt-3 text-sm text-gray-600">
              Slide {currentSlide + 1} of {slides.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostSegPresentation;


