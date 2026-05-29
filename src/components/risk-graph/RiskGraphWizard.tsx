import { useState } from 'react';
import { ChevronLeft, ChevronRight, Save, RotateCcw, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import ConsequenceSelector from './ConsequenceSelector';
import FrequencySelector from './FrequencySelector';
import AvoidanceSelector from './AvoidanceSelector';
import DemandRateSelector from './DemandRateSelector';
import { calculateRiskGraph } from '../../core/risk-graph';
import type { RiskGraphInput } from '../../core/risk-graph';

export default function RiskGraphWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [consequence, setConsequence] = useState<'C1' | 'C2' | 'C3' | 'C4' | null>(null);
  const [frequency, setFrequency] = useState<'F1' | 'F2' | 'F3' | null>(null);
  const [mode, setMode] = useState<'A' | 'B'>('B');
  const [avoidance, setAvoidance] = useState<'P1' | 'P2' | null>(null);
  const [demandRate, setDemandRate] = useState<'W1' | 'W2' | 'W3' | null>(null);
  const [scenarioName, setScenarioName] = useState('');
  const [saved, setSaved] = useState(false);

  const steps = [
    { number: 1, title: 'Consequence', completed: consequence !== null },
    { number: 2, title: 'Frequency', completed: frequency !== null },
    { number: 3, title: 'Avoidance', completed: avoidance !== null },
    { number: 4, title: 'Demand Rate', completed: demandRate !== null },
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return consequence !== null;
      case 2:
        return frequency !== null;
      case 3:
        return avoidance !== null;
      case 4:
        return demandRate !== null;
      default:
        return false;
    }
  };

  const calculateResult = () => {
    if (!consequence || !frequency || !avoidance || !demandRate) {
      return null;
    }

    const input: RiskGraphInput = {
      consequence,
      frequency,
      avoidance,
      demandRate,
      mode,
    };

    return calculateRiskGraph(input);
  };

  const result = calculateResult();

  const handleSave = async () => {
    if (!result || !scenarioName) {
      alert('Please enter a scenario name');
      return;
    }

    // TODO: Save to IndexedDB
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setConsequence(null);
    setFrequency(null);
    setAvoidance(null);
    setDemandRate(null);
    setCurrentStep(1);
    setScenarioName('');
    setSaved(false);
  };

  const getResultIcon = () => {
    if (!result) return null;

    if (result.silTarget === 'intolerable') {
      return <XCircle className="w-16 h-16 text-red-600" />;
    } else if (result.silTarget === 'none') {
      return <CheckCircle className="w-16 h-16 text-green-600" />;
    } else {
      return <AlertTriangle className="w-16 h-16 text-orange-600" />;
    }
  };

  const getResultColor = () => {
    if (!result) return '';

    if (result.silTarget === 'intolerable') {
      return 'bg-red-50 border-red-200';
    } else if (result.silTarget === 'none') {
      return 'bg-green-50 border-green-200';
    } else {
      return 'bg-orange-50 border-orange-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Progress Steps */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex-1">
              <div className="flex items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold
                    ${currentStep === step.number
                      ? 'bg-blue-600 text-white'
                      : step.completed
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                    }
                  `}
                >
                  {step.completed ? '✓' : step.number}
                </div>
                <span
                  className={`
                    ml-3 font-medium
                    ${currentStep === step.number ? 'text-blue-600' : 'text-gray-600'}
                  `}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`
                    mt-2 ml-5 h-0.5
                    ${step.completed ? 'bg-green-600' : 'bg-gray-200'}
                  `}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Wizard Content */}
      <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
        {currentStep === 1 && (
          <ConsequenceSelector
            selected={consequence}
            onSelect={(level) => setConsequence(level as any)}
          />
        )}

        {currentStep === 2 && (
          <FrequencySelector
            selected={frequency}
            mode={mode}
            onModeChange={setMode}
            onSelect={(level) => setFrequency(level as any)}
          />
        )}

        {currentStep === 3 && (
          <AvoidanceSelector
            selected={avoidance}
            onSelect={(level) => setAvoidance(level as any)}
          />
        )}

        {currentStep === 4 && (
          <DemandRateSelector
            selected={demandRate}
            onSelect={(level) => setDemandRate(level as any)}
          />
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
            disabled={!canProceed()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === 4 ? 'View Results' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Results Panel */}
      {currentStep === 5 && result && (
        <div className={`bg-white rounded-lg shadow-sm p-8 border-2 ${getResultColor()}`}>
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">{getResultIcon()}</div>

            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {typeof result.silTarget === 'number' && `SIL ${result.silTarget} Required`}
                  {result.silTarget === 'none' && 'No SIL Required'}
                  {result.silTarget === 'intolerable' && 'Risk Intolerable'}
                </h3>
                <p className="text-gray-600 mt-1">{result.description}</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Assessment Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Consequence</span>
                    <p className="font-semibold">{consequence}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Frequency</span>
                    <p className="font-semibold">{frequency} (Mode {mode})</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Avoidance</span>
                    <p className="font-semibold">{avoidance}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Demand Rate</span>
                    <p className="font-semibold">{demandRate}</p>
                  </div>
                </div>
              </div>

              {/* Scenario Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Scenario Name
                </label>
                <input
                  type="text"
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
                  placeholder="e.g., High Pressure Separator Overpressure"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={!scenarioName || saved}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  {saved ? 'Saved!' : 'Save Scenario'}
                </button>

                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  <RotateCcw className="w-4 h-4" />
                  Start New Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}