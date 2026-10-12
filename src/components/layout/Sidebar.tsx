import React from 'react';
import { 
  LayoutDashboard, 
  Send, 
  Workflow, 
  Bot, 
  Users, 
  BarChart3, 
  Settings, 
  Sparkles,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types/growth';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const { currentTab, setCurrentTab, recommendations, automations, whatsappState } = useApp();

  const activeRecCount = recommendations.filter(r => r.status === 'recommended').length;
  const activeAutoCount = automations.filter(a => a.status === 'active').length;

  const navItems: { id: NavigationTab; label: string; icon: React.FC<any>; badge?: string; badgeColor?: string; highlight?: boolean }[] = [
    { 
      id: 'dashboard', 
      label: 'Growth Guide', 
      icon: Sparkles, 
      badge: activeRecCount > 0 ? `${activeRecCount} new` : undefined,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      highlight: true
    },
    { 
      id: 'campaigns', 
      label: 'Campaigns', 
      icon: Send,
    },
    { 
      id: 'automations', 
      label: 'Automations', 
      icon: Workflow,
      badge: activeAutoCount > 0 ? `${activeAutoCount} live` : undefined,
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-200'
    },
    { 
      id: 'chatbots', 
      label: 'AI Chatbots', 
      icon: Bot,
      badge: 'Beta',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    { 
      id: 'crm', 
      label: 'Customers & CRM', 
      icon: Users,
    },
    { 
      id: 'analytics', 
      label: 'Analytics & ROI', 
      icon: BarChart3,
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings,
    },
  ];

  const handleSelectTab = (tab: NavigationTab) => {
    setCurrentTab(tab);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col justify-between
        transition-transform duration-200 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top Header / Brand Logo */}
        <div>
          <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold shadow-xs">
                <span className="text-base tracking-tighter">C</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900 tracking-tight font-display text-base">cheerio</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Growth
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">Marketing Platform</p>
              </div>
            </div>
          </div>

          {/* Connected Store Switcher / Identity */}
          <div className="p-3 mx-3 mt-3 bg-slate-50 border border-slate-200/80 rounded-xl">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Active Store</span>
              <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Shopify
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-emerald-700 text-white flex items-center justify-center text-xs font-bold">
                GB
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-800 truncate">GlowBotanics Skincare</h4>
                <p className="text-[10px] text-slate-500 truncate">glowbotanics.myshopify.com</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Platform Features
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectTab(item.id)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group text-left
                    ${isActive 
                      ? 'bg-emerald-500/10 text-emerald-800 font-semibold border border-emerald-500/20 shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'
                    }`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.badgeColor || 'bg-slate-100 text-slate-600'}`}>
                        {item.badge}
                      </span>
                    )}
                    {isActive && (
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* WhatsApp Channel Status Footer */}
        <div className="p-3 border-t border-slate-100 space-y-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                WhatsApp Channel
              </span>
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                whatsappState.isConnected 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-rose-100 text-rose-800 animate-pulse'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${whatsappState.isConnected ? 'bg-emerald-600' : 'bg-rose-600'}`}></span>
                {whatsappState.isConnected ? 'Connected' : 'Offline'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate">{whatsappState.phoneNumber}</p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span>Cheerio v3.4.2</span>
            <span className="text-emerald-700 hover:text-emerald-800 font-medium cursor-pointer flex items-center gap-0.5">
              Help Docs <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
