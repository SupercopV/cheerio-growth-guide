import { Recommendation, AutomationWorkflow, CustomerLead, CampaignItem, WhatsAppConnectionState } from '../types/growth';

export const INITIAL_WHATSAPP_STATE: WhatsAppConnectionState = {
  isConnected: true, // can be toggled by user to test edge case!
  phoneNumber: '+91 98201 54321',
  displayName: 'GlowBotanics Official',
  wabaId: 'WABA-IND-884920',
  qualityRating: 'High',
  dailyLimit: '10,000 conversations / day',
  connectedAt: '12 May 2026',
};

export const REC_POINT_VALUES: Record<string, number> = {
  rec_abandoned_cart: 25,
  rec_ai_chatbot: 15,
  rec_campaign_analytics: 10,
  rec_post_purchase_review: 10,
};

export const INITIAL_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'rec_abandoned_cart',
    title: 'Automatic WhatsApp Cart Recovery',
    subtitle: 'Politely remind skincare shoppers who leave checkout without paying',
    category: 'revenue',
    impact: 'High Impact',
    roiEstimate: '+₹3,84,000 / mo (Illustrative Demo Data)',
    metricLabel: 'Est. Recovery Rate',
    metricValue: '21.8%',
    setupTime: '3 mins',
    description: 'Over 71% of skincare shoppers add serums or moisturizers to their mobile cart but get distracted before paying. Cheerio sends a friendly, automated WhatsApp message within 30 minutes with photos of their exact products and a 1-tap checkout link.',
    whyItMatters: 'Skincare purchases are sensory and thoughtful. Shoppers often leave to check ingredients, search for coupons, or ask a friend. Reaching them warmly on WhatsApp while their interest is fresh achieves an estimated 84% read rate within 15 minutes.',
    keyBenefits: [
      'Direct WhatsApp message with a 1-tap button to finish their purchase',
      'Automatically displays the exact skincare products left in their cart',
      'Includes an optional 10% coupon code (e.g. GLOW10) to encourage hesitant buyers',
      'Automatically stops if the customer completes payment so they never get duplicate messages'
    ],
    status: 'recommended',
    wizardType: 'abandoned_cart',
  },
  {
    id: 'rec_ai_chatbot',
    title: '24/7 AI Skincare Assistant & Support',
    subtitle: 'Instantly answer product questions, suggest routines, and look up delivery status',
    category: 'support',
    impact: 'High Impact',
    roiEstimate: '80% faster replies (Illustrative Demo Data)',
    metricLabel: 'Query Resolution',
    metricValue: '78.4%',
    setupTime: '4 mins',
    description: 'Trained on your GlowBotanics skincare catalog to answer shopper questions like "Is this niacinamide serum safe for sensitive skin?" or "Where is my order?" in seconds without needing full-time customer service staff.',
    whyItMatters: 'Skincare customers want immediate reassurance about skin sensitivity and ingredients before buying. Quick, helpful answers reduce hesitation and help you win orders even while you sleep.',
    keyBenefits: [
      'Pre-loaded answers for ingredient safety, skin types, and common product FAQs',
      'Live order tracking lookup so customers instantly see where their parcel is',
      'Seamlessly transfers tricky customer questions directly to you or your team on WhatsApp',
      'Captures buyer inquiries and generates orders 24/7, even outside business hours'
    ],
    status: 'recommended',
    wizardType: 'ai_chatbot',
  },
  {
    id: 'rec_campaign_analytics',
    title: 'Timely Bottle Restock Reminders',
    subtitle: 'Remind happy customers to refill their serum or cream right before it runs out',
    category: 'retention',
    impact: 'Medium Impact',
    roiEstimate: '3.4x repeat purchase rate (Illustrative Demo Data)',
    metricLabel: 'Repeat Customer Lift',
    metricValue: '+34.2%',
    setupTime: '2 mins',
    description: 'Most 30ml facial oils and moisturizers last about 45 to 60 days. Cheerio calculates when a buyer is running low and automatically sends a friendly WhatsApp refill prompt before they switch to another brand.',
    whyItMatters: 'Repeat buyers already love your products. Sending a timely WhatsApp reminder when their jar is nearly empty earns steady monthly repeat orders without spending extra money on paid Instagram ads.',
    keyBenefits: [
      'Automated WhatsApp refill reminder sent 45 days after product delivery',
      'Tailored for regular customers who purchase your signature skincare formulations',
      '1-tap re-order button prefilled with their favourite skincare items',
      'Easy-to-read reports showing how many repeat sales were generated'
    ],
    status: 'recommended',
    wizardType: 'campaign_analytics',
  },
  {
    id: 'rec_post_purchase_review',
    title: 'Post-Delivery Routine Guide & Photo Reviews',
    subtitle: 'Share application tips 3 days after delivery and collect authentic 5-star customer reviews',
    category: 'retention',
    impact: 'Quick Win',
    roiEstimate: '4.8x more photo reviews (Illustrative Demo Data)',
    metricLabel: 'Review Rate',
    metricValue: '19.5%',
    setupTime: '2 mins',
    description: 'Delight your customers by sending a simple "How to apply your serum for best results" routine guide 3 days after arrival, followed by an easy 1-tap WhatsApp request for reviews and unboxing photos.',
    whyItMatters: 'When customers know the proper order of application (cleanser → serum → moisturizer), they see better skincare results, love your brand more, and gladly share glowing 5-star reviews.',
    keyBenefits: [
      'Sends automatically 3 days after courier marks parcel as delivered',
      'Step-by-step skincare routine tips that help customers see glowing results',
      'Simple 1-tap WhatsApp review prompt that collects real photos and testimonials',
      'Builds social proof on your store to convince new visitors to buy'
    ],
    status: 'recommended',
    wizardType: 'abandoned_cart',
  }
];

