import React from 'react';
import { Award, TrendingUp, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GrowthScoreCard: React.FC = () => {
  const { growthScore, recommendations, automations, openWizard } = useApp();

  const activeRecCount = recommendations.filter(r => r.status === 'active').length;
  const uncompletedRecs = recommendations.filter(r => r.status === 'recommended');

  const getScoreLevel = () => {
    if (growthScore >= 85) return { title: 'Hyper-Optimized Growth', desc: 'Your store is maximizing automated retention & revenue recovery.', color: 'text-emerald-700 bg-emerald-100' };
    if (growthScore >= 60) return { title: 'Growth Engine Active', desc: 'Core automations are actively recovering abandoned sales.', color: 'text-emerald-600 bg-emerald-50' };
    return { title: 'Early Discovery Stage', desc: 'High-value customer recovery opportunities are waiting to be turned on.', color: 'text-amber-700 bg-amber-50' };
  };

  const level = getScoreLevel();
  const nextRec = uncompletedRecs[0];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-tight">Growth Readiness Score</h3>
              <p className="text-[11px] text-slate-500">Based on active Cheerio features</p>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border border-current ${level.color}`}>
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
              <span>{automations.length} Workflows Live</span>
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

        {/* Feature Checkpoints */}
        <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center justify-between text-slate-700">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Shopify Store & Webhook Synced</span>
            </span>
            <span className="text-[11px] font-semibold text-emerald-600">Active</span>
          </div>

          <div className="flex items-center justify-between text-slate-700">
            <span className="flex items-center gap-2">
              <CheckCircle2 className={`w-4 h-4 ${activeRecCount > 0 ? 'text-emerald-500' : 'text-slate-300'}`} />
              <span>WhatsApp Abandoned Cart Flow</span>
            </span>
            <span className={`text-[11px] font-semibold ${activeRecCount > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
              {activeRecCount > 0 ? 'Active' : 'Recommended'}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-700">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Welcome Perk Series</span>
            </span>
            <span className="text-[11px] font-semibold text-emerald-600">Active</span>
          </div>
        </div>
      </div>

      {/* Next Best Action Suggestion */}
      {nextRec && (
        <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
              <Zap className="w-3 h-3 text-emerald-600" />
              Next Unlock (+18 pts)
            </div>
            <p className="text-[11px] text-slate-500 truncate">{nextRec.title}</p>
          </div>
          <button
            type="button"
            onClick={() => openWizard(nextRec.id)}
            className="px-2.5 py-1.5 text-[11px] font-bold text-emerald-700 bg-white border border-emerald-200 hover:bg-emerald-50 rounded-lg transition-colors shrink-0"
          >
            Launch
          </button>
        </div>
      )}
    </div>
  );
};
