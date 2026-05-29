import RiskGraphWizard from '../components/risk-graph';

export default function RiskGraphPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Risk Graph Method</h1>
        <p className="text-gray-600 mt-2">
          Determine SIL target using IEC 61511-3 Risk Graph methodology (Annex A)
        </p>
      </div>

      <RiskGraphWizard />
    </div>
  );
}