import React, { useState } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Check, 
  HelpCircle 
} from 'lucide-react';
import { WizardDraftConfig, Recommendation } from '../../types/growth';
import { useApp } from '../../context/AppContext';
import { Step1ChooseTrigger } from './Step1ChooseTrigger';
import { Step2ConfigureMessage } from './Step2ConfigureMessage';
import { Step3PreviewWorkflow } from './Step3PreviewWorkflow';
import { Step4TestAutomation } from './Step4TestAutomation';
import { Step5Activation } from './Step5Activation';

interface SetupWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  recommendation: Recommendation | null;
}

export const SetupWizardModal: React.FC<SetupWizardModalProps> = ({
  isOpen,
  onClose,
  recommendation,
}) => {
  const { activateWorkflow } = useApp();
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Initialize draft configuration based on the chosen recommendation
  const [config, setConfig] = useState<WizardDraftConfig>({
    triggerId: 'checkout_abandoned',
    triggerDelay: '30 mins',
    triggerCondition: 'Checkout Abandoned > 30 mins',
    messageTemplate: 'template_gentle',
    messageText: 'Hey {{first_name}}! 🌿 We saved the {{cart_items}} you were looking at for your daily skincare routine.\n\nYour cart is reserved for the next 24 hours. Tap below to finish your order whenever you are ready! ✨',
    includeDiscount: true,
    discountCode: 'GLOW10',
    discountPercent: 10,
    ctaButtonText: 'Complete My Order 🛍️',
    ctaButtonUrl: 'https://glowbotanics.in/checkout',
    testPhoneNumber: '+91 98765 43210',
    testStatus: 'idle',
    testResponseReceived: false,
  });

  if (!isOpen || !recommendation) return null;

  const updateConfig = (updates: Partial<WizardDraftConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const steps = [
    { number: 1, label: 'Trigger' },
    { number: 2, label: 'Message' },
    { number: 3, label: 'Workflow' },
    { number: 4, label: 'Test' },
    { number: 5, label: 'Activate' },
  ];

  const handleNext = () => {
    // Validation for Step 2
    if (currentStep === 2 && !config.messageText.trim()) {
      alert('Please enter a message before continuing.');
      return;
    }
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleCompleteActivation = () => {
    activateWorkflow(recommendation.id, config);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-5xl w-full border border-slate-200 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-scaleUp">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
              <Sparkles className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                  Interactive Setup: {recommendation.title}
                </h2>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Step {currentStep} of 5
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                GlowBotanics Skincare • Guided 3-minute launch wizard
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close setup wizard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200/80 shrink-0">
          <div className="flex items-center justify-between max-w-2xl mx-auto relative">
            {/* Background progress track */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-slate-200 z-0" />
            <div 
              className="absolute top-1/2 left-0 -translate-y-1/2 h-0.5 bg-emerald-600 z-0 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />

            {steps.map((s) => {
              const isPassed = currentStep > s.number;
              const isCurrent = currentStep === s.number;

              return (
                <div 
                  key={s.number} 
                  className="flex flex-col items-center relative z-10 cursor-pointer"
                  onClick={() => {
                    // allow jumping back to previous steps
                    if (s.number < currentStep) setCurrentStep(s.number);
                  }}
                >
                  <div className={`
                    w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
                    ${isPassed 
                      ? 'bg-emerald-600 text-white' 
                      : isCurrent 
                        ? 'bg-white border-2 border-emerald-600 text-emerald-700 shadow-sm ring-4 ring-emerald-100' 
                        : 'bg-white border border-slate-300 text-slate-400'
                    }
                  `}>
                    {isPassed ? <Check className="w-3.5 h-3.5" /> : s.number}
                  </div>
                  <span className={`text-[10px] font-semibold mt-1 hidden sm:block ${
                    isCurrent ? 'text-emerald-800' : 'text-slate-500'
                  }`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wizard Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {currentStep === 1 && (
            <Step1ChooseTrigger config={config} updateConfig={updateConfig} />
          )}
          {currentStep === 2 && (
            <Step2ConfigureMessage config={config} updateConfig={updateConfig} />
          )}
          {currentStep === 3 && (
            <Step3PreviewWorkflow config={config} />
          )}
          {currentStep === 4 && (
            <Step4TestAutomation config={config} updateConfig={updateConfig} />
          )}
          {currentStep === 5 && (
            <Step5Activation 
              config={config} 
              recommendation={recommendation} 
              onActivate={handleCompleteActivation} 
            />
          )}
        </div>

        {/* Wizard Footer Controls */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={handleBack}
            className={`
              inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all
              ${currentStep === 1 
                ? 'text-slate-300 cursor-not-allowed' 
                : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 shadow-2xs'
              }
            `}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="text-[11px] text-slate-400 hidden sm:block">
            Step {currentStep} of 5 • Cheerio Growth Guide
          </div>

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-xs font-semibold text-slate-400">
              Ready to launch in review step
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
