import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  NavigationTab, 
  Recommendation, 
  AutomationWorkflow, 
  WhatsAppConnectionState,
  WizardDraftConfig 
} from '../types/growth';
import { 
  INITIAL_RECOMMENDATIONS, 
  INITIAL_AUTOMATIONS, 
  INITIAL_WHATSAPP_STATE,
  REC_POINT_VALUES
} from '../data/mockData';

export interface ToastInfo {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  undoAction?: () => void;
  actionLabel?: string;
}

interface AppContextType {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  recommendations: Recommendation[];
  automations: AutomationWorkflow[];
  whatsappState: WhatsAppConnectionState;
  wizardOpen: boolean;
  selectedRecommendation: Recommendation | null;
  toasts: ToastInfo[];
  growthScore: number;
  openWizard: (recId: string) => void;
  closeWizard: () => void;
  dismissRecommendation: (recId: string, reason?: string) => void;
  undoDismissRecommendation: (recId: string) => void;
  activateWorkflow: (recId: string, config: WizardDraftConfig) => void;
  toggleWhatsAppConnection: () => void;
  connectWhatsApp: (phone?: string) => void;
  toggleAutomationStatus: (autoId: string) => void;
  resetAllDemoData: () => void;
  showToast: (toast: Omit<ToastInfo, 'id'>) => void;
  dismissToast: (id: string) => void;
  suggestedNextAction: Recommendation | null;
  dismissNextActionSuggestion: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [recommendations, setRecommendations] = useState<Recommendation[]>(() => {
    const saved = localStorage.getItem('cheerio_recommendations');
    return saved ? JSON.parse(saved) : INITIAL_RECOMMENDATIONS;
  });
  const [automations, setAutomations] = useState<AutomationWorkflow[]>(() => {
    const saved = localStorage.getItem('cheerio_automations');
    return saved ? JSON.parse(saved) : INITIAL_AUTOMATIONS;
  });
  const [whatsappState, setWhatsappState] = useState<WhatsAppConnectionState>(() => {
    const saved = localStorage.getItem('cheerio_whatsapp');
    return saved ? JSON.parse(saved) : INITIAL_WHATSAPP_STATE;
  });
  const [wizardOpen, setWizardOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);
  const [suggestedNextAction, setSuggestedNextAction] = useState<Recommendation | null>(null);

  // Sync to local storage for realistic persistence
  useEffect(() => {
    localStorage.setItem('cheerio_recommendations', JSON.stringify(recommendations));
  }, [recommendations]);

  useEffect(() => {
    localStorage.setItem('cheerio_automations', JSON.stringify(automations));
  }, [automations]);

  useEffect(() => {
    localStorage.setItem('cheerio_whatsapp', JSON.stringify(whatsappState));
  }, [whatsappState]);

  // Compute dynamic Growth Score based on actual demo progress:
  // Baseline (40 pts): Shopify store connected (20 pts) + 2 baseline transactional/welcome automations (20 pts)
  // Each activated recommendation unlocks explicit incremental points:
  // - WhatsApp Cart Recovery: +25 pts (Score: 65%)
  // - AI Skincare Assistant: +15 pts (Score: 80%)
  // - Timely Restock Reminders: +10 pts (Score: 90%)
  // - Routine & Reviews: +10 pts (Score: 100%)
  const baseStorePoints = 20; // Shopify store connected & product catalog synced
  const activeBaseAutomations = automations.filter(a => a.status === 'active').length;
  const baseAutomationPoints = Math.min(20, activeBaseAutomations * 10);
  const baselineScore = baseStorePoints + baseAutomationPoints;

  const activatedRecsPoints = recommendations
    .filter(r => r.status === 'active')
    .reduce((sum, r) => sum + (REC_POINT_VALUES[r.id] || 10), 0);

  const growthScore = Math.min(100, baselineScore + activatedRecsPoints);

