import { useState, useEffect } from 'react';
import { Plus, Book, CheckCircle, Circle, Trash2 } from 'lucide-react';

type Chapter = {
  id: number;
  name: string;
  completed: boolean;
};

type SubjectType = {
  id: number;
  name: string;
  code: string;
  credits: number;
  chapters: Chapter[];
};

export default function Subjects() {
  const [subjects, setSubjects] = useState<SubjectType[]>(() => {
    const saved = localStorage.getItem('p90_subjects');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 1, name: 'KBS (Knowledge Based Systems)', code: 'KBS', credits: 3, chapters: [
        { id: 101, name: 'Introductory Theory', completed: false },
        { id: 102, name: 'Practical Exercise 1', completed: false },
      ] },
      { id: 2, name: 'Computer Security', code: 'SEC', credits: 3, chapters: [
        { id: 201, name: 'Syllabus Overview', completed: false },
        { id: 202, name: 'First Major Topic', completed: false },
      ] },
      { id: 3, name: 'Mobile Communication', code: 'MOB', credits: 3, chapters: [
        { id: 301, name: 'Theory Chapters', completed: false },
        { id: 302, name: 'Practical Topics', completed: false },
      ] },
      { id: 4, name: 'Digital Image Processing', code: 'DIP', credits: 3, chapters: [
        { id: 401, name: 'Theory Chapters', completed: false },
        { id: 402, name: 'Practical Topics', completed: false },
      ] },
      { id: 5, name: 'Software Quality Assurance', code: 'SQA', credits: 3, chapters: [
        { id: 501, name: 'Syllabus Overview', completed: false },
        { id: 502, name: 'Major Concepts', completed: false },
      ] },
      { id: 6, name: 'Group Project', code: 'PRJ', credits: 4, chapters: [
        { id: 601, name: 'Project Requirements', completed: false },
        { id: 602, name: 'Task List & Deliverables', completed: false },
      ] },
    ];
  });

  useEffect(() => {
    localStorage.setItem('p90_subjects', JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = () => {
    const name = window.prompt('Enter Subject Name:');
    if (!name) return;
    const code = window.prompt('Enter Subject Code (e.g. CS201):') || '';
    const creditsStr = window.prompt('Enter Credits (e.g. 3):') || '3';
    const credits = parseInt(creditsStr) || 3;
    
    const newSubject: SubjectType = {
      id: Date.now(),
      name,
      code,
      credits,
      chapters: []
    };
    
    setSubjects([...subjects, newSubject]);
  };

  const removeSubject = (id: number) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  const addChapter = (subjectId: number) => {
    const name = window.prompt('Enter Chapter Name:');
    if (!name) return;
    
    setSubjects(subjects.map(s => {
      if (s.id === subjectId) {
        return {
          ...s,
          chapters: [...s.chapters, { id: Date.now(), name, completed: false }]
        };
      }
      return s;
    }));
  };

  const removeChapter = (subjectId: number, chapterId: number) => {
    setSubjects(subjects.map(s => {
      if (s.id === subjectId) {
        return {
          ...s,
          chapters: s.chapters.filter(c => c.id !== chapterId)
        };
      }
      return s;
    }));
  };

  const toggleChapter = (subjectId: number, chapterId: number) => {
    setSubjects(subjects.map(s => {
      if (s.id === subjectId) {
        return {
          ...s,
          chapters: s.chapters.map(c => c.id === chapterId ? { ...c, completed: !c.completed } : c)
        };
      }
      return s;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Subjects & Syllabus</h1>
        <button onClick={addSubject} className="flex items-center px-4 py-2 bg-lime-500 text-zinc-950 font-semibold rounded-lg hover:bg-lime-400 transition shadow-lg shadow-lime-500/20">
          <Plus size={18} className="mr-2" /> Add Subject
        </button>
      </div>

      <div className="grid gap-6">
        {subjects.map(subject => (
          <div key={subject.id} className="bg-zinc-900 border border-zinc-800/50 rounded-xl p-6 shadow-sm group">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Book className="mr-3 text-lime-400" size={24} />
                  {subject.name}
                  <span className="ml-3 text-xs font-medium text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded-md border border-zinc-800">{subject.code}</span>
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium text-zinc-500">{subject.credits} Credits</div>
                <button onClick={() => removeSubject(subject.id)} className="text-zinc-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" title="Remove Subject">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Chapters</h3>
              {subject.chapters.length === 0 ? (
                <div className="text-zinc-500 text-sm italic">No chapters added yet.</div>
              ) : (
                subject.chapters.map(chapter => (
                  <div key={chapter.id} className="flex items-center justify-between bg-zinc-950/50 hover:bg-zinc-950 p-3 rounded-lg border border-zinc-800/50 transition-colors cursor-pointer group/chapter">
                    <div className="flex items-center" onClick={() => toggleChapter(subject.id, chapter.id)}>
                      <button className="text-zinc-600 group-hover/chapter:text-lime-400 transition mr-3">
                        {chapter.completed ? <CheckCircle className="text-lime-500" size={20} /> : <Circle size={20} />}
                      </button>
                      <span className={chapter.completed ? "text-zinc-500 line-through" : "text-zinc-200"}>{chapter.name}</span>
                    </div>
                    <button onClick={() => removeChapter(subject.id, chapter.id)} className="text-zinc-600 hover:text-red-500 opacity-0 group-hover/chapter:opacity-100 transition-opacity" title="Remove Chapter">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
              <button onClick={() => addChapter(subject.id)} className="text-sm font-medium text-lime-500 hover:text-lime-400 flex items-center mt-4 transition-colors">
                <Plus size={16} className="mr-1" /> Add Chapter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
