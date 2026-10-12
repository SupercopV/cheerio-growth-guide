import React from 'react';
import { ShoppingCart, Clock, Sparkles, AlertCircle, CheckCircle2, DollarSign, Eye } from 'lucide-react';
import { WizardDraftConfig } from '../../types/growth';

interface Step1Props {
  config: WizardDraftConfig;
  updateConfig: (updates: Partial<WizardDraftConfig>) => void;
}

export const Step1ChooseTrigger: React.FC<Step1Props> = ({ config, updateConfig }) => {
  const triggerOptions = [
    {
      id: 'checkout_abandoned',
      title: 'Checkout Abandoned (Recommended)',
      badge: 'Highest Recovery Rate',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: ShoppingCart,
      description: 'Triggers when a customer inputs their shipping details on Shopify but does not complete online payment.',
      conditionLabel: 'Cart Abandoned > 30 mins',
      recommendedDelay: '30 mins',
    },
    {
      id: 'high_value_cart',
      title: 'High-Value Cart (> ₹2,000) Abandoned',
      badge: 'VIP AOV Protection',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: DollarSign,
      description: 'Target premium orders containing full skincare kits or luxury serums with special expedited attention.',
      conditionLabel: 'High-value cart unpaid',
      recommendedDelay: '15 mins',
    },
    {
      id: 'browse_drop',
      title: 'Repeated Skincare Page Browser',
      badge: 'Intent Nudge',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
      icon: Eye,
      description: 'Triggers when a known subscriber visits product pages 3+ times in 24 hours without initiating checkout.',
      conditionLabel: 'Browsed product 3x',
      recommendedDelay: '2 hours',
    },
  ];

  const delayOptions = [
    { value: '15 mins', label: '15 Minutes', note: 'Fastest nudge' },
    { value: '30 mins', label: '30 Minutes (Recommended)', note: 'Industry best practice for D2C skincare' },
    { value: '1 hour', label: '1 Hour', note: 'Gentle reminder' },
    { value: '2 hours', label: '2 Hours', note: 'Later re-engagement' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
          Step 1: Choose When to Trigger the WhatsApp Message
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Select the customer action that should launch this automation. You don't need any code — Cheerio connects automatically to your Shopify checkout events.
        </p>
      </div>

      {/* Trigger cards list */}
      <div className="space-y-3">
        {triggerOptions.map((opt) => {
          const Icon = opt.icon;
          const isSelected = config.triggerId === opt.id;

          return (
            <div
              key={opt.id}
              onClick={() => {
                updateConfig({
                  triggerId: opt.id,
                  triggerCondition: opt.conditionLabel,
                  triggerDelay: opt.recommendedDelay,
                });
              }}
              className={`
                p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5
                ${isSelected 
                  ? 'bg-emerald-50/50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs' 
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }
              `}
            >
              <div className={`
                w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5
                ${isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}
              `}>
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{opt.title}</h4>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${opt.badgeColor}`}>
                    {opt.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {opt.description}
                </p>
              </div>

              <div className="shrink-0 self-center pl-2">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 bg-white'
                }`}>
                  {isSelected && <CheckCircle2 className="w-4 h-4" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Wait Delay Selector */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-600" />
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Waiting Delay Before Sending WhatsApp Message
          </h4>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {delayOptions.map((delay) => {
            const isSelected = config.triggerDelay === delay.value;
            return (
              <button
                key={delay.value}
                type="button"
                onClick={() => updateConfig({ triggerDelay: delay.value })}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold">{delay.label}</div>
                <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                  {delay.note}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-start gap-2 text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200/80">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <span>
            <strong>Cheerio Growth Tip:</strong> In D2C Skincare, a 30-minute delay generates the highest return (21.8% recovery). Customers haven't moved on to other sites, but don't feel interrupted mid-checkout.
          </span>
        </div>
      </div>
    </div>
  );
};
