
import { useState } from "react";
import { Contest } from "@/types/contest";
import { ContestCard } from "@/components/ContestCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

interface ContestListProps {
  upcomingContests: Contest[];
  pastContests: Contest[];
  isLoading: boolean;
  onContestUpdated: (updatedContest: Contest) => void;
}

export function ContestList({
  upcomingContests,
  pastContests,
  isLoading,
  onContestUpdated,
}: ContestListProps) {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  // Empty states
  const EmptyState = ({ message }: { message: string }) => (
    <div className="py-12 flex flex-col items-center justify-center text-center">
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
  
  // Loading skeletons
  const LoadingSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-card/50 rounded-lg p-5 space-y-3">
          <div className="flex justify-between items-start">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-2/3" />
          <div className="pt-3 flex justify-between">
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
  
  return (
    <Tabs 
      defaultValue="upcoming" 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="upcoming" className="rounded-full">Upcoming</TabsTrigger>
        <TabsTrigger value="past" className="rounded-full">Past</TabsTrigger>
      </TabsList>
      
      <TabsContent 
        value="upcoming" 
        className="animate-fadeIn mt-2"
      >
        {isLoading ? (
          <LoadingSkeletons />
        ) : upcomingContests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcomingContests.map((contest) => (
              <ContestCard
                key={contest.id}
                contest={contest}
                onContestUpdated={onContestUpdated}
              />
            ))}
          </div>
        ) : (
          <EmptyState message="No upcoming contests match your filters." />
        )}
      </TabsContent>
      
      <TabsContent 
        value="past" 
        className="animate-fadeIn mt-2"
      >
        {isLoading ? (
          <LoadingSkeletons />
        ) : pastContests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pastContests.map((contest) => (
              <ContestCard
                key={contest.id}
                contest={contest}
                isPast={true}
                onContestUpdated={onContestUpdated}
              />
            ))}
          </div>
        ) : (
          <EmptyState message="No past contests match your filters." />
        )}
      </TabsContent>
    </Tabs>
  );
}
