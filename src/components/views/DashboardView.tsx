import React, { useState } from 'react';
import { 
  Sparkles, 
  Filter, 
  TrendingUp, 
  CheckCircle2, 
  Workflow, 
  Zap, 
  MessageSquare, 
  ShieldCheck,
  Search,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GrowthGuideHero } from '../growth/GrowthGuideHero';
import { GrowthScoreCard } from '../growth/GrowthScoreCard';
import { RecommendationCard } from '../growth/RecommendationCard';
import { SuggestedNextActionBanner } from '../growth/SuggestedNextActionBanner';
import { EmptyRecommendationsState } from '../growth/EmptyRecommendationsState';

interface DashboardViewProps {
  searchQuery: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ searchQuery }) => {
  const { recommendations, automations, setCurrentTab } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'revenue' | 'support' | 'retention' | 'active'>('all');

  // Filter recommendations based on tab and search
  const filteredRecs = recommendations.filter((rec) => {
    // If searching, check title, subtitle, or description
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        rec.title.toLowerCase().includes(q) ||
        rec.subtitle.toLowerCase().includes(q) ||
        rec.description.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    if (selectedFilter === 'all') {
      return rec.status !== 'dismissed';
    }
    if (selectedFilter === 'active') {
      return rec.status === 'active';
    }
    if (selectedFilter === 'revenue') {
      return rec.category === 'revenue' && rec.status !== 'dismissed';
    }
    if (selectedFilter === 'support') {
      return rec.category === 'support' && rec.status !== 'dismissed';
    }
    if (selectedFilter === 'retention') {
      return rec.category === 'retention' && rec.status !== 'dismissed';
    }
    return true;
  });

  const activeRecsCount = recommendations.filter(r => r.status === 'recommended').length;
  const liveCount = recommendations.filter(r => r.status === 'active').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Hero Welcome & D2C Skincare Metrics */}
      <GrowthGuideHero />

      {/* Suggested Next Action (Appears after successful activation) */}
      <SuggestedNextActionBanner />

      {/* Main Grid: Recommendations on Left, Growth Score & Insights on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Recommendations Feed (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                  selectedFilter === 'all'
                    ? 'bg-emerald-600 text-white font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                All Opportunities ({activeRecsCount + liveCount})
              </button>

              <button
                type="button"
                onClick={() => setSelectedFilter('revenue')}
                className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                  selectedFilter === 'revenue'
                    ? 'bg-emerald-600 text-white font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Revenue Recovery
              </button>

              <button
                type="button"
                onClick={() => setSelectedFilter('support')}
                className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                  selectedFilter === 'support'
                    ? 'bg-emerald-600 text-white font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                AI Support & Chatbot
              </button>

              <button
                type="button"
                onClick={() => setSelectedFilter('retention')}
                className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                  selectedFilter === 'retention'
                    ? 'bg-emerald-600 text-white font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                VIP & Retention
              </button>

              {liveCount > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedFilter('active')}
                  className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1 ${
                    selectedFilter === 'active'
                      ? 'bg-emerald-600 text-white font-bold shadow-2xs'
                      : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Live ({liveCount})</span>
                </button>
              )}
            </div>

            <div className="text-xs text-slate-500 font-medium shrink-0 hidden sm:block">
              Personalized for D2C Skincare • Illustrative Demo
            </div>
          </div>

          {/* Cards Grid */}
          {filteredRecs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRecs.map((rec) => (
                <RecommendationCard key={rec.id} recommendation={rec} />
              ))}
            </div>
          ) : (
            <EmptyRecommendationsState />
          )}
        </div>

        {/* Right Column: Score Card & Quick Insights (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <GrowthScoreCard />

          {/* Why WhatsApp Works for Skincare Card */}
          <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-2xl p-5 shadow-xs relative overflow-hidden">
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                  D2C Skincare Benchmark (Demo Simulation)
                </span>
              </div>

              <h4 className="text-sm font-bold font-display leading-tight">
                Why WhatsApp recovers 3.8x more skincare sales than email
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                Skincare buyers check WhatsApp within 3 minutes of receiving a notification. When they can ask quick ingredient questions and tap a 1-click checkout link with preloaded discount, hesitation vanishes.
              </p>

              <div className="pt-2 border-t border-emerald-800/80 flex items-center justify-between text-xs">
                <span className="text-emerald-300 font-semibold">Average recovery turnaround:</span>
                <span className="font-bold text-white">18 mins</span>
              </div>
              <p className="text-[10px] text-emerald-400/80 pt-0.5">
                *Illustrative benchmark based on simulated skincare store metrics.
              </p>
            </div>
          </div>

          {/* Active Automations Quick Peek */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Workflow className="w-3.5 h-3.5 text-emerald-600" />
                Live Automations ({automations.length})
              </h4>
              <button
                type="button"
                onClick={() => setCurrentTab('automations')}
                className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800"
              >
                Manage all ➔
              </button>
            </div>

            <div className="space-y-2">
              {automations.slice(0, 3).map((auto) => (
                <div key={auto.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <p className="font-bold text-slate-800 truncate">{auto.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{auto.trigger}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    auto.status === 'active' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {auto.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
