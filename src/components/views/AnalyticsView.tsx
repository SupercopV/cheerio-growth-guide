import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  ArrowUpRight, 
  MessageSquare, 
  Mail, 
  Smartphone,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Legend 
} from 'recharts';
import { ANALYTICS_REVENUE_DATA, CHANNEL_PERFORMANCE_DATA } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const AnalyticsView: React.FC = () => {
  const { openWizard } = useApp();
  const [timeRange, setTimeRange] = useState<'14d' | '30d'>('14d');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            Campaign & Recovery Analytics
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time ROI attribution from WhatsApp automations and marketing broadcasts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-white border border-slate-200 rounded-xl p-1 flex items-center text-xs font-semibold">
            <button
              type="button"
              onClick={() => setTimeRange('14d')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                timeRange === '14d' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Last 14 Days
            </button>
            <button
              type="button"
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                timeRange === '30d' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Last 30 Days
            </button>
          </div>
        </div>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Total Recovered Revenue</div>
          <div className="text-xl sm:text-2xl font-bold text-emerald-700 mt-1">₹5,44,700</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-0.5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+28.4% vs last period</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">WhatsApp Open Rate</div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">94.0%</div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">Industry leading</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Conversion Rate</div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">22.4%</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Cart reminders to orders</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Return on Investment (ROI)</div>
          <div className="text-xl sm:text-2xl font-bold text-emerald-700 mt-1">14.2x</div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">Revenue per rupee spent</div>
        </div>
      </div>

      {/* Chart 1: Recovered vs Regular Revenue Over Time */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">
              Recovered Cart GMV vs Organic Store Revenue
            </h3>
            <p className="text-xs text-slate-500">
              Track how much revenue Cheerio WhatsApp automations saved from dropping off.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-3 h-3 rounded-xs bg-emerald-500" />
              WhatsApp Recovered GMV
            </span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-3 h-3 rounded-xs bg-slate-300" />
              Standard Store Sales
            </span>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ANALYTICS_REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="recoveredGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="regularGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#94A3B8" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis 
                tick={{ fontSize: 11, fill: '#64748b' }} 
                axisLine={false} 
                tickLine={false}
                tickFormatter={(val) => `₹${val / 1000}k`}
              />
              <Tooltip 
                formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, '']}
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="regular" stroke="#94A3B8" strokeWidth={2} fillOpacity={1} fill="url(#regularGradient)" name="Standard Sales" />
              <Area type="monotone" dataKey="recovered" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#recoveredGradient)" name="WhatsApp Recovered" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Channel Performance Benchmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Bar Chart Comparison (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">
              Channel Conversion Efficiency
            </h3>
            <p className="text-xs text-slate-500">
              Comparing customer engagement across WhatsApp, Email, and SMS for GlowBotanics.
            </p>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHANNEL_PERFORMANCE_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip 
                  formatter={(val: any) => [`${val}%`, '']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Bar dataKey="openRate" name="Open Rate %" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="clickRate" name="Click Rate %" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="conversionRate" name="Conversion %" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Funnel Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">
              Cart Recovery Funnel
            </h3>
            <p className="text-xs text-slate-500">
              Step-by-step conversion tracking for October.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex justify-between font-bold text-slate-900 mb-1">
                <span>1. Carts Abandoned on Shopify</span>
                <span>3,420 (100%)</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-400 h-full rounded-full w-full" />
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex justify-between font-bold text-slate-900 mb-1">
                <span>2. WhatsApp Nudge Delivered</span>
                <span>3,382 (98.8%)</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full w-[98.8%]" />
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex justify-between font-bold text-slate-900 mb-1">
                <span>3. Shoppers Clicked 1-Tap Link</span>
                <span>1,560 (45.6%)</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full w-[45.6%]" />
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="flex justify-between font-bold text-emerald-950 mb-1">
                <span>4. Completed Orders Recovered</span>
                <span className="text-emerald-700 font-extrabold">766 (22.4%)</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full w-[22.4%]" />
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1.5">
                Total ₹ recovered: ₹14,17,100
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
