export type NavigationTab = 
  | 'dashboard'
  | 'campaigns'
  | 'automations'
  | 'chatbots'
  | 'crm'
  | 'analytics'
  | 'settings';

export type RecommendationCategory = 'revenue' | 'support' | 'retention' | 'analytics';

export type RecommendationImpact = 'High Impact' | 'Medium Impact' | 'Quick Win';

export interface Recommendation {
  id: string;
  title: string;
  subtitle: string;
  category: RecommendationCategory;
  impact: RecommendationImpact;
  roiEstimate: string;
  metricLabel: string;
  metricValue: string;
  setupTime: string;
  description: string;
  whyItMatters: string;
  keyBenefits: string[];
  status: 'recommended' | 'in_progress' | 'active' | 'dismissed';
  wizardType: 'abandoned_cart' | 'ai_chatbot' | 'campaign_analytics';
  dismissReason?: string;
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  category: string;
  trigger: string;
  triggerDelay: string;
  status: 'active' | 'paused' | 'draft';
  templateName: string;
  messageContent: string;
  discountCode: string;
  discountValue: string;
  stats: {
    triggered: number;
    delivered: number;
    converted: number;
    revenueRecovered: number;
    conversionRate: number;
  };
  lastActive: string;
}

export interface WhatsAppConnectionState {
  isConnected: boolean;
  phoneNumber: string;
  displayName: string;
  wabaId: string;
  qualityRating: 'High' | 'Medium' | 'Low';
  dailyLimit: string;
  connectedAt: string;
}

export interface CustomerLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: 'Cart Abandoned' | 'VIP Customer' | 'First Purchase' | 'At Risk';
  lastActivity: string;
  cartItems?: string[];
  cartValue?: number;
  totalOrders: number;
  totalSpent: number;
}

export interface CampaignItem {
  id: string;
  name: string;
  audience: string;
  status: 'Delivered' | 'Scheduled' | 'Draft';
  sentCount: number;
  deliveryRate: string;
  openRate: string;
  conversionRate: string;
  revenueGenerated: string;
  sentDate: string;
}

export interface WizardDraftConfig {
  triggerId: string;
  triggerDelay: string;
  triggerCondition: string;
  messageTemplate: string;
  messageText: string;
  includeDiscount: boolean;
  discountCode: string;
  discountPercent: number;
  ctaButtonText: string;
  ctaButtonUrl: string;
  testPhoneNumber: string;
  testStatus: 'idle' | 'sending' | 'delivered' | 'failed';
  testResponseReceived: boolean;
}
