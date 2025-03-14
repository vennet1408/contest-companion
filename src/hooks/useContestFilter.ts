
import { useState, useEffect } from "react";
import { FilterPlatform } from "@/types/contest";

type UseContestFilterReturn = {
  selectedPlatforms: FilterPlatform[];
  togglePlatform: (platform: FilterPlatform) => void;
  clearFilters: () => void;
  selectAllFilters: () => void;
  showBookmarked: boolean;
  toggleBookmarked: () => void;
};

/**
 * Custom hook for managing contest filters
 * @returns Filter state and functions
 */
export const useContestFilter = (): UseContestFilterReturn => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<FilterPlatform[]>(() => {
    const saved = localStorage.getItem("selectedPlatforms");
    return saved ? JSON.parse(saved) : ["codeforces", "codechef", "leetcode"];
  });
  
  const [showBookmarked, setShowBookmarked] = useState<boolean>(() => {
    const saved = localStorage.getItem("showBookmarked");
    return saved ? JSON.parse(saved) : false;
  });
  
  useEffect(() => {
    localStorage.setItem("selectedPlatforms", JSON.stringify(selectedPlatforms));
  }, [selectedPlatforms]);
  
  useEffect(() => {
    localStorage.setItem("showBookmarked", JSON.stringify(showBookmarked));
  }, [showBookmarked]);
  
  const togglePlatform = (platform: FilterPlatform) => {
    setSelectedPlatforms((prev) => {
      if (prev.includes(platform)) {
        return prev.filter((p) => p !== platform);
      }
      return [...prev, platform];
    });
  };
  
  const clearFilters = () => {
    setSelectedPlatforms([]);
  };
  
  const selectAllFilters = () => {
    setSelectedPlatforms(["codeforces", "codechef", "leetcode"]);
  };
  
  const toggleBookmarked = () => {
    setShowBookmarked((prev) => !prev);
  };
  
  return {
    selectedPlatforms,
    togglePlatform,
    clearFilters,
    selectAllFilters,
    showBookmarked,
    toggleBookmarked,
  };
};
