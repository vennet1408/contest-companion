
import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { PlatformFilters } from "@/components/PlatformFilters";
import { ContestList } from "@/components/ContestList";
import { useContestFilter } from "@/hooks/useContestFilter";
import { getUpcomingContests, getPastContests } from "@/services/api";
import { Contest } from "@/types/contest";

const Index = () => {
  const {
    selectedPlatforms,
    togglePlatform,
    clearFilters,
    selectAllFilters,
    showBookmarked,
    toggleBookmarked,
  } = useContestFilter();

  // Queries for upcoming and past contests
  const { 
    data: upcomingContestsData = [], 
    isLoading: isUpcomingLoading,
    refetch: refetchUpcoming
  } = useQuery({
    queryKey: ["upcomingContests", selectedPlatforms],
    queryFn: () => getUpcomingContests(selectedPlatforms),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { 
    data: pastContestsData = [], 
    isLoading: isPastLoading,
    refetch: refetchPast
  } = useQuery({
    queryKey: ["pastContests", selectedPlatforms],
    queryFn: () => getPastContests(selectedPlatforms),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Filtered contests based on bookmarked status
  const [filteredUpcomingContests, setFilteredUpcomingContests] = useState<Contest[]>([]);
  const [filteredPastContests, setFilteredPastContests] = useState<Contest[]>([]);

  useEffect(() => {
    // Filter contests based on showBookmarked flag
    setFilteredUpcomingContests(
      showBookmarked
        ? upcomingContestsData.filter((contest) => contest.isBookmarked)
        : upcomingContestsData
    );

    setFilteredPastContests(
      showBookmarked
        ? pastContestsData.filter((contest) => contest.isBookmarked)
        : pastContestsData
    );
  }, [upcomingContestsData, pastContestsData, showBookmarked]);

  // Handle contest updates (bookmarks, solution URLs)
  const handleContestUpdated = useCallback((updatedContest: Contest) => {
    // Refetch both contest lists to reflect the changes
    refetchUpcoming();
    refetchPast();
  }, [refetchUpcoming, refetchPast]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container max-w-screen-xl mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-8">
          <PlatformFilters
            selectedPlatforms={selectedPlatforms}
            togglePlatform={togglePlatform}
            clearFilters={clearFilters}
            selectAllFilters={selectAllFilters}
            showBookmarked={showBookmarked}
            toggleBookmarked={toggleBookmarked}
          />
          
          <ContestList
            upcomingContests={filteredUpcomingContests}
            pastContests={filteredPastContests}
            isLoading={isUpcomingLoading || isPastLoading}
            onContestUpdated={handleContestUpdated}
          />
        </div>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Contest data from Codeforces, CodeChef, and LeetCode</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
