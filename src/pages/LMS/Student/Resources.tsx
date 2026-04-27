import { FileText, Download, ExternalLink } from 'lucide-react';

const resources = [
  { id: '1', title: 'Student Handbook 2024', type: 'PDF', size: '2.4 MB' },
  { id: '2', title: 'Clinical Safety Guidelines', type: 'PDF', size: '1.8 MB' },
  { id: '3', title: 'Assignment Template', type: 'DOCX', size: '45 KB' },
  { id: '4', title: 'Reading List: Module 1', type: 'PDF', size: '1.2 MB' },
];

export function Resources() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white font-serif">Resource Library</h1>
        <p className="text-slate-400">Download essential learning materials and templates.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((res) => (
          <div key={res.id} className="p-6 bg-brand-card rounded-3xl border border-white/5 hover:border-white/10 transition-all flex items-center justify-between group">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brand-teal border border-white/10">
                <FileText size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1 group-hover:text-brand-teal transition-colors">{res.title}</h4>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-bold uppercase tracking-widest">
                  <span>{res.type}</span>
                  <span className="w-1 h-1 bg-slate-700 rounded-full" />
                  <span>{res.size}</span>
                </div>
              </div>
            </div>
            <button className="p-3 bg-white/5 rounded-xl text-slate-400 hover:bg-brand-teal hover:text-white transition-all shadow-lg hover:shadow-brand-teal/20">
              <Download size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
