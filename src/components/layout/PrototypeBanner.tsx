import React from 'react';
import { Sparkles, RefreshCw, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PrototypeBanner: React.FC = () => {
  const { 
    whatsappState, 
    toggleWhatsAppConnection, 
    resetAllDemoData 
  } = useApp();

  return (
    <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white text-xs px-3 py-1.5 sm:px-4 sm:py-2 border-b border-emerald-800/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30 text-[10px] sm:text-xs shrink-0">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
            <span>Prototype Demo</span>
          </span>
          <span className="text-slate-300 text-[11px] hidden md:inline truncate">
            GlowBotanics Skincare (D2C)
          </span>
          <span className="text-slate-400 text-[10px] hidden lg:inline">
            • Realistic sample data
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto">
          {/* Quick edge case tester toggle */}
          <button
            type="button"
            onClick={toggleWhatsAppConnection}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 py-1 rounded-md font-medium text-[10px] sm:text-[11px] transition-all border ${
              whatsappState.isConnected 
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20' 
                : 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40 hover:bg-emerald-500/30'
            }`}
            title="Toggle WhatsApp connection to test missing-connection edge case"
          >
            {whatsappState.isConnected ? (
              <>
                <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                <span className="hidden sm:inline">Simulate Disconnect (Edge Case)</span>
                <span className="sm:hidden">Edge Case</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Reconnect</span>
              </>
            )}
          </button>

          {/* Reset Demo */}
          <button
            type="button"
            onClick={resetAllDemoData}
            className="flex items-center gap-1 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-2 py-1 rounded-md transition-colors text-[10px] sm:text-[11px]"
            title="Reset recommendations and progress back to beginning"
          >
            <RefreshCw className="w-3 h-3 text-slate-400" />
            <span className="hidden xs:inline">Reset</span> Demo
          </button>
        </div>
      </div>
    </div>
  );
};