export const INITIAL_AUTOMATIONS: AutomationWorkflow[] = [
  {
    id: 'auto_welcome_series',
    name: 'New Subscriber Welcome & First-Order Perk',
    category: 'Onboarding',
    trigger: 'New contact tagged "Website Pop-up"',
    triggerDelay: 'Immediate (0 mins)',
    status: 'active',
    templateName: 'glow_welcome_v2',
    messageContent: 'Hi {{first_name}}! 🌿 Welcome to the GlowBotanics family. Here is your secret 15% off code: WELCOME15. Tap below to explore our clean skincare collection.',
    discountCode: 'WELCOME15',
    discountValue: '15%',
    stats: {
      triggered: 4820,
      delivered: 4791,
      converted: 1120,
      revenueRecovered: 246400,
      conversionRate: 23.4,
    },
    lastActive: '5 mins ago',
  },
  {
    id: 'auto_shipping_updates',
    name: 'Real-time Courier Tracking & Delivery Alerts',
    category: 'Transactional',
    trigger: 'Shopify Fulfillment event: Shipped / Out for Delivery',
    triggerDelay: 'Immediate',
    status: 'active',
    templateName: 'glow_shipment_tracking',
    messageContent: 'Your GlowBotanics package is on its way! 📦 Courier partner: Delhivery. Track your parcel live here: {{tracking_link}}',
    discountCode: '',
    discountValue: '',
    stats: {
      triggered: 3120,
      delivered: 3105,
      converted: 0,
      revenueRecovered: 0,
      conversionRate: 99.5,
    },
    lastActive: '12 mins ago',
  }
];

export const MOCK_CAMPAIGNS: CampaignItem[] = [
  {
    id: 'cmp_monsoon_glow',
    name: 'Monsoon Hydration Serum Flash Drop',
    audience: 'All Skincare Shoppers (Past 90 Days)',
    status: 'Delivered',
    sentCount: 8450,
    deliveryRate: '98.8%',
    openRate: '86.4%',
    conversionRate: '9.2%',
    revenueGenerated: '₹3,48,200',
    sentDate: 'Yesterday, 6:00 PM',
  },
  {
    id: 'cmp_vip_exclusive',
    name: 'VIP Early Access: Bakuchiol Age-Defy Night Cream',
    audience: 'VIP Skincare Tier (Spend > ₹5,000)',
    status: 'Delivered',
    sentCount: 1620,
    deliveryRate: '99.4%',
    openRate: '92.1%',
    conversionRate: '18.6%',
    revenueGenerated: '₹4,12,000',
    sentDate: 'Oct 04, 2026',
  },
  {
    id: 'cmp_weekend_free_shipping',
    name: 'Weekend Free Mini Sunscreen on orders > ₹1,499',
    audience: 'Engaged Leads (Unconverted Carts)',
    status: 'Scheduled',
    sentCount: 3200,
    deliveryRate: 'Upcoming',
    openRate: '-',
    conversionRate: '-',
    revenueGenerated: 'Est. ₹1.8L',
    sentDate: 'Saturday, 11:00 AM',
  }
];

