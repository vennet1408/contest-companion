
import { useState } from "react";
import { Contest } from "@/types/contest";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bookmark, ExternalLink, LinkIcon, Timer, Calendar } from "lucide-react";
import { TimeRemaining } from "@/components/TimeRemaining";
import { formatDate, formatDuration } from "@/utils/dateUtils";
import { bookmarkContest, updateSolutionUrl } from "@/services/api";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ContestCardProps {
  contest: Contest;
  isPast?: boolean;
  onContestUpdated: (updatedContest: Contest) => void;
}

export function ContestCard({ contest, isPast = false, onContestUpdated }: ContestCardProps) {
  const [isUpdatingSolution, setIsUpdatingSolution] = useState(false);
  const [solutionUrl, setSolutionUrl] = useState(contest.solutionUrl || "");
  const [isTogglingBookmark, setIsTogglingBookmark] = useState(false);
  
  const handleToggleBookmark = async () => {
    if (isTogglingBookmark) return;
    
    setIsTogglingBookmark(true);
    try {
      const updatedContest = await bookmarkContest(contest.id, !contest.isBookmarked);
      onContestUpdated(updatedContest);
      toast({
        title: updatedContest.isBookmarked ? "Contest bookmarked" : "Bookmark removed",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update bookmark",
        variant: "destructive",
      });
    } finally {
      setIsTogglingBookmark(false);
    }
  };
  
  const handleUpdateSolution = async () => {
    if (!solutionUrl.trim()) return;
    
    setIsUpdatingSolution(true);
    try {
      const updatedContest = await updateSolutionUrl(contest.id, solutionUrl);
      onContestUpdated(updatedContest);
      setIsUpdatingSolution(false);
      toast({
        title: "Solution URL updated",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update solution URL",
        variant: "destructive",
      });
      setIsUpdatingSolution(false);
    }
  };
  
  // Animation delay based on index for staggered entrance
  const getRandomDelay = () => `${Math.random() * 0.3}s`;
  
  return (
    <Card className={cn(
      "card-glass overflow-hidden hover:translate-y-[-2px] transition-all",
      contest.isBookmarked && "ring-1 ring-primary/30"
    )} 
    style={{ animationDelay: getRandomDelay() }}>
      <CardContent className="p-5">
        <div className="flex justify-between items-start gap-2 mb-3">
          <Badge 
            variant="outline"
            className={`platform-badge-${contest.platform} capitalize`}
          >
            {contest.platform}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full transition-all duration-300",
              contest.isBookmarked && "text-primary"
            )}
            onClick={handleToggleBookmark}
            disabled={isTogglingBookmark}
          >
            <Bookmark
              className={cn(
                "h-4 w-4",
                contest.isBookmarked && "fill-primary"
              )}
            />
            <span className="sr-only">
              {contest.isBookmarked ? "Remove bookmark" : "Bookmark"}
            </span>
          </Button>
        </div>
        
        <h3 className="text-lg font-medium mb-2 line-clamp-2">{contest.name}</h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(contest.startTime)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Timer className="h-4 w-4" />
            <span>Duration: {formatDuration(contest.duration)}</span>
          </div>
          
          {!isPast && (
            <div className="flex items-center gap-2 text-primary font-medium">
              <TimeRemaining startTime={contest.startTime} />
            </div>
          )}
          
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 text-xs h-8"
              asChild
            >
              <a href={contest.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" />
                Open Contest
              </a>
            </Button>
            
            {isPast && (
              <div className="flex items-center gap-2">
                {contest.solutionUrl ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-xs h-8"
                    asChild
                  >
                    <a href={contest.solutionUrl} target="_blank" rel="noopener noreferrer">
                      <LinkIcon className="h-3.5 w-3.5" />
                      View Solution
                    </a>
                  </Button>
                ) : (
                  <div className="flex items-center gap-1">
                    <Input
                      type="url"
                      placeholder="Add solution URL"
                      value={solutionUrl}
                      onChange={(e) => setSolutionUrl(e.target.value)}
                      className="h-8 text-xs w-[140px]"
                    />
                    <Button
                      variant="default"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={handleUpdateSolution}
                      disabled={isUpdatingSolution || !solutionUrl.trim()}
                    >
                      Save
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
