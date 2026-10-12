import React from 'react';
import { CheckCircle2, RefreshCw, Undo2, Workflow, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EmptyRecommendationsState: React.FC = () => {
  const { recommendations, undoDismissRecommendation, resetAllDemoData, setCurrentTab } = useApp();

  const dismissedList = recommendations.filter(r => r.status === 'dismissed');

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xs">
      <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center mx-auto text-emerald-600 mb-4 shadow-xs">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
        You're All Caught Up!
      </h3>
      <p className="text-sm text-slate-600 mt-2 leading-relaxed">
        GlowBotanics is operating with top-tier marketing automations. All high-impact discovery recommendations for your store have been reviewed and configured.
      </p>

      {/* If any recommendations were dismissed, show quick restore */}
      {dismissedList.length > 0 && (
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-left">
          <div className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
            <Undo2 className="w-3.5 h-3.5 text-slate-500" />
            Hidden / Dismissed Recommendations ({dismissedList.length})
          </div>
          <div className="space-y-2">
            {dismissedList.map(rec => (
              <div key={rec.id} className="flex items-center justify-between text-xs bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="font-medium text-slate-800 truncate mr-2">{rec.title}</span>
                <button
                  type="button"
                  onClick={() => undoDismissRecommendation(rec.id)}
                  className="text-emerald-700 font-bold hover:text-emerald-800 px-2 py-1 rounded-md hover:bg-emerald-50 transition-colors shrink-0"
                >
                  Restore
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
        <button
          type="button"
          onClick={() => setCurrentTab('automations')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
        >
          <Workflow className="w-4 h-4" />
          <span>View Live Automations</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={resetAllDemoData}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Demo Flow</span>
        </button>
      </div>
    </div>
  );
};
