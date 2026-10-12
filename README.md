# Cheerio Growth Guide — Personalized Feature Discovery Platform
> **Cheerio Product Intern Assignment — Assignment B (Frontend Prototype)**

**Cheerio Growth Guide** is an intelligent, personalized feature-discovery assistant designed specifically for non-technical business owners using Cheerio's omnichannel marketing platform. Built around a fictional D2C clean beauty brand (**GlowBotanics Skincare**), the application guides merchants through high-impact marketing automations with zero technical jargon.

---

## 🌟 Key Features & Product Highlights

### 1. Personalized Feature Recommendations for D2C Skincare
Rather than overwhelming business owners with every tool at once, the Growth Guide analyzes store signals (3,420 dropped checkouts, ₹14.8L unrecovered cart value) and prioritizes:
* **WhatsApp Abandoned Cart Recovery (Primary)**: Recovers ~21.8% of lost skincare sales by sending a personalized WhatsApp message 30 minutes after checkout drop with a dynamic product card and 1-tap checkout link (`GLOW10`).
* **AI Skincare Consultation & FAQ Chatbot**: Resolves 78.4% of customer questions ("Is Centella safe for sensitive skin?", "Where is my parcel?") 24/7 without human staff.
* **Smart VIP Restock & Campaign Segmentation**: Automatically alerts repeat buyers when their serum or moisturizer is running low (~45 days).
* **Post-Delivery Skincare Routine & Photo Review Nudge**: Sends application instructions 3 days after courier delivery and collects 5-star social reviews.

