import React, { useState } from 'react';
import { 
  Workflow, 
  Plus, 
  Play, 
  Pause, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  MessageSquare,
  AlertCircle,
  MoreVertical,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AutomationsView: React.FC = () => {
  const { automations, toggleAutomationStatus, openWizard, setCurrentTab } = useApp();
  const [filter, setFilter] = useState<'all' | 'active' | 'paused'>('all');

  const filteredAutomations = automations.filter((a) => {
    if (filter === 'all') return true;
    return a.status === filter;
  });

  const totalRecovered = automations.reduce((sum, a) => sum + a.stats.revenueRecovered, 0);
  const totalTriggered = automations.reduce((sum, a) => sum + a.stats.triggered, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              Automated Workflows
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
              Illustrative Demo Data
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Always-on WhatsApp automation triggers monitoring your GlowBotanics Shopify store 24/7.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setCurrentTab('dashboard');
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Discover New Workflows (Growth Guide)</span>
        </button>
      </div>

      {/* Aggregate Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Active Automations</div>
          <div className="text-xl font-bold text-slate-900 mt-1">
            {automations.filter(a => a.status === 'active').length}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Always running</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Customers Triggered</div>
          <div className="text-xl font-bold text-slate-900 mt-1">
            {totalTriggered.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">Across all rules</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Revenue Recovered</div>
          <div className="text-xl font-bold text-emerald-700 mt-1">
            ₹{(totalRecovered / 100000).toFixed(1)}L
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Direct conversion</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Average Recovery Rate</div>
          <div className="text-xl font-bold text-slate-900 mt-1">22.4%</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Top-tier D2C benchmark</div>
        </div>
      </div>

      {/* Automations List */}
      <div className="space-y-4">
        {/* Filter bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {(['all', 'active', 'paused'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-colors ${
                  filter === tab
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-500 font-medium">
            {filteredAutomations.length} workflows
          </span>
        </div>

        {/* Workflow Cards */}
        <div className="space-y-3">
          {filteredAutomations.map((auto) => {
            const isActive = auto.status === 'active';

            return (
              <div
                key={auto.id}
                className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-5 shadow-2xs transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Info & Trigger */}
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <Workflow className="w-5 h-5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">
                          {auto.name}
                        </h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          {isActive ? '● Live' : '○ Paused'}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          {auto.category}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-1">
                        <strong>Trigger:</strong> {auto.trigger}
                      </p>

                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Template: <span className="font-mono">{auto.templateName}</span> • Last triggered: {auto.lastActive}
                      </p>
                    </div>
                  </div>

                  {/* Middle: Performance metrics */}
                  <div className="flex items-center gap-5 text-xs border-y lg:border-y-0 lg:border-x border-slate-100 py-2 lg:py-0 lg:px-6">
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase font-bold">Triggered</div>
                      <div className="font-bold text-slate-900 mt-0.5">{auto.stats.triggered.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase font-bold">Conversion</div>
                      <div className="font-bold text-emerald-700 mt-0.5">{auto.stats.conversionRate}%</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase font-bold">Recovered</div>
                      <div className="font-bold text-slate-900 mt-0.5">
                        {auto.stats.revenueRecovered > 0 ? `₹${auto.stats.revenueRecovered.toLocaleString()}` : 'Support'}
                      </div>
                    </div>
                  </div>

                  {/* Right: Pause/Resume Toggle */}
                  <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleAutomationStatus(auto.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                        isActive
                          ? 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                      title={isActive ? 'Pause workflow' : 'Resume workflow'}
                    >
                      {isActive ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>Resume</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
