import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { PrototypeBanner } from './components/layout/PrototypeBanner';
import { ToastContainer } from './components/ui/Toast';
import { SetupWizardModal } from './components/wizard/SetupWizardModal';

// Views
import { DashboardView } from './components/views/DashboardView';
import { CampaignsView } from './components/views/CampaignsView';
import { AutomationsView } from './components/views/AutomationsView';
import { ChatbotsView } from './components/views/ChatbotsView';
import { CrmView } from './components/views/CrmView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { SettingsView } from './components/views/SettingsView';

const AppContent: React.FC = () => {
  const { currentTab, wizardOpen, closeWizard, selectedRecommendation } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const renderActiveView = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardView searchQuery={searchQuery} />;
      case 'campaigns':
        return <CampaignsView />;
      case 'automations':
        return <AutomationsView />;
      case 'chatbots':
        return <ChatbotsView />;
      case 'crm':
        return <CrmView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView searchQuery={searchQuery} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Prototype & Edge Case Banner */}
      <PrototypeBanner />

      <div className="flex-1 flex">
        {/* Navigation Sidebar */}
        <Sidebar
          mobileOpen={mobileMenuOpen}
          setMobileOpen={setMobileMenuOpen}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
          <Header
            onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {renderActiveView()}
          </main>
        </div>
      </div>

      {/* Global Interactive Setup Wizard Modal */}
      <SetupWizardModal
        isOpen={wizardOpen}
        onClose={closeWizard}
        recommendation={selectedRecommendation}
      />

      {/* Toast Notification Stack with Undo Action */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
