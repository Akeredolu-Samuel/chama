import React, { useState } from 'react';
import { X, Info } from 'lucide-react';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
}

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    contributionAmount: '1',
    cycleInterval: 'weekly',
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass-card w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Create New Chama</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <X className="h-6 w-6 text-slate-400" />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onCreate(formData); }} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Group Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Injective Builders Pool"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-injective transition-all"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Description</label>
            <textarea
              placeholder="What is this saving pool for?"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-injective transition-all min-h-[100px]"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Contribution (INJ)</label>
              <input
                type="number"
                step="0.1"
                required
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-injective transition-all"
                value={formData.contributionAmount}
                onChange={(e) => setFormData({ ...formData, contributionAmount: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Cycle</label>
              <select
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-injective transition-all appearance-none"
                value={formData.cycleInterval}
                onChange={(e) => setFormData({ ...formData, cycleInterval: e.target.value as any })}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl bg-injective/5 p-4 border border-injective/10">
            <Info className="h-5 w-5 text-injective shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed">
              By creating this group, you will be the first member. Automated payouts will be triggered at the end of each cycle based on the member list.
            </p>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl injective-gradient py-4 text-sm font-bold text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,210,255,0.4)]"
          >
            Launch Chama
          </button>
        </form>
      </div>
    </div>
  );
};
