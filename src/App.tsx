import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { LayoutDashboard, Network, Table, Calculator, CheckCircle, FileText, Settings } from 'lucide-react';

// Pages
import DashboardPage from './pages/DashboardPage';
import RiskGraphPage from './pages/RiskGraphPage';
import LopaPage from './pages/LopaPage';
import PfdPage from './pages/PfdPage';
import VerificationPage from './pages/VerificationPage';
import ReportPage from './pages/ReportPage';
import SettingsPage from './pages/SettingsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'risk-graph', element: <RiskGraphPage /> },
      { path: 'lopa', element: <LopaPage /> },
      { path: 'pfd', element: <PfdPage /> },
      { path: 'verification', element: <VerificationPage /> },
      { path: 'report', element: <ReportPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);

const navItems = [
  { path: '/risk-graph', label: 'Risk Graph', icon: Network },
  { path: '/lopa', label: 'LOPA', icon: Table },
  { path: '/pfd', label: 'PFD Calculator', icon: Calculator },
  { path: '/verification', label: 'Verification', icon: CheckCircle },
  { path: '/report', label: 'Report', icon: FileText },
  { path: 'settings', label: 'Settings', icon: Settings },
];

function AppLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">SILverCalc</h1>
          <p className="text-sm text-gray-600 mt-1">SIL Calculator</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-gray-100 text-gray-700 hover:text-gray-900"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="p-4">
          <a
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-gray-100 text-gray-700 hover:text-gray-900"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;