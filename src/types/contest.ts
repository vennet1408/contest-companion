
export interface Contest {
  id: string;
  name: string;
  platform: 'codeforces' | 'codechef' | 'leetcode';
  url: string;
  startTime: string;
  endTime: string;
  duration: number; // in seconds
  isBookmarked: boolean;
  solutionUrl?: string;
}

export type FilterPlatform = 'codeforces' | 'codechef' | 'leetcode';
