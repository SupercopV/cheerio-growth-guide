import React, { useState } from 'react';
import { 
  Send, 
  Plus, 
  Calendar, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Filter,
  X,
  MessageSquare
} from 'lucide-react';
import { MOCK_CAMPAIGNS } from '../../data/mockData';
import { CampaignItem } from '../../types/growth';
import { useApp } from '../../context/AppContext';

export const CampaignsView: React.FC = () => {
  const { showToast } = useApp();
  const [campaigns, setCampaigns] = useState<CampaignItem[]>(MOCK_CAMPAIGNS);
  const [filter, setFilter] = useState<'All' | 'Delivered' | 'Scheduled'>('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('Festive Radiance Serum Kit Launch');
  const [newAudience, setNewAudience] = useState('VIP Repeat Buyers (Past 60 Days)');
  const [newSchedule, setNewSchedule] = useState('Tomorrow, 10:00 AM');

  const filteredCampaigns = campaigns.filter(c => {
    if (filter === 'All') return true;
    return c.status === filter;
  });

  const handleCreateCampaign = () => {
    const newCamp: CampaignItem = {
      id: `cmp_${Date.now()}`,
      name: newTitle,
      audience: newAudience,
      status: 'Scheduled',
      sentCount: 2450,
      deliveryRate: 'Upcoming',
      openRate: '-',
      conversionRate: '-',
      revenueGenerated: 'Est. ₹2.2L',
      sentDate: newSchedule,
    };
    setCampaigns([newCamp, ...campaigns]);
    setModalOpen(false);
    showToast({
      type: 'success',
      title: 'Campaign Scheduled!',
      message: `"${newTitle}" scheduled for ${newSchedule} to ${newAudience}.`,
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              WhatsApp Broadcast Campaigns
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
              Illustrative Demo Data
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Reach your GlowBotanics customer segments with pre-approved Meta WhatsApp templates.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New WhatsApp Campaign</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Total Messages Sent</div>
          <div className="text-xl font-bold text-slate-900 mt-1">13,270</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">99.1% Delivery rate</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Avg. WhatsApp Open Rate</div>
          <div className="text-xl font-bold text-emerald-700 mt-1">89.3%</div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">vs 21% industry email avg</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Total Campaign GMV</div>
          <div className="text-xl font-bold text-slate-900 mt-1">₹7,60,200</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Attributed directly</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Active Broadcast Limit</div>
          <div className="text-xl font-bold text-slate-900 mt-1">10,000 / day</div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">Meta Tier 1 Verified</div>
        </div>
      </div>

      {/* Filters & Campaigns Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {(['All', 'Delivered', 'Scheduled'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  filter === tab
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Showing {filteredCampaigns.length} campaigns
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-5 py-3">Campaign Name</th>
                <th className="px-4 py-3">Target Audience</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Delivered</th>
                <th className="px-4 py-3">Open Rate</th>
                <th className="px-4 py-3">Conversion</th>
                <th className="px-5 py-3 text-right">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredCampaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <span>{camp.name}</span>
                        <div className="text-[10px] text-slate-400 font-normal">{camp.sentDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{camp.audience}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      camp.status === 'Delivered' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {camp.status === 'Delivered' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {camp.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-medium">{camp.sentCount.toLocaleString()} ({camp.deliveryRate})</td>
                  <td className="px-4 py-4 font-bold text-emerald-700">{camp.openRate}</td>
                  <td className="px-4 py-4 font-medium">{camp.conversionRate}</td>
                  <td className="px-5 py-4 text-right font-extrabold text-slate-900">{camp.revenueGenerated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Campaign Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-scaleUp">
            <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Create WhatsApp Broadcast
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase text-[10px] mb-1">
                  Campaign Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase text-[10px] mb-1">
                  Recipient Audience Segment
                </label>
                <select
                  value={newAudience}
                  onChange={(e) => setNewAudience(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                >
                  <option>VIP Repeat Buyers (Past 60 Days)</option>
                  <option>Cart Abandoners (Unconverted)</option>
                  <option>All Subscribers (Active 90 Days)</option>
                  <option>Serum & Facial Oil Buyers</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase text-[10px] mb-1">
                  Schedule Time
                </label>
                <input
                  type="text"
                  value={newSchedule}
                  onChange={(e) => setNewSchedule(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80 text-emerald-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Uses Meta-approved marketing template. Projected reach: <strong>2,450 customers</strong> with expected open rate of 88%+.
                </span>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateCampaign}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Schedule Broadcast
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
