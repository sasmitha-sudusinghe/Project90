import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Clock, Dumbbell, CheckSquare, BarChart, Menu, X, Database } from 'lucide-react';
import Subjects from './pages/Subjects';
import StudyTimer from './pages/StudyTimer';
import Training from './pages/Training';
import Habits from './pages/Habits';
import Review from './pages/Review';
import DataExport from './pages/DataExport';

function Sidebar({ mobileOpen, setMobileOpen }: { mobileOpen: boolean, setMobileOpen: (open: boolean) => void }) {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Subjects', path: '/subjects', icon: <BookOpen size={20} /> },
    { name: 'Study Timer', path: '/timer', icon: <Clock size={20} /> },
    { name: 'Training', path: '/training', icon: <Dumbbell size={20} /> },
    { name: 'Habits', path: '/habits', icon: <CheckSquare size={20} /> },
    { name: 'Weekly Review', path: '/review', icon: <BarChart size={20} /> },
    { name: 'Data Backup', path: '/backup', icon: <Database size={20} /> },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:h-screen
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-zinc-800">
          <span className="text-xl font-bold tracking-wider text-lime-400">PROJECT 90</span>
          <button className="md:hidden text-zinc-400 hover:text-white" onClick={() => setMobileOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-zinc-800 text-lime-400'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
                }`
              }
              onClick={() => setMobileOpen(false)}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

function Dashboard() {
  const stats = [
    { label: 'Days Remaining', value: '89' },
    { label: 'Study Hours', value: '12h 45m' },
    { label: 'Gym Sessions', value: '4' },
    { label: 'Habit Score', value: '92%' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-lime-500/30 transition-colors">
            <h3 className="text-sm font-medium text-zinc-400">{stat.label}</h3>
            <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Router>
      <div className="flex min-h-screen bg-zinc-950 text-slate-50">
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        
        <div className="flex-1 flex flex-col min-w-0">
          <header className="flex items-center h-16 px-4 md:hidden border-b border-zinc-800 bg-zinc-900">
            <button 
              className="p-2 -mr-2 text-zinc-400 hover:text-white"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={24} />
            </button>
            <span className="ml-4 text-lg font-bold tracking-wider text-lime-400">PROJECT 90</span>
          </header>

          <main className="flex-1 p-6 md:p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/subjects" element={<Subjects />} />
                <Route path="/timer" element={<StudyTimer />} />
                <Route path="/training" element={<Training />} />
                <Route path="/habits" element={<Habits />} />
                <Route path="/review" element={<Review />} />
                <Route path="/backup" element={<DataExport />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}
