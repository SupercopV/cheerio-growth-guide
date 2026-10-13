import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare, 
  Settings2, 
  ShieldCheck, 
  HelpCircle,
  RefreshCw,
  Zap
} from 'lucide-react';
import { FAQ_CHATBOT_MOCK_MESSAGES } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const ChatbotsView: React.FC = () => {
  const { showToast, recommendations, openWizard } = useApp();
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>(
    FAQ_CHATBOT_MOCK_MESSAGES
  );
  const [inputMessage, setInputMessage] = useState('');
  const [botActive, setBotActive] = useState(true);

  const quickPrompts = [
    'Where is my order #GB-8921?',
    'Can I layer Niacinamide with Vitamin C serum?',
    'What cleanser is best for sensitive redness?',
    'What is your return policy on opened skincare?'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const newMessages = [...messages, { sender: 'user' as const, text }];
    setMessages(newMessages);
    setInputMessage('');

    // Generate smart simulated skincare response
    setTimeout(() => {
      let botReply = "Hi! 🌿 GlowBot here. Thanks for reaching out! Let me check that for you.";
      const lower = text.toLowerCase();

      if (lower.includes('order') || lower.includes('tracking')) {
        botReply = "Your GlowBotanics package #GB-8921 was dispatched via Delhivery on Oct 11. It's out for delivery today by 5:00 PM! 📦 Track live here: https://delhivery.com/track/GB8921";
      } else if (lower.includes('niacinamide') || lower.includes('layer') || lower.includes('vitamin c')) {
        botReply = "Great question! 🌸 Yes, our 10% Niacinamide Blemish Serum and 15% Vitamin C Glow Serum can be layered. We recommend applying Vitamin C in the morning followed by SPF 50, and Niacinamide at night on clean damp skin.";
      } else if (lower.includes('redness') || lower.includes('sensitive') || lower.includes('cleanser')) {
        botReply = "For sensitive redness, we recommend our Centella Soothing Cleanser! It contains 42% Madecassoside and zero synthetic fragrances or sulfates. It soothes irritated skin barriers within 3 days. Would you like a 10% coupon?";
      } else if (lower.includes('return') || lower.includes('policy')) {
        botReply = "We offer a 30-Day Glow Guarantee! If any product doesn't suit your skin type, return it for a 100% store credit or exchange within 30 days of delivery. No questions asked!";
      } else {
        botReply = `Thanks for asking about that! 🌿 All GlowBotanics formulas are 100% vegan, cruelty-free, and formulated with clinically proven botanicals. Our support team is also on standby if you'd like a custom consultation!`;
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              AI Skincare Consultant & FAQ Chatbot
            </h2>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full">
              24/7 Always Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Trained on your GlowBotanics product catalog and Shopify inventory. Resolves ~78% of routine customer queries instantly (Illustrative Demo Benchmark).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setBotActive(!botActive);
              showToast({
                type: 'info',
                title: botActive ? 'Bot Paused' : 'Bot Resumed',
                message: botActive ? 'AI Chatbot is now paused.' : 'AI Chatbot is actively answering shopper questions.',
              });
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              botActive 
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                : 'bg-slate-200 text-slate-600'
            }`}
          >
            {botActive ? '● Bot Status: Online' : '○ Bot Status: Paused'}
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Chat Simulator on Left, Settings on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Chat Simulator (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col h-[580px] overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-emerald-700 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-800 border border-emerald-500 flex items-center justify-center font-bold text-xs text-white">
                GB
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight flex items-center gap-1">
                  GlowBot (Skincare AI)
                  <span className="text-[9px] bg-emerald-500 text-white px-1.5 py-0.2 rounded-xs">AI</span>
                </h4>
                <p className="text-[10px] text-emerald-200">GlowBotanics Customer Concierge</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMessages(FAQ_CHATBOT_MOCK_MESSAGES)}
              className="text-xs text-emerald-200 hover:text-white flex items-center gap-1"
              title="Reset conversation"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <span className="text-slate-400 font-bold shrink-0">Try asking:</span>
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 px-2.5 py-1 rounded-full border border-slate-200 shrink-0 font-medium transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF8F5]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-2xs ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-xs'
                    : 'bg-white text-slate-800 rounded-bl-xs border border-slate-200/80'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask anything about skincare formulas, shipping, or returns..."
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-800"
            />
            <button
              type="button"
              onClick={() => handleSendMessage()}
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bot Controls & Knowledge Base (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-emerald-600" />
              Bot Knowledge Base & Setup
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Catalog Sync Active</strong>
                  <span className="text-slate-600 text-[11px]">
                    18 GlowBotanics formulas (Kumkumadi, Centella, Niacinamide) indexed with full ingredient lists and contraindications.
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Smart Safety Guardrails</strong>
                  <span className="text-slate-600 text-[11px]">
                    Strictly disclaims medical diagnostics and advises consulting a dermatologist for severe cystic acne.
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Human Handoff Threshold</strong>
                  <span className="text-slate-600 text-[11px]">
                    If a customer mentions "damaged parcel", "refund request", or expresses frustration, WhatsApp notifies human support team immediately.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Business Impact Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <h4 className="text-xs font-bold text-slate-700 uppercase mb-3">Expected Business Impact</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Query Resolution</div>
                <div className="text-lg font-bold text-emerald-700 mt-0.5">78.4%</div>
                <div className="text-[10px] text-slate-400">Without human staff</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Saved Weekly</div>
                <div className="text-lg font-bold text-slate-900 mt-0.5">18+ hours</div>
                <div className="text-[10px] text-slate-400">Support time saved</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
