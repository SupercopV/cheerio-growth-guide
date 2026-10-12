import React from 'react';
import { Sparkles, ArrowRight, X, Bot, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SuggestedNextActionBanner: React.FC = () => {
  const { suggestedNextAction, dismissNextActionSuggestion, openWizard } = useApp();

  if (!suggestedNextAction) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200/90 rounded-2xl p-4 sm:p-5 shadow-xs relative overflow-hidden animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded-full">
                Recommended Next Move
              </span>
              <span className="text-xs text-slate-500 font-medium">Step 2 of your Growth Plan</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 font-display">
              Pair your cart reminders with: {suggestedNextAction.title}
            </h4>
            <p className="text-xs text-slate-600 mt-0.5 max-w-2xl leading-relaxed">
              When shoppers get their cart reminder, many ask: <em className="text-slate-800">"Is this good for oily skin?"</em> or <em className="text-slate-800">"What is the expiry date?"</em>. Activating the AI Chatbot answers their questions in 3 seconds so they complete checkout immediately.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={() => {
              openWizard(suggestedNextAction.id);
              dismissNextActionSuggestion();
            }}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            <span>Set up {suggestedNextAction.title.split(' ')[0]}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={dismissNextActionSuggestion}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            title="Dismiss suggestion"
            aria-label="Dismiss suggestion"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
