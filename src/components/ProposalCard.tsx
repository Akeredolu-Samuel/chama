import React from 'react';
import { Proposal } from '../types/chama';
import { ThumbsUp, ThumbsDown, Clock, User } from 'lucide-react';
import { cn, formatAddress } from '../lib/utils';

interface ProposalCardProps {
  proposal: Proposal;
  onVote: (id: string, side: 'for' | 'against') => void;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({ proposal, onVote }) => {
  const totalVotes = proposal.votesFor + proposal.votesAgainst;
  const forPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
  const againstPercentage = totalVotes > 0 ? (proposal.votesAgainst / totalVotes) * 100 : 0;

  return (
    <div className="glass-card p-6 border-l-4 border-l-injective">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-lg font-bold text-white">{proposal.title}</h4>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              Proposer: {formatAddress(proposal.proposer)}
            </span>
          </div>
        </div>
        <span className={cn(
          "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
          proposal.status === 'active' ? "bg-injective/20 text-injective" :
          proposal.status === 'passed' ? "bg-emerald-500/20 text-emerald-400" :
          "bg-red-500/20 text-red-400"
        )}>
          {proposal.status}
        </span>
      </div>

      <p className="text-sm text-slate-300 mb-6 leading-relaxed">
        {proposal.description}
      </p>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-emerald-400 font-medium">For: {proposal.votesFor}</span>
            <span className="text-red-400 font-medium">Against: {proposal.votesAgainst}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-white/5 flex overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${forPercentage}%` }} />
            <div className="h-full bg-red-500 transition-all duration-500" style={{ width: `${againstPercentage}%` }} />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock className="h-3.5 w-3.5" />
            Ends: {new Date(proposal.deadline).toLocaleDateString()}
          </div>
          
          {proposal.status === 'active' && (
            <div className="flex gap-2">
              <button
                onClick={() => onVote(proposal.id, 'for')}
                className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all"
              >
                <ThumbsUp className="h-3.5 w-3.5" />
                Vote For
              </button>
              <button
                onClick={() => onVote(proposal.id, 'against')}
                className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-400 hover:bg-red-500/20 transition-all"
              >
                <ThumbsDown className="h-3.5 w-3.5" />
                Vote Against
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