### 2. Multi-Step Interactive Setup Wizard ("Set up now")
Every recommendation launches a distraction-free, 5-step interactive wizard:
1. **Choose a Trigger**: Select event conditions (e.g., *Checkout Abandoned > 30 mins [Recommended]*, *High-Value Cart > ₹2,000*, *Browsed Product 3x*) with configurable wait delays.
2. **Configure Sample Message**: Pick from pre-approved WhatsApp templates, click dynamic variable tokens (`{{first_name}}`, `{{cart_items}}`, `{{discount_code}}`, `{{cart_url}}`), toggle discount coupons, and see updates reflected in a **real-time WhatsApp mobile phone preview**.
3. **Preview the Workflow**: Inspect a visual node-based workflow canvas (*Trigger ➔ Wait Timer ➔ Payment Check ➔ WhatsApp Delivery ➔ Goal Reached*) alongside a plain-English customer journey explanation (Priya's story).
4. **Test the Automation**: Dispatch a simulated test WhatsApp ping to a demo number (`+91 98765 43210`), receive a realistic on-screen mobile notification drop-down, tap it to inspect customer view, and simulate instant customer conversion.
5. **Activation & Pre-Flight Checks**: Complete pre-launch verification checks and click *"Activate WhatsApp Automation Now"*, triggering a celebratory confetti animation and updating the live dashboard.

### 3. Missing WhatsApp Connection Edge Case & 1-Click Recovery
* **Edge Case Handling**: If the Meta WhatsApp Business API is disconnected (can be toggled in the top banner or Settings), Step 5 displays a prominent warning: *"Action Required: WhatsApp Business API Not Connected"*, preventing broken live triggers.
* **Recovery Action**: A prominent *"Connect WhatsApp in 30 Seconds"* action opens an embedded authorization modal with a simulated QR code and Meta Cloud API connect button, restoring the connection and immediately unlocking activation.

### 4. Continuous Guidance & "Next Best Action"
Following successful activation, the dashboard updates the **Growth Readiness Score** (e.g., from 71% to 100%) and displays a prominent **Recommended Next Move banner**:
> *"Pair your cart reminders with: AI Skincare Consultation & FAQ Chatbot so shoppers who reply to your cart reminder get instant ingredient answers in 3 seconds!"*

### 5. Complete, Interactive SaaS Navigation (No Dead Links)
Every sidebar tab is fully functional:
* **Dashboard / Growth Guide**: Hero metrics, recommendations feed, category filters, score meter, and benchmark cards.
* **Campaigns**: Broadcast metrics (13,270 messages, 89.3% open rate), campaign table, and an interactive "New WhatsApp Campaign" scheduler.
* **Automations**: Live workflow manager with instant **Pause / Resume** toggles, trigger rules, and conversion stats.
* **AI Chatbots**: Interactive **GlowBot** skincare assistant playground where you can test prompts like *"Where is my order #GB-8921?"* or *"Can I layer Niacinamide with Vitamin C?"* and get real-time simulated AI answers.
* **Customers & CRM**: Customer lead table synced with Shopify, customer cart values, segment filters (*Cart Abandoned*, *VIP*, *At Risk*), and a 1-click test WhatsApp nudge.
* **Analytics & ROI**: Recharts interactive visualizations comparing Recovered Cart GMV vs Organic Sales, channel performance (WhatsApp vs Email vs SMS), and a 4-step conversion funnel.
* **Settings**: WhatsApp Cloud API status (+91 98201 54321), Shopify sync verifier, team profile, and a 1-click **Reset Demo Data** button.

### 6. Dismissals, Undo & Empty State
* Any recommendation can be dismissed with reason feedback.
* A floating toast alert includes an **Undo** button to restore dismissed items.
* If all recommendations are active or dismissed, a celebratory empty state appears with quick-restore options and a demo reset button.

---

## 🛠️ Tech Stack

* **Framework**: React 19 + TypeScript
* **Bundler**: Vite
* **Styling**: Tailwind CSS (Clean white canvas, subtle slate borders, rounded cards, Cheerio emerald green accents)
* **Icons**: Lucide React
* **Data Visualization**: Recharts (Responsive AreaChart & BarChart)
* **Animation & Celebration**: Canvas Confetti
* **State Management**: Local React Context (`AppContext`) with `localStorage` persistence

---

## 🚀 Getting Started Locally

### Prerequisites
* [Node.js](https://nodejs.org/) v18.0.0 or higher
* npm v9.0.0 or higher

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd "cheerio ai product"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:5173](http://localhost:5173).

---

## 🧪 Testing Checklist & Demo Flow

To evaluate all requirements of the assignment:

1. **Verify Dashboard Aesthetics**:
   * Inspect the clean white background, subtle slate borders, and Cheerio emerald accent colors.
   * Review the D2C Skincare metrics for **GlowBotanics** (3,420 unrecovered carts, 71.4% drop-off rate).
2. **Execute the Setup Wizard**:
   * Click **"Set up now"** on the *WhatsApp Abandoned Cart Recovery* card.
   * Advance through Step 1 (Trigger), Step 2 (Message customization & phone preview), Step 3 (Visual workflow nodes), Step 4 (Dispatch test message & click notification), and Step 5 (Pre-flight checks).
   * Click **"Activate WhatsApp Automation Now"** to see confetti, toast notification, and score boost.
3. **Inspect the Next Best Action**:
   * Notice the *"Recommended Next Move: Pair your cart reminders with AI Skincare Chatbot"* banner at the top of the dashboard.
4. **Test the Disconnected WhatsApp Edge Case**:
   * In the top dark banner, click **"Simulate WhatsApp Disconnected (Edge Case)"**.
   * Open the wizard on another recommendation (e.g., AI Chatbot).
   * Proceed to Step 5: observe the amber warning box and disabled activate button.
   * Click **"Connect WhatsApp in 30 Seconds"** and authorize the connection to recover.
5. **Explore Sidebar Tabs**:
   * Click **AI Chatbots** and test the live skincare chat.
   * Click **Analytics & ROI** to inspect the Recharts graph and funnel.
   * Click **Automations** to test pausing and resuming live workflows.
   * Click **Customers & CRM** to view cart dropouts and trigger a WhatsApp nudge.
6. **Reset Prototype**:
   * Click **"Reset Demo"** in the top banner or Settings to return to the original starting baseline anytime.

---

## 📦 Building for Production & Deployment

To create an optimized production build:
```bash
npm run build
```
The bundled assets will be generated in the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

### Deploying to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Accept default build settings (Framework: Vite, Build command: `npm run build`, Output directory: `dist`).

### Deploying to Netlify
1. Drag and drop the `dist/` folder into Netlify Drop, or connect your Git repository.
2. Build command: `npm run build`
3. Publish directory: `dist`

---

## 💡 Product Thinking & Design Rationale

* **Why focus on D2C Skincare?**
  Skincare purchases are sensory and emotional. Shoppers hesitate on ingredient compatibility (e.g., *"Will this oil cause breakouts?"*), leading to high cart abandonment (71%+). WhatsApp bridges this gap with 94%+ read rates and conversational trust.
* **Why progressive disclosure?**
  Non-technical business owners are easily overwhelmed by multi-condition branching. By presenting a simple 5-step wizard that handles Shopify webhooks and Meta templates under the hood, merchants gain confidence without needing a developer.
* **Why 30-minute delays?**
  Industry data shows sending abandoned cart messages immediately feels invasive, while waiting longer than 2 hours leads to lost interest. A 30-minute delay hits the optimal recovery window.
* **Transparency about Sample Data**:
  The prototype features prominent indicators making it clear that all customer actions and WhatsApp dispatches are running in a safe simulation mode, preventing any confusion with real Meta billing or live customer contacts.