  const showToast = (toast: Omit<ToastInfo, 'id'>) => {
    const id = Date.now().toString();
    const newToast: ToastInfo = { ...toast, id };
    setToasts(prev => [...prev.slice(-3), newToast]);
    setTimeout(() => {
      dismissToast(id);
    }, 6000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const openWizard = (recId: string) => {
    const rec = recommendations.find(r => r.id === recId) || recommendations[0];
    setSelectedRecommendation(rec);
    setWizardOpen(true);
  };

  const closeWizard = () => {
    setWizardOpen(false);
  };

  const dismissRecommendation = (recId: string, reason: string = 'Not relevant right now') => {
    const rec = recommendations.find(r => r.id === recId);
    if (!rec) return;

    setRecommendations(prev =>
      prev.map(r => r.id === recId ? { ...r, status: 'dismissed', dismissReason: reason } : r)
    );

    showToast({
      type: 'info',
      title: 'Recommendation dismissed',
      message: `"${rec.title}" was hidden. You can undo this anytime.`,
      actionLabel: 'Undo',
      undoAction: () => undoDismissRecommendation(recId),
    });
  };

  const undoDismissRecommendation = (recId: string) => {
    setRecommendations(prev =>
      prev.map(r => r.id === recId ? { ...r, status: 'recommended', dismissReason: undefined } : r)
    );
    showToast({
      type: 'success',
      title: 'Recommendation restored',
      message: 'Feature recommendation is visible in your Growth Guide again.',
    });
  };

  const activateWorkflow = (recId: string, config: WizardDraftConfig) => {
    const targetRec = recommendations.find(r => r.id === recId) || selectedRecommendation;
    if (!targetRec) return;

    // Update recommendation status to active
    setRecommendations(prev =>
      prev.map(r => r.id === targetRec.id ? { ...r, status: 'active' } : r)
    );

    // Create a new active automation in automations list
    const newAutomation: AutomationWorkflow = {
      id: `auto_${Date.now()}`,
      name: targetRec.title,
      category: targetRec.category === 'revenue' ? 'Revenue Recovery' : 'Engagement',
      trigger: `Trigger: ${config.triggerCondition} (Wait: ${config.triggerDelay})`,
      triggerDelay: config.triggerDelay,
      status: 'active',
      templateName: config.messageTemplate || 'glow_cart_recovery_v1',
      messageContent: config.messageText,
      discountCode: config.includeDiscount ? config.discountCode : '',
      discountValue: config.includeDiscount ? `${config.discountPercent}%` : '',
      stats: {
        triggered: 1,
        delivered: 1,
        converted: 0,
        revenueRecovered: 0,
        conversionRate: 0,
      },
      lastActive: 'Just now (Simulated live)',
    };

    setAutomations(prev => [newAutomation, ...prev]);

    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#059669', '#34D399', '#6EE7B7', '#FBBF24']
      });
    } catch {
      // fallback
    }

    // Determine the next recommended action based on product thinking:
    // E.g., If user set up abandoned cart, recommend the AI Chatbot next so customer questions are answered!
    const remainingRecs = recommendations.filter(r => r.id !== targetRec.id && r.status === 'recommended');
    const nextBest = remainingRecs.find(r => r.id === 'rec_ai_chatbot') || remainingRecs[0] || null;
    setSuggestedNextAction(nextBest);

    showToast({
      type: 'success',
      title: '🎉 Feature Activated Successfully!',
      message: `"${targetRec.title}" is now live and monitoring your store.`,
    });

    closeWizard();
  };

  const toggleWhatsAppConnection = () => {
    setWhatsappState(prev => {
      const nextState = !prev.isConnected;
      showToast({
        type: nextState ? 'success' : 'warning',
        title: nextState ? 'WhatsApp Business API Connected' : 'WhatsApp API Disconnected',
        message: nextState
          ? 'Live messaging credentials verified for +91 98201 54321.'
          : 'Simulating disconnected state. Test the missing-connection wizard edge case!',
      });
      return {
        ...prev,
        isConnected: nextState,
      };
    });
  };

  const connectWhatsApp = (phone: string = '+91 98201 54321') => {
    setWhatsappState(prev => ({
      ...prev,
      isConnected: true,
      phoneNumber: phone,
      displayName: 'GlowBotanics Official',
      connectedAt: 'Just now',
      qualityRating: 'High',
    }));
    showToast({
      type: 'success',
      title: 'WhatsApp Connected!',
      message: 'Meta WhatsApp Business API successfully authorized.',
    });
  };

  const toggleAutomationStatus = (autoId: string) => {
    setAutomations(prev =>
      prev.map(a => {
        if (a.id === autoId) {
          const newStatus = a.status === 'active' ? 'paused' : 'active';
          showToast({
            type: 'info',
            title: `Automation ${newStatus === 'active' ? 'Resumed' : 'Paused'}`,
            message: `"${a.name}" is now ${newStatus}.`,
          });
          return { ...a, status: newStatus };
        }
        return a;
      })
    );
  };

  const resetAllDemoData = () => {
    localStorage.removeItem('cheerio_recommendations');
    localStorage.removeItem('cheerio_automations');
    localStorage.removeItem('cheerio_whatsapp');
    setRecommendations(INITIAL_RECOMMENDATIONS);
    setAutomations(INITIAL_AUTOMATIONS);
    setWhatsappState(INITIAL_WHATSAPP_STATE);
    setSuggestedNextAction(null);
    setCurrentTab('dashboard');
    showToast({
      type: 'info',
      title: 'Demo Data Reset',
      message: 'All recommendations, workflows, and test states reset to initial baseline.',
    });
  };

  const dismissNextActionSuggestion = () => {
    setSuggestedNextAction(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        recommendations,
        automations,
        whatsappState,
        wizardOpen,
        selectedRecommendation,
        toasts,
        growthScore,
        openWizard,
        closeWizard,
        dismissRecommendation,
        undoDismissRecommendation,
        activateWorkflow,
        toggleWhatsAppConnection,
        connectWhatsApp,
        toggleAutomationStatus,
        resetAllDemoData,
        showToast,
        dismissToast,
        suggestedNextAction,
        dismissNextActionSuggestion,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
