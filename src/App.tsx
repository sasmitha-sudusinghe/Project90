import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Clock, Dumbbell, CheckSquare, BarChart, Menu, X, Database, Edit2 } from 'lucide-react';
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
  const [targetDate, setTargetDate] = useState(() => localStorage.getItem('p90_targetDate') || '2026-12-31');
  const [studyHours, setStudyHours] = useState(() => localStorage.getItem('p90_studyHours') || '12h 45m');
  const [gymSessions, setGymSessions] = useState(() => localStorage.getItem('p90_gymSessions') || '4');
  const [habitScore, setHabitScore] = useState(() => localStorage.getItem('p90_habitScore') || '92%');

  useEffect(() => { localStorage.setItem('p90_targetDate', targetDate); }, [targetDate]);
  useEffect(() => { localStorage.setItem('p90_studyHours', studyHours); }, [studyHours]);
  useEffect(() => { localStorage.setItem('p90_gymSessions', gymSessions); }, [gymSessions]);
  useEffect(() => { localStorage.setItem('p90_habitScore', habitScore); }, [habitScore]);

  const calculateDaysRemaining = () => {
    const target = new Date(targetDate);
    const diffTime = target.getTime() - new Date().getTime();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const dashboardStats = [
    { 
      id: 'days', 
      label: 'Days Remaining', 
      value: calculateDaysRemaining().toString(),
      icon: <Clock className="text-blue-400" size={24} />,
      onClick: () => {
        const newDate = prompt('Enter target date for countdown (YYYY-MM-DD):', targetDate);
        if (newDate && !isNaN(new Date(newDate).getTime())) setTargetDate(newDate);
      }
    },
    { 
      id: 'study', 
      label: 'Study Hours', 
      value: studyHours,
      icon: <BookOpen className="text-lime-400" size={24} />,
      onClick: () => {
        const newVal = prompt('Enter study hours:', studyHours);
        if (newVal !== null) setStudyHours(newVal);
      }
    },
    { 
      id: 'gym', 
      label: 'Gym Sessions', 
      value: gymSessions,
      icon: <Dumbbell className="text-orange-400" size={24} />,
      onClick: () => {
        const newVal = prompt('Enter gym sessions:', gymSessions);
        if (newVal !== null) setGymSessions(newVal);
      }
    },
    { 
      id: 'habit', 
      label: 'Habit Score', 
      value: habitScore,
      icon: <BarChart className="text-purple-400" size={24} />,
      onClick: () => {
        const newVal = prompt('Enter habit score:', habitScore);
        if (newVal !== null) setHabitScore(newVal);
      }
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back!</h1>
        <p className="text-zinc-400">Here's your Project 90 overview for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
          <div key={stat.id} className="relative p-6 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 rounded-2xl hover:border-lime-500/30 hover:bg-zinc-900 transition-all group overflow-hidden shadow-lg shadow-black/20">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
               {stat.icon}
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 shadow-inner">
                {stat.icon}
              </div>
            </div>
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">{stat.label}</h3>
            <p className="mt-1 text-4xl font-black text-white tracking-tight">{stat.value}</p>
            <button 
              onClick={stat.onClick}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all bg-zinc-800 hover:bg-zinc-700 p-2 rounded-lg"
              title={`Edit ${stat.label}`}
            >
              <Edit2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Additional Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Focus */}
        <div className="lg:col-span-2 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/50 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white flex items-center">
              <CheckSquare className="text-lime-500 mr-3" size={24} />
              Today's Focus
            </h2>
            <span className="px-3 py-1 bg-lime-500/10 text-lime-400 text-xs font-bold rounded-full border border-lime-500/20">MUST DO</span>
          </div>
          
          <div className="space-y-5">
            {[
              { title: 'Complete Study Block 1 (Theory)', subject: 'Computer Security', time: '60 min' },
              { title: 'Practical / Problem Solving', subject: 'KBS', time: '60 min' },
              { title: 'Planned Gym Session', subject: 'Upper Body Power', time: '45 min' }
            ].map((task, i) => (
              <div key={i} className="flex items-center p-4 bg-zinc-950/50 border border-zinc-800/50 rounded-xl hover:border-zinc-700 transition-colors group cursor-pointer">
                <div className="w-6 h-6 rounded-md border-2 border-zinc-700 group-hover:border-lime-500 mr-4 flex-shrink-0 transition-colors" />
                <div className="flex-1">
                  <h4 className="text-white font-medium">{task.title}</h4>
                  <p className="text-zinc-500 text-sm mt-0.5">{task.subject}</p>
                </div>
                <div className="text-sm font-semibold text-zinc-600 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                  {task.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="bg-zinc-900 border border-zinc-800/50 rounded-2xl p-8 shadow-xl flex flex-col">
          <h2 className="text-xl font-bold text-white mb-8 flex items-center">
            <BarChart className="text-blue-500 mr-3" size={24} />
            Weekly Progress
          </h2>
          
          <div className="flex-1 space-y-8">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-400 font-medium">Study Blocks</span>
                <span className="text-lime-400 font-bold">8 / 12</span>
              </div>
              <div className="w-full bg-zinc-950 h-3 rounded-full overflow-hidden border border-zinc-800">
                <div className="bg-lime-500 h-full rounded-full" style={{ width: '66%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-400 font-medium">Gym Sessions</span>
                <span className="text-blue-400 font-bold">2 / 3</span>
              </div>
              <div className="w-full bg-zinc-950 h-3 rounded-full overflow-hidden border border-zinc-800">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '66%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-400 font-medium">Habit Consistency</span>
                <span className="text-purple-400 font-bold">92%</span>
              </div>
              <div className="w-full bg-zinc-950 h-3 rounded-full overflow-hidden border border-zinc-800">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: '92%' }} />
              </div>
            </div>
          </div>
          
          <button className="w-full py-3 mt-8 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 font-semibold rounded-xl border border-zinc-800 transition-colors">
            View Full Report
          </button>
        </div>
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
