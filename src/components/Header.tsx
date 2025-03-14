
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { syncContests } from "@/services/api";
import { toast } from "@/hooks/use-toast";
import { RefreshCw } from "lucide-react";

export function Header() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSync = async () => {
    setIsRefreshing(true);
    try {
      const result = await syncContests();
      toast({
        title: "Success",
        description: result.message || "Contests synchronized successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to synchronize contests",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  // Header visibility on scroll
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlHeader = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlHeader);
      return () => {
        window.removeEventListener('scroll', controlHeader);
      };
    }
  }, [lastScrollY]);

  return (
    <header 
      className={`sticky top-0 z-40 w-full backdrop-blur-xl bg-background/80 border-b transition-all duration-300 transform ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium tracking-tight">
            <span className="text-primary font-semibold">Contest</span>Tracker
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1"
            onClick={handleSync}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline-block">Refresh</span>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
