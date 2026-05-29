interface DemandRateSelectorProps {
  selected: string | null;
  onSelect: (level: string) => void;
}

export default function DemandRateSelector({ selected, onSelect }: DemandRateSelectorProps) {
  const demandRates = [
    {
      level: 'W1',
      label: 'Very Low',
      range: '< 0.1 per year',
      description: 'Hazard demands occur less than once every 10 years',
      frequency: 'Once per decade',
      icon: '📉',
      color: 'green',
    },
    {
      level: 'W2',
      label: 'Low',
      range: '0.1 - 1 per year',
      description: 'Hazard demands occur between once every 10 years to once per year',
      frequency: 'Every few years',
      icon: '📊',
      color: 'yellow',
    },
    {
      level: 'W3',
      label: 'High',
      range: '> 1 per year',
      description: 'Hazard demands occur more than once per year',
      frequency: 'Multiple times per year',
      icon: '📈',
      color: 'orange',
    },
  ];

  const getColorClass = (color: string, isSelected: boolean) => {
    if (isSelected) return 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-offset-2';

    switch (color) {
      case 'green':
        return 'border-green-200 bg-green-50 hover:border-green-400';
      case 'yellow':
        return 'border-yellow-200 bg-yellow-50 hover:border-yellow-400';
      case 'orange':
        return 'border-orange-200 bg-orange-50 hover:border-orange-400';
      default:
        return 'border-gray-200 bg-white hover:border-blue-300';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 4: Demand Rate</h2>
        <p className="text-gray-600">How frequently does the hazardous event demand occur?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {demandRates.map((item) => (
          <button
            key={item.level}
            onClick={() => onSelect(item.level)}
            className={`
              p-5 rounded-lg border-2 transition-all text-left
              ${getColorClass(item.color, selected === item.level)}
            `}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{item.icon}</span>
                <span className="font-bold text-gray-900">{item.level}</span>
              </div>

              <div>
                <span className="font-semibold text-gray-900 block">{item.label}</span>
                <span className="text-xs text-gray-600 block mt-1">{item.range}</span>
              </div>

              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-700 leading-snug">{item.description}</p>
                <p className="text-xs text-gray-500 mt-1">{item.frequency}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>Selected:</strong> {demandRates.find(d => d.level === selected)?.description}
          </p>
        </div>
      )}
    </div>
  );
}