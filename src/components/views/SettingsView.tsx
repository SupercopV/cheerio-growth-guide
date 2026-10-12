import React, { useState } from 'react';
import { 
  Settings, 
  MessageSquare, 
  ShoppingBag, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Trash2, 
  ExternalLink,
  Users,
  Bell
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WhatsAppConnectionModal } from '../wizard/WhatsAppConnectionModal';

export const SettingsView: React.FC = () => {
  const { 
    whatsappState, 
    toggleWhatsAppConnection, 
    resetAllDemoData,
    showToast 
  } = useApp();
  const [connectModalOpen, setConnectModalOpen] = useState(false);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
          Platform Settings & Integrations
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your connected marketing channels, Shopify sync, and Cheerio Growth Guide preferences.
        </p>
      </div>

      {/* Channel Connections Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          Active Channels
        </h3>

        {/* WhatsApp Channel */}
        <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
          whatsappState.isConnected 
            ? 'bg-emerald-50/40 border-emerald-200' 
            : 'bg-rose-50/50 border-rose-200'
        }`}>
          <div className="flex items-start gap-3.5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              whatsappState.isConnected ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
            }`}>
              <MessageSquare className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-sm font-bold text-slate-900">
                  Meta WhatsApp Business Cloud API
                </h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  whatsappState.isConnected 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                    : 'bg-rose-100 text-rose-800 border border-rose-200'
                }`}>
                  {whatsappState.isConnected ? 'Connected & Verified' : 'Disconnected'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Number: <strong className="text-slate-800">{whatsappState.phoneNumber}</strong> ({whatsappState.displayName})
              </p>
              <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-1">
                <span>Tier limit: {whatsappState.dailyLimit}</span>
                <span>•</span>
                <span>Quality: {whatsappState.qualityRating}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
            {whatsappState.isConnected ? (
              <button
                type="button"
                onClick={toggleWhatsAppConnection}
                className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
              >
                Disconnect (Test Edge Case)
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setConnectModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
              >
                Connect WhatsApp
              </button>
            )}
          </div>
        </div>

        {/* Shopify Integration */}
        <div className="p-4 rounded-xl border bg-slate-50 border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-sm font-bold text-slate-900">
                  Shopify Store Sync
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Live Webhook Active
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Domain: <strong className="text-slate-800">glowbotanics.myshopify.com</strong>
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Last checkout event received: 4 minutes ago
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              showToast({
                type: 'info',
                title: 'Shopify Webhooks Verified',
                message: 'Cart abandonment and customer tags synced successfully.',
              });
            }}
            className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-white text-slate-700 text-xs font-semibold transition-colors shrink-0 self-start sm:self-center"
          >
            Verify Webhook Sync
          </button>
        </div>
      </div>

      {/* Store Team & Brand Identity */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-600" />
          Brand Profile & Team
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-600 uppercase text-[10px] mb-1">
              Store Brand Name
            </label>
            <input
              type="text"
              readOnly
              value="GlowBotanics Clean Skincare"
              className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-600 uppercase text-[10px] mb-1">
              Store Owner Email
            </label>
            <input
              type="text"
              readOnly
              value="ananya@glowbotanics.in"
              className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
            />
          </div>
        </div>
      </div>

      {/* Prototype Reset Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <RefreshCw className="w-4 h-4 text-slate-600" />
          <span>Prototype Reset & Demo Controls</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Reset all recommendations, activated automations, and channel states back to their fresh prototype defaults. Useful when demoing or testing multiple onboarding runs.
        </p>

        <div className="pt-2">
          <button
            type="button"
            onClick={resetAllDemoData}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset All Demo Data to Initial State</span>
          </button>
        </div>
      </div>

      <WhatsAppConnectionModal
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
      />
    </div>
  );
};
