import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { GroupCard } from './components/GroupCard';
import { CreateGroupModal } from './components/CreateGroupModal';
import { ProposalCard } from './components/ProposalCard';
import { WalletProvider, useWallet } from './context/WalletContext';
import { Group, Proposal } from './types/chama';
import { Plus, LayoutDashboard, Vote, History, TrendingUp, Users, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

const MOCK_GROUPS: Group[] = [
  {
    id: '1',
    name: 'Injective Alpha Pool',
    description: 'A saving pool for early Injective ecosystem builders and enthusiasts.',
    contributionAmount: '5',
    cycleInterval: 'weekly',
    currentCycle: 2,
    totalPool: '45',
    nextPayoutDate: Date.now() + 86400000 * 3,
    status: 'active',
    contractAddress: '0x82433d876e8d0590e6776fd7bd15f0ac4217c6a0',
    members: [
      { address: 'inj1...abc', name: 'Alice', joinedAt: Date.now(), totalContributed: '10', isPaidOut: false },
      { address: 'inj1...def', name: 'Bob', joinedAt: Date.now(), totalContributed: '10', isPaidOut: true },
      { address: 'inj1...ghi', name: 'Charlie', joinedAt: Date.now(), totalContributed: '10', isPaidOut: false },
    ]
  },
  {
    id: '2',
    name: 'Nairobi Tech Chama',
    description: 'Community savings for local tech meetups and hardware purchases.',
    contributionAmount: '2.5',
    cycleInterval: 'monthly',
    currentCycle: 1,
    totalPool: '12.5',
    nextPayoutDate: Date.now() + 86400000 * 15,
    status: 'pending',
    contractAddress: '0x82433d876e8d0590e6776fd7bd15f0ac4217c6a0',
    members: [
      { address: 'inj1...xyz', name: 'David', joinedAt: Date.now(), totalContributed: '2.5', isPaidOut: false },
    ]
  }
];

const MOCK_PROPOSALS: Proposal[] = [
  {
    id: 'p1',
    groupId: '1',
    title: 'Increase Cycle Contribution',
    description: 'Proposal to increase the weekly contribution from 5 INJ to 7 INJ to grow the pool faster.',
    votesFor: 12,
    votesAgainst: 4,
    deadline: Date.now() + 86400000 * 2,
    status: 'active',
    proposer: 'inj1...abc'
  }
];

function Dashboard() {
  const { isConnected, address } = useWallet();
  const [activeTab, setActiveTab] = useState<'groups' | 'proposals' | 'history'>('groups');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [groups, setGroups] = useState<Group[]>(MOCK_GROUPS);
  const [proposals, setProposals] = useState<Proposal[]>(MOCK_PROPOSALS);

  const handleCreateGroup = (data: any) => {
    const newGroup: Group = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      currentCycle: 1,
      totalPool: data.contributionAmount,
      nextPayoutDate: Date.now() + (data.cycleInterval === 'weekly' ? 604800000 : 2592000000),
      status: 'pending',
      contractAddress: '0x82433d876e8d0590e6776fd7bd15f0ac4217c6a0',
      members: [{ address: address || 'unknown', name: 'Founder', joinedAt: Date.now(), totalContributed: data.contributionAmount, isPaidOut: false }]
    };
    setGroups([newGroup, ...groups]);
    setIsCreateModalOpen(false);
  };

  const handleVote = (id: string, side: 'for' | 'against') => {
    setProposals(proposals.map(p => {
      if (p.id === id) {
        return {
          ...p,
          votesFor: side === 'for' ? p.votesFor + 1 : p.votesFor,
          votesAgainst: side === 'against' ? p.votesAgainst + 1 : p.votesAgainst
        };
      }
      return p;
    }));
  };

  return (
    <div className="min-h-screen bg-[#000a12]">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Community Finance, <span className="text-injective">Decentralized.</span>
            </h1>
            <p className="mt-3 text-lg text-slate-400 max-w-2xl">
              Join or create a Chama to save together, earn rewards, and build financial resilience on the Injective blockchain.
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center justify-center gap-2 rounded-2xl injective-gradient px-8 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,210,255,0.4)]"
          >
            <Plus className="h-6 w-6" />
            Create Chama
          </button>
        </div>

        {/* Stats Grid */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Total Value Locked', value: '12,450 INJ', icon: TrendingUp, color: 'text-injective' },
            { label: 'Active Members', value: '1,240', icon: Users, color: 'text-emerald-400' },
            { label: 'Total Groups', value: '86', icon: LayoutDashboard, color: 'text-violet-400' },
            { label: 'Security Score', value: '98%', icon: ShieldCheck, color: 'text-blue-400' },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6">
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className={cn("h-5 w-5", stat.color)} />
                <span className="text-sm font-medium text-slate-400">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-8 flex items-center gap-2 border-b border-white/5 pb-px">
          {[
            { id: 'groups', label: 'My Groups', icon: LayoutDashboard },
            { id: 'proposals', label: 'Governance', icon: Vote },
            { id: 'history', label: 'History', icon: History },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative",
                activeTab === tab.id ? "text-injective" : "text-slate-500 hover:text-slate-300"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-injective shadow-[0_0_10px_rgba(0,210,255,0.8)]" 
                />
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'groups' && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {groups.map(group => (
                  <GroupCard key={group.id} group={group} onClick={() => {}} />
                ))}
                <button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-white/10 p-8 text-slate-500 hover:border-injective/50 hover:text-injective transition-all group"
                >
                  <div className="rounded-full bg-white/5 p-4 group-hover:bg-injective/10 transition-colors">
                    <Plus className="h-8 w-8" />
                  </div>
                  <span className="font-bold">Create New Group</span>
                </button>
              </div>
            )}

            {activeTab === 'proposals' && (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {proposals.map(proposal => (
                  <ProposalCard key={proposal.id} proposal={proposal} onVote={handleVote} />
                ))}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="glass-card overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Transaction</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Group</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Amount</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { tx: 'Contribution', group: 'Injective Alpha Pool', amount: '+5.0 INJ', status: 'Confirmed', date: '2024-03-15' },
                      { tx: 'Payout', group: 'Injective Alpha Pool', amount: '+45.0 INJ', status: 'Confirmed', date: '2024-03-08' },
                      { tx: 'Contribution', group: 'Injective Alpha Pool', amount: '+5.0 INJ', status: 'Confirmed', date: '2024-03-01' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-white">{row.tx}</td>
                        <td className="px-6 py-4 text-sm text-slate-400">{row.group}</td>
                        <td className="px-6 py-4 text-sm font-bold text-injective">{row.amount}</td>
                        <td className="px-6 py-4">
                          <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-400">
                            {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <CreateGroupModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateGroup}
      />
    </div>
  );
}

export default function App() {
  return (
    <WalletProvider>
      <Dashboard />
    </WalletProvider>
  );
}