export const MOCK_CUSTOMERS: CustomerLead[] = [
  {
    id: 'cust_01',
    name: 'Priya Sharma',
    phone: '+91 98210 11234',
    email: 'priya.s@gmail.com',
    status: 'Cart Abandoned',
    lastActivity: '32 mins ago',
    cartItems: ['Kumkumadi Facial Oil (30ml)', 'Centella Soothing Cleanser'],
    cartValue: 2450,
    totalOrders: 1,
    totalSpent: 1890,
  },
  {
    id: 'cust_02',
    name: 'Aarav Mehta',
    phone: '+91 97115 88201',
    email: 'aarav.m@outlook.com',
    status: 'Cart Abandoned',
    lastActivity: '1 hr ago',
    cartItems: ['Ceramide Barrier Repair Moisturizer'],
    cartValue: 1250,
    totalOrders: 0,
    totalSpent: 0,
  },
  {
    id: 'cust_03',
    name: 'Neha Kapoor',
    phone: '+91 99304 44120',
    email: 'neha.kapoor@yahoo.com',
    status: 'VIP Customer',
    lastActivity: '3 days ago',
    cartItems: [],
    cartValue: 0,
    totalOrders: 6,
    totalSpent: 16400,
  },
  {
    id: 'cust_04',
    name: 'Rohan Verma',
    phone: '+91 98450 77192',
    email: 'rohan.v@techcorp.in',
    status: 'At Risk',
    lastActivity: '42 days ago',
    cartItems: [],
    cartValue: 0,
    totalOrders: 2,
    totalSpent: 3800,
  },
  {
    id: 'cust_05',
    name: 'Tanvi Joshi',
    phone: '+91 98199 66321',
    email: 'tanvi.j@gmail.com',
    status: 'Cart Abandoned',
    lastActivity: '4 mins ago',
    cartItems: ['Niacinamide 10% Blemish Serum', 'Rose Dew Hydrating Mist'],
    cartValue: 1980,
    totalOrders: 0,
    totalSpent: 0,
  }
];

export const ANALYTICS_REVENUE_DATA = [
  { date: 'Oct 01', recovered: 18200, regular: 42000, carts: 142 },
  { date: 'Oct 02', recovered: 24500, regular: 49000, carts: 168 },
  { date: 'Oct 03', recovered: 31000, regular: 53000, carts: 185 },
  { date: 'Oct 04', recovered: 29400, regular: 61000, carts: 194 },
  { date: 'Oct 05', recovered: 38600, regular: 58000, carts: 210 },
  { date: 'Oct 06', recovered: 42100, regular: 67000, carts: 232 },
  { date: 'Oct 07', recovered: 48900, regular: 74000, carts: 245 },
  { date: 'Oct 08', recovered: 54200, regular: 71000, carts: 260 },
  { date: 'Oct 09', recovered: 51800, regular: 79000, carts: 254 },
  { date: 'Oct 10', recovered: 62400, regular: 84000, carts: 278 },
  { date: 'Oct 11', recovered: 68100, regular: 88000, carts: 289 },
  { date: 'Oct 12', recovered: 74500, regular: 92000, carts: 310 },
];

export const CHANNEL_PERFORMANCE_DATA = [
  { name: 'WhatsApp Automations', openRate: 94, clickRate: 46, conversionRate: 22.4, color: '#10B981' },
  { name: 'Broadcast Campaigns', openRate: 88, clickRate: 31, conversionRate: 11.2, color: '#3B82F6' },
  { name: 'Traditional Email', openRate: 21, clickRate: 3.4, conversionRate: 1.8, color: '#94A3B8' },
  { name: 'Standard SMS', openRate: 42, clickRate: 6.2, conversionRate: 3.1, color: '#F59E0B' },
];

export const FAQ_CHATBOT_MOCK_MESSAGES = [
  { sender: 'user', text: 'Hey, I have sensitive acne-prone skin. Will the Centella cleanser cause any breakouts?' },
  { sender: 'bot', text: 'Hi there! 🌿 GlowBot here. Great question! Our Centella Soothing Cleanser is 100% soap-free, non-comedogenic, and fragrance-free. It has 42% Madecassoside and Centella Asiatica extracts that calm redness without clogging pores. We also have a 30-day gentle guarantee! Would you like a 10% coupon code to try it?' },
  { sender: 'user', text: 'Yes please!' },
  { sender: 'bot', text: 'Here is your exclusive code: GLOWCLEAN10 ✨ Tap here to checkout with free shipping: https://glowbotanics.in/cart/cleanser?discount=GLOWCLEAN10' }
];
