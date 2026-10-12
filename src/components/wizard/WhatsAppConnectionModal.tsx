import React, { useState } from 'react';
import { 
  X, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink, 
  QrCode, 
  Smartphone,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface WhatsAppConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const WhatsAppConnectionModal: React.FC<WhatsAppConnectionModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { connectWhatsApp } = useApp();
  const [phoneNumber, setPhoneNumber] = useState('+91 98201 54321');
  const [displayName, setDisplayName] = useState('GlowBotanics Official');
  const [connecting, setConnecting] = useState(false);

  if (!isOpen) return null;

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      connectWhatsApp(phoneNumber);
      setConnecting(false);
      onClose();
      onSuccess?.();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display">Connect WhatsApp Business API</h3>
              <p className="text-xs text-emerald-200">Official Meta Cloud API Authorization</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80 text-xs text-slate-700 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">Official Meta Integration:</strong> Linking your WhatsApp number enables automated cart recovery, 24/7 AI chatbot replies, and broadcast campaigns directly through Cheerio.
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                WhatsApp Phone Number
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full text-xs font-mono font-bold px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-slate-800"
                placeholder="+91 98201 54321"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Verified Business Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full text-xs font-bold px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-slate-800"
                placeholder="GlowBotanics Official"
              />
            </div>
          </div>

          {/* Quick simulated QR Code / 1-Click option */}
          <div className="border border-dashed border-slate-200 rounded-xl p-4 bg-slate-50/60 flex items-center gap-4">
            <div className="w-16 h-16 bg-white border border-slate-200 rounded-lg flex items-center justify-center p-1.5 shrink-0 shadow-2xs">
              <QrCode className="w-12 h-12 text-slate-800" />
            </div>
            <div className="text-xs">
              <h5 className="font-bold text-slate-800">Quick Connect (30 Seconds)</h5>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Scan with WhatsApp or click Authorize to simulate instantaneous Meta WABA activation.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={connecting}
            onClick={handleConnect}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-xs font-bold rounded-xl shadow-xs transition-all disabled:opacity-50"
          >
            {connecting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Authorizing Meta API...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Authorize & Connect Account</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
