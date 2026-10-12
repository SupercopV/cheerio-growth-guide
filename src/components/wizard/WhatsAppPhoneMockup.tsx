import React from 'react';
import { CheckCheck, Phone, Video, MoreVertical, ExternalLink } from 'lucide-react';

interface WhatsAppPhoneMockupProps {
  messageText: string;
  discountCode?: string;
  includeDiscount?: boolean;
  ctaText?: string;
  customerName?: string;
}

export const WhatsAppPhoneMockup: React.FC<WhatsAppPhoneMockupProps> = ({
  messageText,
  discountCode = 'GLOW10',
  includeDiscount = true,
  ctaText = 'Complete My Order 🛍️',
  customerName = 'Priya',
}) => {
  // Replace tokens with sample skincare customer data
  const formattedMessage = messageText
    .replace(/\{\{first_name\}\}/g, customerName)
    .replace(/\{\{cart_items\}\}/g, 'Kumkumadi Facial Oil (30ml) & Centella Cleanser')
    .replace(/\{\{discount_code\}\}/g, includeDiscount ? discountCode : '')
    .replace(/\{\{cart_url\}\}/g, 'https://glowbotanics.in/checkout/cart_78492');

  return (
    <div className="w-full max-w-[290px] mx-auto bg-slate-900 rounded-[34px] p-2.5 shadow-2xl border-4 border-slate-800">
      {/* Phone Speaker Notch */}
      <div className="w-20 h-3.5 bg-slate-800 rounded-full mx-auto mb-1.5 flex items-center justify-center">
        <div className="w-8 h-1 bg-slate-700 rounded-full" />
      </div>

      {/* Screen Frame */}
      <div className="bg-[#ECE5DD] rounded-[24px] overflow-hidden flex flex-col h-[420px] shadow-inner text-slate-800 relative">
        {/* WhatsApp Chat Header */}
        <div className="bg-[#075E54] text-white px-3 py-2.5 flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 flex items-center justify-center font-bold text-xs shrink-0">
              GB
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold truncate">GlowBotanics</span>
                <span className="w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center text-[8px] text-white shrink-0" title="Verified Business">
                  ✔
                </span>
              </div>
              <p className="text-[9px] text-emerald-200 truncate">Official Business Account</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-white/90">
            <Video className="w-4 h-4" />
            <Phone className="w-3.5 h-3.5" />
            <MoreVertical className="w-4 h-4" />
          </div>
        </div>

        {/* Chat Canvas */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2.5 bg-[#EFEAE2]">
          {/* Security / Encryption disclaimer */}
          <div className="bg-[#FFEECD] text-[#635336] text-[9px] p-2 rounded-lg text-center shadow-2xs leading-tight">
            🔒 Messages and calls are end-to-end encrypted. No one outside of this chat can read or listen to them.
          </div>

          {/* Today Divider */}
          <div className="text-center my-1">
            <span className="bg-white/80 text-[10px] font-semibold text-slate-500 px-2 py-0.5 rounded-md shadow-2xs">
              TODAY
            </span>
          </div>

          {/* WhatsApp Message Bubble */}
          <div className="bg-white rounded-lg rounded-tl-xs p-2.5 shadow-sm max-w-[92%] space-y-2 text-slate-800 border border-slate-200/50">
            {/* Skincare Product Header Image Mock */}
            <div className="rounded-md overflow-hidden bg-gradient-to-r from-emerald-100 via-teal-100 to-amber-50 p-2 border border-slate-200/60">
              <div className="flex items-center justify-between text-[10px] font-bold text-emerald-900 mb-1">
                <span>GlowBotanics Skincare</span>
                <span className="text-[9px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-sm">Cart Reserved</span>
              </div>
              <p className="text-[11px] font-semibold text-slate-800">
                Kumkumadi Oil + Centella Cleanser
              </p>
              <p className="text-[10px] text-slate-500">2 items in your cart (₹2,450)</p>
            </div>

            {/* Body Text */}
            <div className="text-[11px] leading-relaxed whitespace-pre-line text-slate-800">
              {formattedMessage}
            </div>

            {/* Discount Code Highlight if active */}
            {includeDiscount && (
              <div className="bg-emerald-50 border border-emerald-200/80 p-1.5 rounded-md flex items-center justify-between text-[10px]">
                <span className="text-emerald-800 font-medium">Coupon code:</span>
                <span className="font-mono font-bold text-emerald-700 bg-white px-1.5 py-0.5 rounded-sm border border-emerald-300">
                  {discountCode}
                </span>
              </div>
            )}

            {/* Timestamp & double checkmark */}
            <div className="flex items-center justify-end gap-1 text-[9px] text-slate-400 pt-0.5">
              <span>Just now</span>
              <CheckCheck className="w-3.5 h-3.5 text-sky-500" />
            </div>

            {/* Interactive CTA Buttons */}
            <div className="pt-1.5 border-t border-slate-100 space-y-1">
              <div className="w-full text-center py-1.5 bg-[#E7F8F0] hover:bg-[#D5F2E4] text-[#075E54] font-bold text-[11px] rounded-md transition-colors flex items-center justify-center gap-1 cursor-pointer">
                <span>{ctaText}</span>
              </div>
              <div className="w-full text-center py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-[10px] rounded-md transition-colors flex items-center justify-center gap-1 cursor-pointer">
                <span>Chat with Skincare Expert 💬</span>
              </div>
            </div>
          </div>
        </div>

        {/* Input Bar footer */}
        <div className="bg-[#F0F2F5] px-2 py-2 flex items-center gap-2 border-t border-slate-200">
          <div className="flex-1 bg-white rounded-full px-3 py-1 text-[11px] text-slate-400 border border-slate-200">
            Type a message...
          </div>
          <div className="w-7 h-7 rounded-full bg-[#00A884] text-white flex items-center justify-center text-xs">
            ➤
          </div>
        </div>
      </div>
    </div>
  );
};
