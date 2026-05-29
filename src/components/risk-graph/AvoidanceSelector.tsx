interface AvoidanceSelectorProps {
  selected: string | null;
  onSelect: (level: string) => void;
}

export default function AvoidanceSelector({ selected, onSelect }: AvoidanceSelectorProps) {
  const avoidances = [
    {
      level: 'P1',
      label: 'Possible',
      description: 'Operator can identify and avoid the hazard',
      details: 'Warning time >1 hour or operator has opportunity to take action',
      icon: '🛡️',
    },
    {
      level: 'P2',
      label: 'Not Possible',
      description: 'Operator cannot avoid the hazard',
      details: 'Hazard occurs too quickly, or operators are not present/remote',
      icon: '⚠️',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 3: Possibility of Avoidance</h2>
        <p className="text-gray-600">Can the operator avoid the hazard?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {avoidances.map((item) => (
          <button
            key={item.level}
            onClick={() => onSelect(item.level)}
            className={`
              p-6 rounded-lg border-2 transition-all text-left h-full
              ${selected === item.level
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-offset-2'
                : 'border-gray-200 bg-white hover:border-blue-300'
              }
            `}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-bold text-lg text-gray-900">{item.level}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{item.label}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900">{item.description}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{item.details}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>Selected:</strong> {avoidances.find(a => a.level === selected)?.description}
          </p>
        </div>
      )}
    </div>
  );
}