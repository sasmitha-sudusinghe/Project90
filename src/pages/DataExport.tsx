import { Download, Upload, AlertCircle } from 'lucide-react';

export default function DataExport() {
  const handleExport = () => {
    const data = { message: 'Mock export data' };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `project90-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-3">Data Management</h1>
        <p className="text-zinc-400 font-medium">Safely backup and restore your local records without relying on cloud synchronization limits.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800/50 rounded-2xl p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl mb-4 sm:mb-0 sm:mr-6 shrink-0">
            <Download className="text-lime-500" size={32} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Export Data</h3>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">Download a complete JSON snapshot of all your subjects, habits, training logs, and weekly reviews.</p>
            <button 
              onClick={handleExport}
              className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-lg transition-colors border border-zinc-700 hover:border-zinc-600"
            >
              Download JSON Backup
            </button>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800/50 rounded-2xl p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl mb-4 sm:mb-0 sm:mr-6 shrink-0">
            <Upload className="text-blue-500" size={32} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Import Data</h3>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">Restore your progress from a previous backup file. Make sure the file format is a valid PROJECT 90 JSON export.</p>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <input 
                type="file" 
                accept=".json"
                className="block w-full text-sm text-zinc-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer focus:outline-none transition-colors"
              />
              <button className="px-6 py-2.5 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 hover:text-blue-300 font-semibold rounded-lg transition-colors border border-blue-500/20 whitespace-nowrap">
                Restore Progress
              </button>
            </div>
            
            <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-start">
              <AlertCircle className="text-orange-400 mr-3 shrink-0 mt-0.5" size={18} />
              <p className="text-sm font-medium text-orange-200/90 leading-snug">Importing will completely overwrite your existing local data. Ensure you have backed up any recent changes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
