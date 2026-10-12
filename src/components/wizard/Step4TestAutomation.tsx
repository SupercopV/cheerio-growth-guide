import React, { useState } from 'react';
import { 
  Send, 
  Smartphone, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  BellRing, 
  ArrowRight,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { WizardDraftConfig } from '../../types/growth';
import { useApp } from '../../context/AppContext';

interface Step4Props {
  config: WizardDraftConfig;
  updateConfig: (updates: Partial<WizardDraftConfig>) => void;
}

export const Step4TestAutomation: React.FC<Step4Props> = ({ config, updateConfig }) => {
  const { showToast } = useApp();
  const [phoneInput, setPhoneInput] = useState(config.testPhoneNumber || '+91 98765 43210');
  const [testPhase, setTestPhase] = useState<'idle' | 'sending' | 'delivered'>(
    config.testStatus === 'delivered' ? 'delivered' : 'idle'
  );
  const [notificationClicked, setNotificationClicked] = useState(false);
  const [simulatedConversion, setSimulatedConversion] = useState(false);

  const handleSendTest = () => {
    setTestPhase('sending');
    setNotificationClicked(false);
    setSimulatedConversion(false);

    setTimeout(() => {
      setTestPhase('delivered');
      updateConfig({ 
        testStatus: 'delivered',
        testPhoneNumber: phoneInput,
      });

      showToast({
        type: 'success',
        title: '📲 Test Message Delivered!',
        message: `Simulated test WhatsApp message dispatched to ${phoneInput}`,
      });
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
          Step 4: Test Your Automation (Live Simulation)
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Send a simulated test message to verify the message copy, variables, and links before turning on real customer traffic.
        </p>
      </div>

      {/* Test Phone Input & Dispatcher Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-emerald-600" />
          <h4 className="text-sm font-bold text-slate-900">
            Dispatch Test Message to Phone
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <div className="sm:col-span-8">
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              Recipient Phone Number (Demo Phone)
            </label>
            <input
              type="text"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              className="w-full text-xs font-mono font-bold px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-800"
              placeholder="+91 98765 43210"
            />
          </div>

          <div className="sm:col-span-4 sm:pt-5">
            <button
              type="button"
              disabled={testPhase === 'sending'}
              onClick={handleSendTest}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-xs ${
                testPhase === 'sending'
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white'
              }`}
            >
              {testPhase === 'sending' ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                  <span>Sending ping...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Test WhatsApp</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Sample data mode: No billing charges or real WhatsApp credits deducted.</span>
        </div>
      </div>

      {/* Simulated Phone Notification Dropdown Screen */}
      {testPhase === 'delivered' && (
        <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-xl border border-slate-800 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Delivery Confirmed (Response Time: 0.3s)
            </span>
            <span>Just now</span>
          </div>

          {/* Interactive incoming notification banner */}
          <div 
            onClick={() => setNotificationClicked(true)}
            className="bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 p-3.5 rounded-xl cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] flex items-start gap-3"
            title="Click notification to inspect customer view"
          >
            <div className="w-9 h-9 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
              <MessageSquare className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">GlowBotanics Official</span>
                <span className="text-[10px] text-slate-400">Now</span>
              </div>
              <p className="text-xs text-slate-200 mt-0.5 line-clamp-2">
                Hey Priya! 🌿 We saved the Kumkumadi Facial Oil you were looking at. Tap below to finish your order...
              </p>
              <span className="text-[10px] text-emerald-400 font-semibold mt-1 inline-block">
                Tap to simulate opening chat ↗
              </span>
            </div>
          </div>

          {/* Notification Opened details */}
          {notificationClicked && (
            <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 text-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-medium">Customer read receipt:</span>
                <span className="text-sky-400 font-mono font-bold flex items-center gap-1">
                  Read (Double Blue Tick ✔✔)
                </span>
              </div>

              {!simulatedConversion ? (
                <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-700/60">
                  <span className="text-slate-400 text-[11px]">
                    Simulate customer tapping "Complete My Order"
                  </span>
                  <button
                    type="button"
                    onClick={() => setSimulatedConversion(true)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-colors"
                  >
                    Simulate Customer Checkout 🛍️
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-lg text-emerald-300 flex items-center justify-between">
                  <span className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Success! Order #GB-8921 placed (₹2,450 recovered)
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-200 px-2 py-0.5 rounded-sm">
                    Goal Reached
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="text-xs text-slate-300 bg-slate-800/40 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
            <span>✅ Verification checklist complete. Everything is ready for activation!</span>
            <span className="text-emerald-400 font-bold text-xs">Proceed to Step 5 ➔</span>
          </div>
        </div>
      )}
    </div>
  );
};
