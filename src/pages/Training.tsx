import { useState, useEffect } from 'react';
import { Calendar, Dumbbell, Activity, Plus, Trash2 } from 'lucide-react';

type TrainingEvent = {
  id: number;
  type: string;
  date: string;
  title: string;
};

export default function Training() {
  const [events, setEvents] = useState<TrainingEvent[]>(() => {
    const saved = localStorage.getItem('p90_trainingEvents');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [
      { id: 1, type: 'rugby_practice', date: '2026-10-02', title: 'Team Practice' },
      { id: 2, type: 'gym', date: '2026-10-03', title: 'Upper Body Power' },
      { id: 3, type: 'recovery', date: '2026-10-04', title: 'Active Recovery' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('p90_trainingEvents', JSON.stringify(events));
  }, [events]);

  const addEvent = () => {
    const title = window.prompt('Enter event title (e.g. Leg Day):');
    if (!title) return;
    const typeStr = window.prompt('Enter type (gym/recovery/rugby_practice):', 'gym');
    
    const newEvent = {
      id: Date.now(),
      type: typeStr || 'gym',
      date: new Date().toISOString().split('T')[0],
      title: title
    };
    setEvents([...events, newEvent]);
  };

  const removeEvent = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
  };

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
        <button onClick={addEvent} className="flex items-center px-4 py-2 bg-lime-500 text-zinc-950 font-semibold rounded-lg hover:bg-lime-400 transition shadow-lg shadow-lime-500/20">
          <Plus size={18} className="mr-2" /> Schedule
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-zinc-300">Upcoming Schedule</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            {events.length === 0 ? (
              <div className="p-6 text-center text-zinc-500">No upcoming events. Click Schedule to add one.</div>
            ) : (
              events.map((ev, i) => (
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
                  <div className="flex items-center space-x-4">
                    <button onClick={() => alert('Viewing Details')} className="text-sm font-medium text-lime-500 hover:text-lime-400">View</button>
                    <button onClick={() => removeEvent(ev.id)} className="text-zinc-500 hover:text-red-500 transition-colors" title="Remove event">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-zinc-300">Quick Log</h2>
          <div className="grid gap-4">
            <button onClick={() => {
              const newEvent = {
                id: Date.now(),
                type: 'gym',
                date: new Date().toISOString().split('T')[0],
                title: 'Gym Workout'
              };
              setEvents([...events, newEvent]);
            }} className="flex items-center p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-lime-500/50 transition-colors text-left group">
              <Dumbbell className="text-zinc-500 group-hover:text-lime-400 transition-colors mr-4" size={24} />
              <div>
                <div className="font-semibold text-white">Log Gym Workout</div>
                <div className="text-sm text-zinc-400">Record sets, reps, and weight</div>
              </div>
            </button>
            
            <button onClick={() => {
              const newEvent = {
                id: Date.now(),
                type: 'recovery',
                date: new Date().toISOString().split('T')[0],
                title: 'Recovery & Metrics'
              };
              setEvents([...events, newEvent]);
            }} className="flex items-center p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-blue-500/50 transition-colors text-left group">
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
