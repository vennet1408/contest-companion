
import { CheckIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterPlatform } from "@/types/contest";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PlatformFiltersProps {
  selectedPlatforms: FilterPlatform[];
  togglePlatform: (platform: FilterPlatform) => void;
  clearFilters: () => void;
  selectAllFilters: () => void;
  showBookmarked: boolean;
  toggleBookmarked: () => void;
}

export function PlatformFilters({
  selectedPlatforms,
  togglePlatform,
  clearFilters,
  selectAllFilters,
  showBookmarked,
  toggleBookmarked,
}: PlatformFiltersProps) {
  const allPlatforms: FilterPlatform[] = ["codeforces", "codechef", "leetcode"];
  
  return (
    <div className="bg-card/80 backdrop-blur-sm p-4 rounded-lg border animate-fadeIn">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Filter by Platform</h3>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs"
              onClick={selectAllFilters}
            >
              All
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs"
              onClick={clearFilters}
            >
              None
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {allPlatforms.map((platform) => (
            <Badge
              key={platform}
              variant="outline"
              className={cn(
                "cursor-pointer capitalize transition-all duration-300 select-none",
                `platform-badge-${platform}`,
                selectedPlatforms.includes(platform)
                  ? "opacity-100"
                  : "opacity-50 hover:opacity-80"
              )}
              onClick={() => togglePlatform(platform)}
            >
              {selectedPlatforms.includes(platform) && (
                <CheckIcon className="mr-1 h-3 w-3" />
              )}
              {platform}
            </Badge>
          ))}
          <Badge
            variant="outline"
            className={cn(
              "cursor-pointer transition-all duration-300 select-none",
              showBookmarked
                ? "bg-primary/10 text-primary border-primary/20 opacity-100"
                : "opacity-50 hover:opacity-80"
            )}
            onClick={toggleBookmarked}
          >
            {showBookmarked ? (
              <CheckIcon className="mr-1 h-3 w-3" />
            ) : null}
            Bookmarked
          </Badge>
        </div>
      </div>
    </div>
  );
}
