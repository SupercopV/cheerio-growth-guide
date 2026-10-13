import React from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  MessageSquare, 
  CheckCircle2, 
  AlertTriangle,
  ChevronDown,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  onToggleMobileMenu: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onToggleMobileMenu,
  searchQuery,
  setSearchQuery
}) => {
  const { 
    whatsappState, 
    toggleWhatsAppConnection, 
    growthScore,
    currentTab,
    setCurrentTab
  } = useApp();

  const getPageTitle = () => {
    switch (currentTab) {
      case 'dashboard': return 'Growth Guide';
      case 'campaigns': return 'Broadcast Campaigns';
      case 'automations': return 'Automations & Flows';
      case 'chatbots': return 'AI Skincare Chatbots';
      case 'crm': return 'Customer Segments & CRM';
      case 'analytics': return 'Analytics & Conversion ROI';
      case 'settings': return 'Platform Settings & Channels';
      default: return 'Cheerio';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-3 sm:px-6">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="lg:hidden p-1.5 sm:p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 shrink-0"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-lg font-bold text-slate-900 font-display truncate">
              {getPageTitle()}
            </h1>
            {currentTab === 'dashboard' && (
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Personalized Assistant
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Middle & Right Section */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Search Input - Desktop only to save space on tablets & mobile */}
        <div className="relative hidden lg:block w-52 xl:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search features, workflows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-800 placeholder-slate-400"
          />
        </div>

        {/* Growth Score Chip - Visible on mobile and desktop */}
        <div 
          onClick={() => setCurrentTab('dashboard')}
          className="flex items-center gap-1 sm:gap-2 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 cursor-pointer hover:bg-emerald-100/60 transition-colors shrink-0"
          title="Growth Readiness Score: Unlocks as you activate recommended automations"
        >
          <div className="text-[9px] sm:text-[10px] font-bold text-slate-600 uppercase tracking-wider hidden xs:block">Score</div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div className="w-8 sm:w-12 bg-slate-200 rounded-full h-1.5 sm:h-2 overflow-hidden hidden sm:block">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${growthScore}%` }}
              />
            </div>
            <span className="text-xs font-bold text-emerald-700">{growthScore}%</span>
          </div>
        </div>

        {/* WhatsApp Channel Indicator (Interactive!) */}
        <button
          type="button"
          onClick={toggleWhatsAppConnection}
          className={`flex items-center gap-1.5 px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold border transition-all shrink-0 ${
            whatsappState.isConnected 
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100/70' 
              : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100/70 animate-pulse'
          }`}
          title="Click to toggle connection state and test recovery flow"
        >
          <MessageSquare className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden md:inline">WhatsApp:</span>
          <span>{whatsappState.isConnected ? 'Connected' : 'Offline'}</span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-1.5 sm:pl-2 border-l border-slate-200 shrink-0">
          <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center font-bold text-xs">
            AS
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-none">Ananya Sharma</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Founder, GlowBotanics</p>
          </div>
        </div>
      </div>
    </header>
  );
};
