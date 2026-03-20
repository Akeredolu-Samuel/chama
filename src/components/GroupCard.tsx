import React from 'react';
import { Group } from '../types/chama';
import { Users, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface GroupCardProps {
  group: Group;
  onClick: () => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({ group, onClick }) => {
  const progress = (group.members.length / 10) * 100;

  return (
    <div 
      onClick={onClick}
      className="glass-card group cursor-pointer p-6 transition-all hover:bg-white/10 hover:border-injective/50"
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-injective transition-colors">{group.name}</h3>
          <p className="text-sm text-slate-400 line-clamp-1">{group.description}</p>
        </div>
        <span className={cn(
          "rounded-full px-3 py-1 text-xs font-medium",
          group.status === 'active' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
          group.status === 'pending' ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
          "bg-slate-500/10 text-slate-400 border border-slate-500/20"
        )}>
          {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2 text-slate-300">
          <Users className="h-4 w-4 text-injective" />
          <span className="text-sm">{group.members.length} Members</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <TrendingUp className="h-4 w-4 text-injective" />
          <span className="text-sm">{group.contributionAmount} INJ / cycle</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-slate-400">Pool Progress</span>
          <span className="text-injective font-medium">{group.totalPool} INJ Total</span>
        </div>
        <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
          <div 
            className="h-full injective-gradient transition-all duration-500" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Calendar className="h-3.5 w-3.5" />
          Next Payout: {new Date(group.nextPayoutDate).toLocaleDateString()}
        </div>
        <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-injective group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
};
