import React, { useState } from 'react';
import { 
  Rocket, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  MessageSquare, 
  Sparkles, 
  ExternalLink,
  ArrowRight,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';
import { WizardDraftConfig, Recommendation } from '../../types/growth';
import { useApp } from '../../context/AppContext';
import { WhatsAppConnectionModal } from './WhatsAppConnectionModal';

interface Step5Props {
  config: WizardDraftConfig;
  recommendation: Recommendation;
  onActivate: () => void;
}

export const Step5Activation: React.FC<Step5Props> = ({ 
  config, 
  recommendation, 
  onActivate 
}) => {
  const { whatsappState, toggleWhatsAppConnection } = useApp();
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [isActivating, setIsActivating] = useState(false);

  const handleActivateClick = () => {
    setIsActivating(true);
    setTimeout(() => {
      setIsActivating(false);
      onActivate();
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
          Step 5: Pre-Flight Review & Live Activation
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Review your automated settings and launch. You can pause, adjust timing, or edit message copy anytime.
        </p>
      </div>

      {/* EDGE CASE: WhatsApp Disconnected Banner & Recovery Action */}
      {!whatsappState.isConnected && (
        <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 shadow-sm space-y-3.5 animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-amber-950">
                Action Required: WhatsApp Business API Not Connected
              </h4>
              <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                Cheerio cannot launch this live cart recovery flow because your Meta WhatsApp Business API account is currently disconnected. Customer messages will fail to queue without an active channel.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setConnectModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect WhatsApp in 30 Seconds</span>
            </button>

            <button
              type="button"
              onClick={toggleWhatsAppConnection}
              className="text-xs text-amber-900 hover:text-black font-semibold underline underline-offset-4"
            >
              Simulate 1-Click Reconnect
            </button>
          </div>
        </div>
      )}

      {/* Pre-flight System Health Checklist */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Pre-Launch Verification Checks
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className={`p-3 rounded-xl border flex items-start gap-3 ${
            whatsappState.isConnected 
              ? 'bg-emerald-50/50 border-emerald-200 text-slate-800' 
              : 'bg-rose-50/50 border-rose-200 text-slate-800'
          }`}>
            {whatsappState.isConnected ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div className="text-xs">
              <span className="font-bold block">WhatsApp Business Account</span>
              <span className="text-[11px] text-slate-500">
                {whatsappState.isConnected ? `${whatsappState.displayName} (${whatsappState.phoneNumber})` : 'Missing API credentials'}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl border bg-emerald-50/50 border-emerald-200 text-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold block">Shopify Webhook Listener</span>
              <span className="text-[11px] text-slate-500">GlowBotanics checkout events synced</span>
            </div>
          </div>

          <div className="p-3 rounded-xl border bg-emerald-50/50 border-emerald-200 text-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold block">Meta Approved Template</span>
              <span className="text-[11px] text-slate-500">{config.messageTemplate || 'glow_cart_recovery_v1'}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl border bg-emerald-50/50 border-emerald-200 text-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold block">Smart De-duplication Guard</span>
              <span className="text-[11px] text-slate-500">Automatic pause upon payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Summary Table */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2">
        <div className="text-slate-500 font-bold uppercase text-[10px] tracking-wider mb-1">
          Active Settings Summary
        </div>
        <div className="flex justify-between py-1 border-b border-slate-200/60">
          <span className="text-slate-600">Trigger Rule:</span>
          <span className="font-bold text-slate-900">{config.triggerCondition}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-slate-200/60">
          <span className="text-slate-600">Wait Delay:</span>
          <span className="font-bold text-slate-900">{config.triggerDelay}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-slate-200/60">
          <span className="text-slate-600">Discount Included:</span>
          <span className="font-bold text-slate-900">
            {config.includeDiscount ? `${config.discountCode} (${config.discountPercent}% off)` : 'None'}
          </span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-slate-600">Estimated Monthly Value:</span>
          <span className="font-bold text-emerald-700">{recommendation.roiEstimate}</span>
        </div>
      </div>

      {/* Activation Action Button */}
      <div className="pt-2">
        <button
          type="button"
          disabled={!whatsappState.isConnected || isActivating}
          onClick={handleActivateClick}
          className={`
            w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold shadow-md transition-all
            ${!whatsappState.isConnected
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              : 'bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white hover:shadow-lg'
            }
          `}
        >
          {isActivating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Launching Automation...</span>
            </>
          ) : (
            <>
              <Rocket className="w-4 h-4" />
              <span>Activate WhatsApp Automation Now</span>
            </>
          )}
        </button>

        {!whatsappState.isConnected && (
          <p className="text-center text-[11px] text-rose-600 mt-2 font-medium">
            Connect your WhatsApp Business API above to enable activation.
          </p>
        )}
      </div>

      {/* Embedded WhatsApp Connection Modal for edge case recovery */}
      <WhatsAppConnectionModal
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
      />
    </div>
  );
};
