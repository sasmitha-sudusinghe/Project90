import { useState } from 'react';
import { Check, X, Flame } from 'lucide-react';

export default function Habits() {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Focused Study (3 hrs)', streak: 12, completedToday: true },
    { id: 2, name: 'Coding Practice', streak: 5, completedToday: false },
    { id: 3, name: 'Rugby/Gym', streak: 21, completedToday: true },
    { id: 4, name: 'Adequate Sleep', streak: 4, completedToday: false },
  ]);

  const toggleHabit = (id: number) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completedToday: !habit.completedToday } : habit
    ));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Daily Habits</h1>
      </div>

      <div className="grid gap-4">
        {habits.map(habit => (
          <div key={habit.id} className="flex items-center justify-between p-5 bg-zinc-900 border border-zinc-800/50 rounded-xl hover:border-zinc-700 transition-colors">
            <div className="flex items-center space-x-5">
              <button 
                onClick={() => toggleHabit(habit.id)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  habit.completedToday 
                    ? 'bg-lime-500 text-zinc-950 shadow-lg shadow-lime-500/20 scale-105' 
                    : 'bg-zinc-950 border border-zinc-800 text-zinc-600 hover:border-lime-500/50 hover:text-lime-500'
                }`}
              >
                {habit.completedToday ? <Check size={28} strokeWidth={3} /> : <X size={24} />}
              </button>
              <div>
                <h3 className={`font-bold text-lg ${habit.completedToday ? 'text-white' : 'text-zinc-300'}`}>
                  {habit.name}
                </h3>
                <p className="text-sm font-medium flex items-center mt-1 text-zinc-500">
                  <Flame size={16} className={`mr-1.5 ${habit.streak > 10 ? 'text-orange-500' : 'text-zinc-600'}`} />
                  {habit.streak} day streak
                </p>
              </div>
            </div>
            <div className="hidden md:flex space-x-1.5">
              {[...Array(7)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-4 h-10 rounded-sm ${i < 5 ? 'bg-lime-500' : 'bg-zinc-800'}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
