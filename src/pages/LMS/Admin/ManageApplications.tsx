import React, { useState, useEffect } from 'react';
import { FileText, Search, CheckCircle, XCircle, Eye, Loader2 } from 'lucide-react';
import { supabase } from '@/src/lib/supabase';

export function ManageApplications() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    setLoading(true);
    try {
      // Joining with courses to get the course title
      const { data, error } = await (supabase
        .from('applications' as any) as any)
        .select(`
          *,
          courses (
            title
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: 'approved' | 'rejected') {
    try {
      const { error } = await supabase
        .from('applications' as any)
        .update({ status } as any)
        .eq('id', id);

      if (error) throw error;
      setApplications(prev => prev.map(app => app.id === id ? { ...app, status } : app));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }

  const filteredApps = applications.filter(app => 
    app.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.courses?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 font-serif">Applications</h1>
        <p className="text-slate-500 font-medium">Review and manage student course applications.</p>
      </header>

      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-6 text-slate-900 outline-none focus:border-brand-teal transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <Loader2 className="animate-spin text-brand-teal" size={40} />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Loading Applications...</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-8 py-5">Applicant</th>
                  <th className="px-8 py-5">Course</th>
                  <th className="px-8 py-5">Date</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900">{app.full_name}</div>
                      <div className="text-xs text-slate-400 font-medium">{app.email}</div>
                      {app.phone && <div className="text-[10px] text-slate-400 font-bold mt-1">{app.phone}</div>}
                    </td>
                    <td className="px-8 py-6 text-sm text-slate-600 font-bold">
                      {app.courses?.title || 'Unknown Course'}
                    </td>
                    <td className="px-8 py-6 text-sm text-slate-400">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        app.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                        app.status === 'rejected' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                        'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        {app.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => updateStatus(app.id, 'approved')}
                              title="Approve"
                              className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-brand-teal hover:bg-white transition-all border border-slate-100 shadow-sm"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button 
                              onClick={() => updateStatus(app.id, 'rejected')}
                              title="Reject"
                              className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-white transition-all border border-slate-100 shadow-sm"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                        <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-white transition-all border border-slate-100 shadow-sm">
                          <Eye size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredApps.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <p className="text-slate-400 font-medium">No applications found matching your search.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
