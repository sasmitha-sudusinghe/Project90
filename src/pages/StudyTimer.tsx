import { useState, useEffect } from 'react';
import { Play, Pause, Square } from 'lucide-react';

export default function StudyTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [subjects, setSubjects] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('p90_subjects');
    if (saved) {
      try {
        setSubjects(JSON.parse(saved));
      } catch (e) {}
    } else {
      setSubjects([
        { id: 1, name: 'KBS (Knowledge Based Systems)', code: 'KBS' },
        { id: 2, name: 'Computer Security', code: 'SEC' },
        { id: 3, name: 'Mobile Communication', code: 'MOB' },
        { id: 4, name: 'Digital Image Processing', code: 'DIP' },
        { id: 5, name: 'Software Quality Assurance', code: 'SQA' },
        { id: 6, name: 'Group Project', code: 'PRJ' }
      ]);
    }
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="space-y-6 max-w-2xl mx-auto text-center py-8">
      <h1 className="text-3xl font-bold text-white mb-8 tracking-tight">Focus Session</h1>
      
      <div className="bg-zinc-900 border border-zinc-800/50 rounded-[2rem] p-12 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-lime-500/5 blur-3xl rounded-full transition-opacity opacity-50 group-hover:opacity-100"></div>
        <div className="relative z-10">
          <div className="text-8xl md:text-[8rem] font-black text-white tracking-tighter mb-12 tabular-nums">
            {String(minutes).padStart(2, '0')}<span className="text-zinc-600">:</span>{String(seconds).padStart(2, '0')}
          </div>
          
          <div className="flex justify-center gap-6">
            <button 
              onClick={toggle}
              className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all shadow-lg ${isActive ? 'bg-zinc-800 text-lime-400 hover:bg-zinc-700 shadow-zinc-900/50' : 'bg-lime-500 text-zinc-950 hover:bg-lime-400 hover:scale-105 shadow-lime-500/25'}`}
            >
              {isActive ? <Pause size={32} /> : <Play size={32} className="ml-2" />}
            </button>
            <button 
              onClick={reset}
              className="w-20 h-20 rounded-2xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all flex items-center justify-center shadow-lg shadow-zinc-900/50"
            >
              <Square size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 text-left bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/50">
        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">Session Details</h3>
        <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white mb-4 focus:outline-none focus:border-lime-500/50 transition-colors">
          <option>Select Subject...</option>
          {subjects.map(subject => (
            <option key={subject.id} value={subject.id}>{subject.name}</option>
          ))}
        </select>
        <textarea 
          placeholder="Session notes or focus goals..."
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white h-32 focus:outline-none focus:border-lime-500/50 transition-colors resize-none"
        />
      </div>
    </div>
  );
}
