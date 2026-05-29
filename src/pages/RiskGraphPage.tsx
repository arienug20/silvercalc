export default function RiskGraphPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Risk Graph Method</h1>
        <p className="text-gray-600 mt-2">
          Determine SIL target using IEC 61511-3 Risk Graph methodology
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Risk Graph Wizard</h3>
          <p className="mt-1 text-sm text-gray-500">
            Step through the 4-factor assessment to determine SIL target
          </p>
          <div className="mt-6">
            <p className="text-sm text-gray-600">
              Coming soon: Select consequence, frequency, avoidance, and demand rate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}