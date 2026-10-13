import React from 'react';
import { Award, TrendingUp, CheckCircle2, ChevronRight, Zap, Sparkles, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { REC_POINT_VALUES } from '../../data/mockData';

export const GrowthScoreCard: React.FC = () => {
  const { growthScore, recommendations, automations, openWizard } = useApp();

  const uncompletedRecs = recommendations.filter(r => r.status === 'recommended');

  const getScoreLevel = () => {
    if (growthScore >= 85) return { 
      title: 'Hyper-Optimized Growth', 
      desc: 'Outstanding! GlowBotanics is running advanced automated retention, customer service, and revenue recovery 24/7.', 
      color: 'text-emerald-800 bg-emerald-100 border-emerald-300' 
    };
    if (growthScore >= 60) return { 
      title: 'Growth Engine Active', 
      desc: 'Great progress! Core automations are actively recovering abandoned carts and engaging shoppers.', 
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200' 
    };
    return { 
      title: 'Early Discovery Stage', 
      desc: 'Shopify is connected. Turn on automated WhatsApp cart recovery and AI support to boost customer retention.', 
      color: 'text-amber-800 bg-amber-50 border-amber-200' 
    };
  };

  const level = getScoreLevel();
  const nextRec = uncompletedRecs[0];
  const nextRecPoints = nextRec ? (REC_POINT_VALUES[nextRec.id] || 10) : 0;

  // Check individual recommendation status
  const isCartActive = recommendations.find(r => r.id === 'rec_abandoned_cart')?.status === 'active';
  const isChatbotActive = recommendations.find(r => r.id === 'rec_ai_chatbot')?.status === 'active';
  const isRestockActive = recommendations.find(r => r.id === 'rec_campaign_analytics')?.status === 'active';
  const isReviewActive = recommendations.find(r => r.id === 'rec_post_purchase_review')?.status === 'active';

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-900 leading-tight truncate">Growth Readiness Score</h3>
              <p className="text-[11px] text-slate-500 truncate">Live demo progress tracker</p>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${level.color}`}>
            {level.title}
          </span>
        </div>

        {/* Progress Display */}
        <div className="my-4">
          <div className="flex items-end justify-between mb-1.5">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-900 font-display">{growthScore}</span>
              <span className="text-sm font-bold text-slate-400">/ 100</span>
            </div>
            <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{automations.length} Flows Configured</span>
            </div>
          </div>

          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full transition-all duration-700" 
              style={{ width: `${growthScore}%` }}
            />
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          {level.desc}
        </p>

        {/* Dynamic Feature Checkpoints */}
        <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center justify-between text-slate-700 gap-2">
            <span className="flex items-center gap-2 min-w-0 pr-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="truncate">Shopify Store Synced (+20 pts)</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-600 shrink-0">Active</span>
          </div>

          <div className="flex items-center justify-between text-slate-700 gap-2">
            <span className="flex items-center gap-2 min-w-0 pr-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="truncate">Welcome & Alerts (+20 pts)</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-600 shrink-0">Active</span>
          </div>

          <div className="flex items-center justify-between text-slate-700 gap-2">
            <span className="flex items-center gap-2 min-w-0 pr-1">
              <CheckCircle2 className={`w-4 h-4 shrink-0 ${isCartActive ? 'text-emerald-500' : 'text-slate-300'}`} />
              <span className="truncate">Cart Recovery (+25 pts)</span>
            </span>
            <span className={`text-[10px] sm:text-[11px] font-semibold shrink-0 ${isCartActive ? 'text-emerald-600' : 'text-slate-400'}`}>
              {isCartActive ? 'Active' : 'Recommended'}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-700 gap-2">
            <span className="flex items-center gap-2 min-w-0 pr-1">
              <CheckCircle2 className={`w-4 h-4 shrink-0 ${isChatbotActive ? 'text-emerald-500' : 'text-slate-300'}`} />
              <span className="truncate">AI Skincare Assistant (+15 pts)</span>
            </span>
            <span className={`text-[10px] sm:text-[11px] font-semibold shrink-0 ${isChatbotActive ? 'text-emerald-600' : 'text-slate-400'}`}>
              {isChatbotActive ? 'Active' : 'Recommended'}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-700 gap-2">
            <span className="flex items-center gap-2 min-w-0 pr-1">
              <CheckCircle2 className={`w-4 h-4 shrink-0 ${isRestockActive ? 'text-emerald-500' : 'text-slate-300'}`} />
              <span className="truncate">Bottle Restock (+10 pts)</span>
            </span>
            <span className={`text-[10px] sm:text-[11px] font-semibold shrink-0 ${isRestockActive ? 'text-emerald-600' : 'text-slate-400'}`}>
              {isRestockActive ? 'Active' : 'Recommended'}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-700 gap-2">
            <span className="flex items-center gap-2 min-w-0 pr-1">
              <CheckCircle2 className={`w-4 h-4 shrink-0 ${isReviewActive ? 'text-emerald-500' : 'text-slate-300'}`} />
              <span className="truncate">Routine & Reviews (+10 pts)</span>
            </span>
            <span className={`text-[10px] sm:text-[11px] font-semibold shrink-0 ${isReviewActive ? 'text-emerald-600' : 'text-slate-400'}`}>
              {isReviewActive ? 'Active' : 'Recommended'}
            </span>
          </div>
        </div>
      </div>

      {/* Next Best Action Suggestion / Celebration */}
      {nextRec ? (
        <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
              <Zap className="w-3 h-3 text-emerald-600" />
              <span>Next Unlock (+{nextRecPoints} pts)</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate">{nextRec.title}</p>
          </div>
          <button
            type="button"
            onClick={() => openWizard(nextRec.id)}
            className="px-2.5 py-1.5 text-[11px] font-bold text-emerald-700 bg-white border border-emerald-200 hover:bg-emerald-50 rounded-lg transition-colors shrink-0 shadow-2xs"
          >
            Set up now
          </button>
        </div>
      ) : (
        <div className="mt-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-900">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Growth Engine 100% Complete!</span>
          </div>
          <p className="text-[10px] text-emerald-700 mt-0.5">
            All 4 recommended automations are active and protecting your store.
          </p>
        </div>
      )}

      {/* Illustrative demo data footnote */}
      <div className="mt-3 pt-2 text-[10px] text-slate-400 text-center border-t border-slate-100">
        Demo score reflects simulated setup actions in this prototype.
      </div>
    </div>
  );
};
