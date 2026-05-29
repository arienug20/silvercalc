interface FrequencySelectorProps {
  selected: string | null;
  mode: 'A' | 'B';
  onModeChange: (mode: 'A' | 'B') => void;
  onSelect: (level: string) => void;
}

export default function FrequencySelector({ selected, mode, onModeChange, onSelect }: FrequencySelectorProps) {
  const frequenciesModeA = [
    { level: 'F1', label: 'Rare', description: '<10% time in hazardous zone' },
    { level: 'F2', label: 'Frequent', description: '10-100% time in hazardous zone' },
  ];

  const frequenciesModeB = [
    { level: 'F1', label: 'Rare', description: '<10% time in hazardous zone' },
    { level: 'F2', label: 'Frequent', description: '10-100% time in hazardous zone' },
    { level: 'F3', label: 'Continuous', description: 'Routine operation in hazardous zone' },
  ];

  const frequencies = mode === 'A' ? frequenciesModeA : frequenciesModeB;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 2: Frequency & Exposure</h2>
        <p className="text-gray-600">Select the frequency of exposure to the hazard</p>
      </div>

      {/* Mode Toggle */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Frequency Mode</span>
          <div className="flex gap-2">
            <button
              onClick={() => onModeChange('A')}
              className={`
                px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                ${mode === 'A'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }
              `}
            >
              Mode A (2-level)
            </button>
            <button
              onClick={() => onModeChange('B')}
              className={`
                px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                ${mode === 'B'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }
              `}
            >
              Mode B (3-level)
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Mode A: F1 (rare) and F2 (frequent) only | Mode B: F1, F2, and F3 (continuous)
        </p>
      </div>

      {/* Frequency Cards */}
      <div className="grid grid-cols-1 gap-4">
        {frequencies.map((item) => (
          <button
            key={item.level}
            onClick={() => onSelect(item.level)}
            className={`
              p-6 rounded-lg border-2 transition-all text-left
              ${selected === item.level
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-offset-2'
                : 'border-gray-200 bg-white hover:border-blue-300'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-lg text-gray-900">{item.level}</span>
                  <span className="font-semibold text-gray-900">{item.label}</span>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>Selected:</strong> {frequencies.find(f => f.level === selected)?.description}
          </p>
        </div>
      )}
    </div>
  );
}