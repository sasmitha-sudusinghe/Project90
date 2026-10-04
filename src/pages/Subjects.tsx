import { useState } from 'react';
import { Plus, Book, CheckCircle, Circle } from 'lucide-react';

export default function Subjects() {
  const [subjects] = useState([
    { id: 1, name: 'Data Structures', code: 'CS201', credits: 4, chapters: [
      { id: 101, name: 'Trees', completed: true },
      { id: 102, name: 'Graphs', completed: false },
    ] }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Subjects & Syllabus</h1>
        <button onClick={() => alert('Add Subject dialog')} className="flex items-center px-4 py-2 bg-lime-500 text-zinc-950 font-semibold rounded-lg hover:bg-lime-400 transition shadow-lg shadow-lime-500/20">
          <Plus size={18} className="mr-2" /> Add Subject
        </button>
      </div>

      <div className="grid gap-6">
        {subjects.map(subject => (
          <div key={subject.id} className="bg-zinc-900 border border-zinc-800/50 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Book className="mr-3 text-lime-400" size={24} />
                  {subject.name}
                  <span className="ml-3 text-xs font-medium text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded-md border border-zinc-800">{subject.code}</span>
                </h2>
              </div>
              <div className="text-sm font-medium text-zinc-500">{subject.credits} Credits</div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Chapters</h3>
              {subject.chapters.map(chapter => (
                <div key={chapter.id} className="flex items-center justify-between bg-zinc-950/50 hover:bg-zinc-950 p-3 rounded-lg border border-zinc-800/50 transition-colors cursor-pointer group">
                  <div className="flex items-center">
                    <button onClick={() => alert('Chapter toggled')} className="text-zinc-600 group-hover:text-lime-400 transition mr-3">
                      {chapter.completed ? <CheckCircle className="text-lime-500" size={20} /> : <Circle size={20} />}
                    </button>
                    <span className={chapter.completed ? "text-zinc-500 line-through" : "text-zinc-200"}>{chapter.name}</span>
                  </div>
                </div>
              ))}
              <button onClick={() => alert('Add Chapter dialog')} className="text-sm font-medium text-lime-500 hover:text-lime-400 flex items-center mt-4 transition-colors">
                <Plus size={16} className="mr-1" /> Add Chapter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
