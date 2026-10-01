import { useState } from 'react';
import { Calendar, Dumbbell, Activity, Plus } from 'lucide-react';

export default function Training() {
  const [events] = useState([
    { id: 1, type: 'rugby_practice', date: '2026-10-02', title: 'Team Practice' },
    { id: 2, type: 'gym', date: '2026-10-03', title: 'Upper Body Power' },
    { id: 3, type: 'recovery', date: '2026-10-04', title: 'Active Recovery' },
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'gym': return <Dumbbell className="text-lime-500" size={20} />;
      case 'recovery': return <Activity className="text-blue-400" size={20} />;
      default: return <Calendar className="text-orange-400" size={20} />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Rugby & Gym Tracking</h1>
        <button className="flex items-center px-4 py-2 bg-lime-500 text-zinc-950 font-semibold rounded-lg hover:bg-lime-400 transition shadow-lg shadow-lime-500/20">
          <Plus size={18} className="mr-2" /> Schedule
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-zinc-300">Upcoming Schedule</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            {events.map((ev, i) => (
              <div key={ev.id} className={`p-4 flex items-center justify-between ${i !== events.length - 1 ? 'border-b border-zinc-800/50' : ''}`}>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-zinc-950 rounded-lg flex items-center justify-center mr-4">
                    {getIcon(ev.type)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{ev.title}</h4>
                    <span className="text-xs text-zinc-400">{ev.date}</span>
                  </div>
                </div>
                <button className="text-sm font-medium text-lime-500 hover:text-lime-400">View</button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-zinc-300">Quick Log</h2>
          <div className="grid gap-4">
            <button className="flex items-center p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-lime-500/50 transition-colors text-left group">
              <Dumbbell className="text-zinc-500 group-hover:text-lime-400 transition-colors mr-4" size={24} />
              <div>
                <div className="font-semibold text-white">Log Gym Workout</div>
                <div className="text-sm text-zinc-400">Record sets, reps, and weight</div>
              </div>
            </button>
            
            <button className="flex items-center p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-blue-500/50 transition-colors text-left group">
              <Activity className="text-zinc-500 group-hover:text-blue-400 transition-colors mr-4" size={24} />
              <div>
                <div className="font-semibold text-white">Log Body Metrics</div>
                <div className="text-sm text-zinc-400">Weight, sleep, and recovery notes</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
