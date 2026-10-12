import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  MessageSquare, 
  ShoppingCart, 
  Phone, 
  Mail, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  DollarSign
} from 'lucide-react';
import { MOCK_CUSTOMERS } from '../../data/mockData';
import { CustomerLead } from '../../types/growth';
import { useApp } from '../../context/AppContext';

export const CrmView: React.FC = () => {
  const { showToast, openWizard } = useApp();
  const [customers, setCustomers] = useState<CustomerLead[]>(MOCK_CUSTOMERS);
  const [selectedSegment, setSelectedSegment] = useState<string>('All');
  const [search, setSearch] = useState('');

  const segments = ['All', 'Cart Abandoned', 'VIP Customer', 'At Risk'];

  const filtered = customers.filter(c => {
    if (selectedSegment !== 'All' && c.status !== selectedSegment) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.phone.includes(q) || c.email.toLowerCase().includes(q);
    }
    return true;
  });

  const handleSendNudge = (cust: CustomerLead) => {
    showToast({
      type: 'success',
      title: 'WhatsApp Nudge Sent!',
      message: `Sent 1-tap cart checkout link with GLOW10 to ${cust.name} (${cust.phone}).`,
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            Customer Segments & CRM
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Identify high-value skincare buyers and dropped carts synced live from Shopify.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openWizard('rec_abandoned_cart')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Automate Recovery for All Abandoned Carts</span>
          </button>
        </div>
      </div>

      {/* Segments Breakdown Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Cart Abandoners</div>
          <div className="text-xl font-bold text-rose-600 mt-1">3,420</div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">Ready for WhatsApp recovery</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">VIP Skincare Tier</div>
          <div className="text-xl font-bold text-emerald-700 mt-1">842</div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">Spent &gt; ₹5,000</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">At-Risk (60+ Days)</div>
          <div className="text-xl font-bold text-amber-600 mt-1">1,120</div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">Due for restock nudge</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">WhatsApp Opt-in Rate</div>
          <div className="text-xl font-bold text-slate-900 mt-1">96.8%</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Compliant opt-ins</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {segments.map((seg) => (
              <button
                key={seg}
                type="button"
                onClick={() => setSelectedSegment(seg)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedSegment === seg
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {seg}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-slate-800"
            />
          </div>
        </div>

        {/* Customer Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-5 py-3">Customer</th>
                <th className="px-4 py-3">Segment</th>
                <th className="px-4 py-3">Last Activity</th>
                <th className="px-4 py-3">Items in Cart</th>
                <th className="px-4 py-3">Cart Value</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-800 font-bold flex items-center justify-center shrink-0 border border-emerald-200">
                        {cust.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{cust.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{cust.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      cust.status === 'Cart Abandoned'
                        ? 'bg-rose-100 text-rose-800'
                        : cust.status === 'VIP Customer'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                    }`}>
                      {cust.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-500">{cust.lastActivity}</td>
                  <td className="px-4 py-4">
                    {cust.cartItems && cust.cartItems.length > 0 ? (
                      <div className="max-w-xs truncate text-slate-800 font-medium" title={cust.cartItems.join(', ')}>
                        {cust.cartItems.join(', ')}
                      </div>
                    ) : (
                      <span className="text-slate-400">None</span>
                    )}
                  </td>
                  <td className="px-4 py-4 font-bold text-slate-900">
                    {cust.cartValue ? `₹${cust.cartValue.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-5 py-4 text-right">
                    {cust.status === 'Cart Abandoned' ? (
                      <button
                        type="button"
                        onClick={() => handleSendNudge(cust)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-lg border border-emerald-200 transition-colors text-[11px]"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Send WhatsApp Nudge</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          showToast({
                            type: 'info',
                            title: 'VIP Profile Viewed',
                            message: `${cust.name} has placed ${cust.totalOrders} orders totaling ₹${cust.totalSpent.toLocaleString()}.`,
                          });
                        }}
                        className="text-slate-500 hover:text-slate-800 text-[11px] font-semibold"
                      >
                        View Profile
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
