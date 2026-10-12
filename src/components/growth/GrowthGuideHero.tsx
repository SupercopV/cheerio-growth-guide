import React from 'react';
import { Sparkles, TrendingUp, ShoppingBag, ShieldCheck, ArrowRight, Zap, Target } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GrowthGuideHero: React.FC = () => {
  const { openWizard, recommendations } = useApp();

  const abandonedCartRec = recommendations.find(r => r.id === 'rec_abandoned_cart');
  const isCartActive = abandonedCartRec?.status === 'active';

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-slate-50 border border-emerald-100/80 rounded-2xl p-6 sm:p-8 shadow-xs">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Top Tagline */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            AI Growth Intelligence for GlowBotanics
          </span>
          <span className="text-xs font-medium text-slate-500">
            Updated today based on your Shopify store metrics
          </span>
        </div>

        {/* Hero Title & Value Proposition */}
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Unlock ~₹3.8L in Monthly Unclaimed Revenue
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
            Welcome back, Ananya! In the last 30 days, <strong className="text-slate-900">3,420 shoppers</strong> added serums and cleansers to their GlowBotanics cart but dropped off before paying. We hand-picked 3 proven Cheerio marketing automations to recover those lost sales on WhatsApp with zero technical setup.
          </p>
        </div>

        {/* Quick Snapshot Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-200/60">
          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200/80">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Unrecovered Carts</div>
            <div className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">3,420</div>
            <div className="text-[11px] text-rose-600 font-medium mt-0.5">₹14.8L potential GMV</div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200/80">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Cart Drop-off Rate</div>
            <div className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">71.4%</div>
            <div className="text-[11px] text-amber-600 font-medium mt-0.5">D2C Industry avg: 69%</div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200/80">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">WhatsApp Read Rate</div>
            <div className="text-lg sm:text-xl font-bold text-emerald-700 mt-0.5">94.2%</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-0.5">vs 19% on email</div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200/80">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Average Order Value</div>
            <div className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">₹1,850</div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">Clean beauty category</div>
          </div>
        </div>

        {/* Spotlight Callout if abandoned cart not activated yet */}
        {!isCartActive && abandonedCartRec && (
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-emerald-600 text-white p-4 rounded-xl shadow-md">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">Top Recommendation: WhatsApp Abandoned-Cart Nudge</h4>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Takes less than 3 minutes to launch. Automatically recovers ~22% of dropped skincare checkouts.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => openWizard('rec_abandoned_cart')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-emerald-800 text-xs font-bold rounded-lg shadow-xs hover:bg-emerald-50 active:scale-98 transition-all shrink-0"
            >
              Set up now
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
