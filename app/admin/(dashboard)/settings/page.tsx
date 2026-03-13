import { prisma } from '@/lib/prisma';
import { saveSetting, deleteSetting } from './actions';
import { Settings, Save, Trash2, Key, Type } from 'lucide-react';

export default async function SettingsPage() {
  const settings = await prisma.siteSetting.findMany({
    orderBy: { key: 'asc' },
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings className="text-indigo-500" />
            Site Settings
        </h1>
        <p className="text-gray-400 text-sm mt-1">Configure global variables, API keys, and contact info.</p>
      </div>

      {/* Top Part: Add/Update Form */}
      <div className="bg-[#161920] border border-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-white mb-4 border-b border-gray-800 pb-2">Add or Update Setting</h2>
        
        <form action={saveSetting} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-1">
                        <Key size={14} /> Key (ID)
                    </label>
                    <input 
                        name="key" 
                        required 
                        type="text" 
                        placeholder="e.g. contact_email" 
                        className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600 font-mono text-sm" 
                    />
                    <p className="text-[10px] text-gray-500">Unique identifier for the setting.</p>
                </div>

                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-1">
                        <Type size={14} /> Value
                    </label>
                    <textarea 
                        name="value" 
                        required 
                        rows={1}
                        placeholder="Value content..." 
                        className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600 min-h-[48px]" 
                    />
                </div>
            </div>

            <div className="flex justify-end pt-2">
                <button 
                    type="submit" 
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20 text-sm"
                >
                    <Save size={16} /> Save Setting
                </button>
            </div>
        </form>
      </div>

      {/* Bottom Part: Existing Settings Table */}
      <div className="space-y-4">
         <h2 className="text-lg font-bold text-white px-1">Existing Configurations</h2>
         
         <div className="bg-[#161920] border border-gray-800 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-[#0f1115]/50 border-b border-gray-800 text-gray-200 uppercase text-xs font-semibold">
                    <tr>
                        <th className="px-6 py-4 w-1/4">Key</th>
                        <th className="px-6 py-4 w-1/2">Value</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                    {settings.length === 0 ? (
                        <tr><td colSpan={3} className="px-6 py-12 text-center text-gray-500">No settings configured yet.</td></tr>
                    ) : (
                        settings.map((setting) => (
                            <tr key={setting.id} className="hover:bg-[#1c2029] transition-colors group">
                                <td className="px-6 py-4 font-mono text-indigo-400 text-xs">
                                    {setting.key}
                                </td>
                                <td className="px-6 py-4 text-white break-all">
                                    {setting.value.length > 100 ? setting.value.substring(0, 100) + '...' : setting.value}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <form action={deleteSetting.bind(null, setting.id)}>
                                        <button 
                                            className="p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                                            title="Delete Setting"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
         </div>
      </div>

    </div>
  );
}