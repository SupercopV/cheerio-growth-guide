import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Clock, 
  GitFork, 
  MessageSquare, 
  CheckCircle2, 
  ArrowDown, 
  HelpCircle,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { WizardDraftConfig } from '../../types/growth';

interface Step3Props {
  config: WizardDraftConfig;
}

export const Step3PreviewWorkflow: React.FC<Step3Props> = ({ config }) => {
  const [selectedNode, setSelectedNode] = useState<string>('node_action');

  const nodes = [
    {
      id: 'node_trigger',
      title: '1. Event Trigger',
      subtitle: 'Shopify Store Signal',
      icon: ShoppingCart,
      badge: 'Shopify Webhook',
      color: 'border-blue-400 bg-blue-50/50 text-blue-700',
      description: 'Customer initiates checkout for items (e.g. Kumkumadi Oil) and leaves before payment.',
      details: 'Connected to Shopify Cart API. Instant sync with customer phone & cart contents.'
    },
    {
      id: 'node_delay',
      title: '2. Smart Wait Timer',
      subtitle: `Delay: ${config.triggerDelay}`,
      icon: Clock,
      badge: 'Delay Rule',
      color: 'border-amber-400 bg-amber-50/50 text-amber-700',
      description: `Cheerio waits precisely ${config.triggerDelay} before taking action.`,
      details: 'Gives the customer time to complete payment on their own without receiving an unnecessary message.'
    },
    {
      id: 'node_condition',
      title: '3. Cart Status Check',
      subtitle: 'Guardrail Decision',
      icon: GitFork,
      badge: 'Automatic Safety Check',
      color: 'border-purple-400 bg-purple-50/50 text-purple-700',
      description: 'Has the customer placed an order during the wait window?',
      details: 'If YES: Sequence halts immediately. Customer never receives an annoying message for an order they already paid for!'
    },
    {
      id: 'node_action',
      title: '4. Send WhatsApp Message',
      subtitle: 'Official Meta Cloud API',
      icon: MessageSquare,
      badge: 'High Conversion',
      color: 'border-emerald-500 bg-emerald-50/70 text-emerald-800 ring-2 ring-emerald-500/30',
      description: 'Sends dynamic WhatsApp reminder with cart item preview and 1-tap checkout link.',
      details: `Includes discount code ${config.includeDiscount ? config.discountCode : 'None'}. Delivery verified with blue checkmarks.`
    },
    {
      id: 'node_outcome',
      title: '5. Conversion Goal',
      subtitle: 'Sale Recovered',
      icon: CheckCircle2,
      badge: 'Revenue Logged',
      color: 'border-emerald-600 bg-emerald-100 text-emerald-900',
      description: 'Customer completes purchase. Cheerio attributes ₹GMV directly to your analytics dashboard.',
      details: 'Average recovery turnaround is under 18 minutes from WhatsApp delivery.'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
          Step 3: Preview the Visual Automation Workflow
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Here is how Cheerio orchestrates the customer journey from start to finish. Everything runs in the background 24/7.
        </p>
      </div>

      {/* Visual Workflow Canvas */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 sm:p-6 relative overflow-hidden">
        <div className="max-w-xl mx-auto space-y-3">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            const isSelected = selectedNode === node.id;

            return (
              <React.Fragment key={node.id}>
                <div
                  onClick={() => setSelectedNode(node.id)}
                  className={`
                    p-3.5 sm:p-4 rounded-xl border bg-white cursor-pointer transition-all flex items-start gap-3 sm:gap-3.5 shadow-2xs
                    ${isSelected 
                      ? 'ring-2 ring-emerald-500 border-emerald-500 shadow-sm' 
                      : 'hover:border-slate-300'
                    }
                  `}
                >
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border ${node.color}`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5 sm:gap-2 flex-wrap mb-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-slate-900">{node.title}</span>
                        <span className="text-[10px] text-slate-500 font-medium">({node.subtitle})</span>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 shrink-0">
                        {node.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{node.description}</p>
                  </div>
                </div>

                {/* Arrow down between nodes */}
                {index < nodes.length - 1 && (
                  <div className="flex justify-center my-1">
                    <div className="w-6 h-6 rounded-full bg-slate-200/80 flex items-center justify-center text-slate-500 text-xs">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Customer Journey Storyboard Walkthrough (Non-technical friendly) */}
      <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider">
          <Zap className="w-4 h-4 text-emerald-600" />
          Real-Life Customer Example (Priya's Journey)
        </div>
        <p className="text-xs text-slate-700 leading-relaxed">
          At <strong>3:00 PM</strong>, Priya adds Kumkumadi Oil to her cart on your store. She gets a phone call and leaves.
          At <strong>3:30 PM</strong>, Cheerio verifies no payment was made, and automatically delivers your WhatsApp reminder. 
          Priya opens WhatsApp, taps <em>"Complete My Order"</em> with <strong>{config.discountCode}</strong> applied, and pays. 
          The automation marks the ₹2,450 cart as recovered and halts. 
        </p>
      </div>
    </div>
  );
};
