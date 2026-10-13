import React from 'react';
import { Tag, Sparkles, AlertCircle, Plus, Eye } from 'lucide-react';
import { WizardDraftConfig } from '../../types/growth';
import { WhatsAppPhoneMockup } from './WhatsAppPhoneMockup';

interface Step2Props {
  config: WizardDraftConfig;
  updateConfig: (updates: Partial<WizardDraftConfig>) => void;
}

export const Step2ConfigureMessage: React.FC<Step2Props> = ({ config, updateConfig }) => {
  const [mobileTab, setMobileTab] = React.useState<'edit' | 'preview'>('edit');
  const templates = [
    {
      id: 'template_gentle',
      name: 'Gentle Skincare Reminder (Recommended)',
      text: 'Hey {{first_name}}! 🌿 We saved the {{cart_items}} you were looking at for your daily skincare routine.\n\nYour cart is reserved for the next 24 hours. Tap below to finish your order whenever you are ready! ✨',
      discount: true,
    },
    {
      id: 'template_discount',
      name: 'Special 10% Discount Coupon',
      text: 'Hi {{first_name}}! 🌸 Ready for glowing skin? Use coupon code {{discount_code}} for an instant 10% OFF on your {{cart_items}}.\n\nTap below to claim your discount before stock sells out:',
      discount: true,
    },
    {
      id: 'template_concierge',
      name: 'Skincare Expert Consultation Offer',
      text: 'Hi {{first_name}}, we noticed you paused your order for {{cart_items}}. Do you have questions about ingredients or application?\n\nOur clean beauty advisors are here to help, or you can complete your order with code {{discount_code}} below:',
      discount: true,
    },
  ];

  const insertVariable = (variable: string) => {
    updateConfig({
      messageText: `${config.messageText} ${variable}`,
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
          Step 2: Customize Your WhatsApp Message
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Craft the message your skincare shopper receives. Cheerio automatically fills in their name and cart items.
        </p>
      </div>

      {/* Mobile / Tablet Segmented Tab (< lg) */}
      <div className="flex lg:hidden items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
        <button
          type="button"
          onClick={() => setMobileTab('edit')}
          className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === 'edit'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>✏️ Edit Message</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === 'preview'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Eye className="w-3.5 h-3.5 text-emerald-600" />
          <span>Live Phone Preview</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form Controls (7 cols) */}
        <div className={`lg:col-span-7 space-y-4 ${mobileTab === 'edit' ? 'block' : 'hidden lg:block'}`}>
          {/* Template Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Choose Pre-Approved WhatsApp Template
            </label>
            <div className="space-y-2">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => updateConfig({ 
                    messageTemplate: tpl.id, 
                    messageText: tpl.text,
                    includeDiscount: tpl.discount 
                  })}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                    config.messageTemplate === tpl.id
                      ? 'bg-emerald-50/70 border-emerald-500 font-medium ring-1 ring-emerald-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold text-slate-900">{tpl.name}</div>
                  <div className="text-[11px] text-slate-500 truncate mt-0.5">{tpl.text.slice(0, 75)}...</div>
                </button>
              ))}
            </div>
          </div>

          {/* Message Text Editor */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Message Content
              </label>
              <span className="text-[10px] text-slate-400">
                {config.messageText.length} characters (WhatsApp supports up to 1024)
              </span>
            </div>

            <textarea
              rows={5}
              value={config.messageText}
              onChange={(e) => updateConfig({ messageText: e.target.value })}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-800 font-sans leading-relaxed"
              placeholder="Type your WhatsApp message..."
            />

            {/* Dynamic variable chips */}
            <div className="mt-2">
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                Insert dynamic customer variables:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { tag: '{{first_name}}', label: 'Customer First Name' },
                  { tag: '{{cart_items}}', label: 'Cart Product Names' },
                  { tag: '{{discount_code}}', label: 'Discount Code' },
                  { tag: '{{cart_url}}', label: '1-Tap Checkout Link' },
                ].map((v) => (
                  <button
                    key={v.tag}
                    type="button"
                    onClick={() => insertVariable(v.tag)}
                    className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded-md bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 border border-slate-200 transition-colors"
                  >
                    <Plus className="w-3 h-3 text-emerald-600" />
                    <span>{v.tag}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Discount code toggle & settings */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900">Include Recovery Discount Code</h4>
                <p className="text-[11px] text-slate-500">Auto-applies when shopper taps the checkout button</p>
              </div>
              <input
                type="checkbox"
                checked={config.includeDiscount}
                onChange={(e) => updateConfig({ includeDiscount: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded-sm border-slate-300 focus:ring-emerald-500"
              />
            </div>

            {config.includeDiscount && (
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    value={config.discountCode}
                    onChange={(e) => updateConfig({ discountCode: e.target.value.toUpperCase() })}
                    className="w-full text-xs font-mono font-bold uppercase px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                    Discount Percentage
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min={5}
                      max={50}
                      value={config.discountPercent}
                      onChange={(e) => updateConfig({ discountPercent: Number(e.target.value) })}
                      className="w-full text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                    <span className="ml-2 text-xs font-bold text-slate-500">%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Phone Mockup Preview (5 cols) */}
        <div className={`lg:col-span-5 flex-col items-center justify-center bg-slate-100/60 p-4 rounded-2xl border border-slate-200/80 ${mobileTab === 'preview' ? 'flex' : 'hidden lg:flex'}`}>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
            <Eye className="w-3.5 h-3.5 text-emerald-600" />
            Live Customer WhatsApp Preview
          </div>
          <WhatsAppPhoneMockup
            messageText={config.messageText}
            discountCode={config.discountCode}
            includeDiscount={config.includeDiscount}
            ctaText={config.ctaButtonText}
            customerName="Priya"
          />
        </div>
      </div>
    </div>
  );
};
