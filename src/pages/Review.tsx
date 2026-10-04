import { Target, Trophy, AlertTriangle } from 'lucide-react';

export default function Review() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-white mb-2">Weekly Review</h1>
        <p className="text-zinc-400 font-medium">Week of Oct 1 - Oct 7, 2026</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800/50 rounded-2xl p-8 text-center relative overflow-hidden group hover:border-lime-500/50 transition-colors">
          <div className="absolute inset-0 bg-lime-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-lime-500 mb-4 flex justify-center"><Target size={36} /></div>
          <div className="text-5xl font-black text-white mb-2 tracking-tighter">18<span className="text-2xl text-zinc-500 ml-1">h</span></div>
          <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Study Time</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800/50 rounded-2xl p-8 text-center relative overflow-hidden group hover:border-lime-500/50 transition-colors">
          <div className="absolute inset-0 bg-lime-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-lime-500 mb-4 flex justify-center"><Trophy size={36} /></div>
          <div className="text-5xl font-black text-white mb-2 tracking-tighter">5</div>
          <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Gym & Rugby</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800/50 rounded-2xl p-8 text-center relative overflow-hidden group hover:border-lime-500/50 transition-colors">
          <div className="absolute inset-0 bg-lime-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-lime-500 mb-4 flex justify-center"><AlertTriangle size={36} /></div>
          <div className="text-5xl font-black text-white mb-2 tracking-tighter">85<span className="text-2xl text-zinc-500 ml-1">%</span></div>
          <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Habit Score</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800/50 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-white mb-4">Wins & Progress</h2>
          <textarea 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white h-32 resize-none focus:outline-none focus:border-lime-500/50 transition-colors"
            placeholder="What went well this week? Did you hit your protein goals?"
          />
        </div>
        <div className="bg-zinc-900 border border-zinc-800/50 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-white mb-4">Obstacles</h2>
          <textarea 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white h-32 resize-none focus:outline-none focus:border-orange-500/50 transition-colors"
            placeholder="What held you back from studying or recovering?"
          />
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800/50 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-white mb-4">Next Week's Priorities</h2>
        <textarea 
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white h-32 resize-none focus:outline-none focus:border-blue-500/50 transition-colors"
          placeholder="List top 3 priorities (e.g. 1. Finish OS Project, 2. Sleep 8h, 3. Rugby Game on Sat)..."
        />
        <div className="mt-6 flex justify-end">
          <button onClick={() => alert('Review Saved')} className="px-8 py-3 bg-lime-500 text-zinc-950 font-bold rounded-xl hover:bg-lime-400 transition shadow-lg shadow-lime-500/20">
            Save Review
          </button>
        </div>
      </div>
    </div>
  );
}
