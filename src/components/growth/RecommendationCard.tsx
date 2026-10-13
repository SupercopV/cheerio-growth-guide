import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  MessageSquare, 
  Bot, 
  BarChart3,
  Check,
  ShieldCheck
} from 'lucide-react';
import { Recommendation } from '../../types/growth';
import { useApp } from '../../context/AppContext';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  const { openWizard, dismissRecommendation } = useApp();
  const [expandedWhy, setExpandedWhy] = useState(false);
  const [dismissMenuOpen, setDismissMenuOpen] = useState(false);

  const isLive = recommendation.status === 'active';

  const getCategoryIcon = () => {
    switch (recommendation.wizardType) {
      case 'abandoned_cart':
        return <MessageSquare className="w-5 h-5 text-emerald-600" />;
      case 'ai_chatbot':
        return <Bot className="w-5 h-5 text-emerald-600" />;
      case 'campaign_analytics':
        return <BarChart3 className="w-5 h-5 text-emerald-600" />;
      default:
        return <Zap className="w-5 h-5 text-emerald-600" />;
    }
  };

  const getImpactBadge = () => {
    switch (recommendation.impact) {
      case 'High Impact':
        return 'bg-emerald-100/80 text-emerald-800 border-emerald-200';
      case 'Medium Impact':
        return 'bg-sky-100/80 text-sky-800 border-sky-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className={`
      relative bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between
      ${isLive 
        ? 'border-emerald-300 ring-2 ring-emerald-500/10 shadow-xs' 
        : 'border-slate-200/90 hover:border-slate-300 hover:shadow-md'
      }
    `}>
      {/* Top Banner if Active */}
      {isLive && (
        <div className="bg-emerald-600 text-white text-[11px] font-bold px-4 py-1.5 rounded-t-2xl flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Live & Actively Monitoring GlowBotanics Store
          </span>
          <span className="bg-white/20 text-white px-2 py-0.5 rounded-md text-[10px]">
            Workflow Active
          </span>
        </div>
      )}

      <div className="p-4 sm:p-6 flex-1">
        {/* Header / Badges / Dismiss */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-center shrink-0">
              {getCategoryIcon()}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getImpactBadge()}`}>
                  {recommendation.impact}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-500">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {recommendation.setupTime} setup
                </span>
              </div>
            </div>
          </div>

          {/* Dismiss Action (Only when not active) */}
          {!isLive && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setDismissMenuOpen(!dismissMenuOpen)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                title="Dismiss or snooze recommendation"
                aria-label="Dismiss recommendation"
              >
                <X className="w-4 h-4" />
              </button>

              {dismissMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-20" 
                    onClick={() => setDismissMenuOpen(false)} 
                  />
                  <div className="absolute right-0 top-8 z-30 w-52 bg-white rounded-xl shadow-xl border border-slate-200 p-2 text-xs space-y-1">
                    <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase">
                      Dismiss recommendation
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        dismissRecommendation(recommendation.id, 'Already using another app');
                        setDismissMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50"
                    >
                      Already using another tool
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        dismissRecommendation(recommendation.id, 'Not relevant now');
                        setDismissMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50"
                    >
                      Not relevant for me right now
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        dismissRecommendation(recommendation.id, 'Will set up later');
                        setDismissMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50"
                    >
                      Remind me next week
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-display">
          {recommendation.title}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          {recommendation.subtitle}
        </p>

        {/* ROI / Value Estimate Pill */}
        <div className="my-3.5 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="text-xs font-semibold text-slate-700 block leading-tight">
                Estimated Business Lift
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Illustrative Demo Metric
              </span>
            </div>
          </div>
          <span className="text-xs font-extrabold text-emerald-800 bg-white px-2.5 py-1 rounded-md border border-emerald-200 shadow-2xs self-start sm:self-auto">
            {recommendation.roiEstimate}
          </span>
        </div>

        {/* Plain English Description */}
        <p className="text-xs text-slate-600 leading-relaxed">
          {recommendation.description}
        </p>

        {/* Key Benefits List */}
        <div className="mt-3.5 space-y-1.5">
          {recommendation.keyBenefits.slice(0, 4).map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
              <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        {/* "Why this matters for your skincare brand" Expandable Section */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setExpandedWhy(!expandedWhy)}
            className="flex items-center justify-between w-full text-left text-xs font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Why this matters for GlowBotanics
            </span>
            {expandedWhy ? (
              <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>

          {expandedWhy && (
            <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 leading-relaxed animate-fadeIn space-y-1.5">
              <p>{recommendation.whyItMatters}</p>
              <p className="text-[10px] text-slate-400 border-t border-slate-200/60 pt-1">
                *Illustrative business impact based on simulated D2C skincare metrics.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Card Action Button Footer */}
      <div className="p-4 sm:p-6 pt-0 border-t border-slate-100/80 mt-2">
        {isLive ? (
          <div className="flex items-center justify-between gap-3 pt-3">
            <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Running automatically
            </span>
            <button
              type="button"
              onClick={() => openWizard(recommendation.id)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Reconfigure
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => openWizard(recommendation.id)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all group mt-3"
          >
            <span>Set up now</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        )}
      </div>
    </div>
  );
};
