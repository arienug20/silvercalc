interface ConsequenceSelectorProps {
  selected: string | null;
  onSelect: (level: string) => void;
}

export default function ConsequenceSelector({ selected, onSelect }: ConsequenceSelectorProps) {
  const consequences = [
    { level: 'C1', label: 'Minor', description: 'Minor injury, first aid only', severity: 'green' },
    { level: 'C2', label: 'Serious', description: 'Serious injury (0.01-0.1 fatality)', severity: 'yellow' },
    { level: 'C3', label: 'Extensive', description: '1-10 fatalities, major damage', severity: 'orange' },
    { level: 'C4', label: 'Catastrophic', description: '>10 fatalities, catastrophic damage', severity: 'red' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'green':
        return 'bg-green-50 border-green-200 hover:border-green-400';
      case 'yellow':
        return 'bg-yellow-50 border-yellow-200 hover:border-yellow-400';
      case 'orange':
        return 'bg-orange-50 border-orange-200 hover:border-orange-400';
      case 'red':
        return 'bg-red-50 border-red-200 hover:border-red-400';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'green':
        return '🟢';
      case 'yellow':
        return '🟡';
      case 'orange':
        return '🟠';
      case 'red':
        return '🔴';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 1: Consequence</h2>
        <p className="text-gray-600">Select the severity of potential consequence</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {consequences.map((item) => (
          <button
            key={item.level}
            onClick={() => onSelect(item.level)}
            className={`
              p-6 rounded-lg border-2 transition-all text-left
              ${selected === item.level
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-offset-2'
                : getSeverityColor(item.severity)
              }
            `}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{getSeverityIcon(item.severity)}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-lg text-gray-900">{item.level}</span>
                  <span className="font-semibold text-gray-900">{item.label}</span>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>Selected:</strong> {consequences.find(c => c.level === selected)?.description}
          </p>
        </div>
      )}
    </div>
  );
}