
/**
 * Formats a date string to a human-readable date
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Calculates time remaining until a given date
 * @param dateString - ISO date string
 * @returns Object containing time remaining details
 */
export const getTimeRemaining = (dateString: string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
} => {
  const total = Date.parse(dateString) - Date.now();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  
  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
};

/**
 * Formats duration in seconds to a human-readable format
 * @param durationInSeconds - Duration in seconds
 * @returns Formatted duration string
 */
export const formatDuration = (durationInSeconds: number): string => {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  }
  
  return `${minutes}m`;
};

/**
 * Returns a formatted time remaining string
 * @param dateString - ISO date string
 * @returns Formatted time remaining string
 */
export const getFormattedTimeRemaining = (dateString: string): string => {
  const { days, hours, minutes } = getTimeRemaining(dateString);
  
  if (days > 0) {
    return `${days}d ${hours}h remaining`;
  }
  
  if (hours > 0) {
    return `${hours}h ${minutes}m remaining`;
  }
  
  return `${minutes}m remaining`;
};
