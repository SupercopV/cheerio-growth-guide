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
    <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white text-xs px-4 py-2 border-b border-emerald-800/40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Cheerio Growth Guide Prototype
          </span>
          <span className="text-slate-300 hidden md:inline">
            Personalized discovery for <strong>GlowBotanics Skincare (D2C)</strong>
          </span>
          <span className="text-slate-400 text-[11px] hidden lg:inline">
            • Running on realistic sample data (No live WhatsApp messages sent)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick edge case tester toggle */}
          <button
            type="button"
            onClick={toggleWhatsAppConnection}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium text-[11px] transition-all border ${
              whatsappState.isConnected 
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20' 
                : 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40 hover:bg-emerald-500/30'
            }`}
            title="Toggle WhatsApp connection to test missing-connection edge case"
          >
            {whatsappState.isConnected ? (
              <>
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                Simulate WhatsApp Disconnected (Edge Case)
              </>
            ) : (
              <>
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                Reconnect WhatsApp API
              </>
            )}
          </button>

          {/* Reset Demo */}
          <button
            type="button"
            onClick={resetAllDemoData}
            className="flex items-center gap-1 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-2 py-1 rounded-md transition-colors"
            title="Reset recommendations and progress back to beginning"
          >
            <RefreshCw className="w-3 h-3 text-slate-400" />
            Reset Demo
          </button>
        </div>
      </div>
    </div>
  );
};
