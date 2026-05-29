export default function PfdPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">PFDavg Calculator</h1>
        <p className="text-gray-600 mt-2">
          Calculate Probability of Failure on Demand for various architectures
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">PFDavg Calculation</h3>
          <p className="mt-1 text-sm text-gray-500">
            Input failure rates and architecture to calculate PFDavg
          </p>
          <div className="mt-6">
            <p className="text-sm text-gray-600">
              Coming soon: 1oo1, 1oo2, 2oo2, 2oo3, MooN architectures
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}