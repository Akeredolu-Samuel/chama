export interface Member {
  address: string;
  name: string;
  joinedAt: number;
  totalContributed: string;
  isPaidOut: boolean;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  contributionAmount: string;
  cycleInterval: 'weekly' | 'monthly';
  members: Member[];
  currentCycle: number;
  totalPool: string;
  nextPayoutDate: number;
  status: 'active' | 'completed' | 'pending';
  contractAddress: string;
}

export interface Proposal {
  id: string;
  groupId: string;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  deadline: number;
  status: 'active' | 'passed' | 'rejected';
  proposer: string;
}
