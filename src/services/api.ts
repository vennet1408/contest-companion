
import { Contest } from "@/types/contest";

// Base URL for API
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

/**
 * Fetches upcoming contests from the API
 * @param platforms - Array of platforms to filter by
 * @returns Promise that resolves to an array of upcoming contests
 */
export const getUpcomingContests = async (platforms: string[] = []): Promise<Contest[]> => {
  const params = new URLSearchParams();
  
  if (platforms.length > 0) {
    params.append("platforms", platforms.join(","));
  }
  
  try {
    const response = await fetch(`${API_URL}/contests/upcoming?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch upcoming contests:", error);
    return [];
  }
};

/**
 * Fetches past contests from the API
 * @param platforms - Array of platforms to filter by
 * @returns Promise that resolves to an array of past contests
 */
export const getPastContests = async (platforms: string[] = []): Promise<Contest[]> => {
  const params = new URLSearchParams();
  
  if (platforms.length > 0) {
    params.append("platforms", platforms.join(","));
  }
  
  try {
    const response = await fetch(`${API_URL}/contests/past?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch past contests:", error);
    return [];
  }
};

/**
 * Toggles bookmark status for a contest
 * @param id - Contest ID
 * @param isBookmarked - New bookmark status
 * @returns Promise that resolves to the updated contest
 */
export const bookmarkContest = async (id: string, isBookmarked: boolean): Promise<Contest> => {
  try {
    const response = await fetch(`${API_URL}/contests/${id}/bookmark`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isBookmarked }),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to ${isBookmarked ? 'bookmark' : 'unbookmark'} contest:`, error);
    throw error;
  }
};

/**
 * Updates solution URL for a contest
 * @param id - Contest ID
 * @param solutionUrl - URL to the solution
 * @returns Promise that resolves to the updated contest
 */
export const updateSolutionUrl = async (id: string, solutionUrl: string): Promise<Contest> => {
  try {
    const response = await fetch(`${API_URL}/contests/${id}/solution`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ solutionUrl }),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Failed to update solution URL:", error);
    throw error;
  }
};

/**
 * Triggers a synchronization of contests from all platforms
 * @returns Promise that resolves when the sync is complete
 */
export const syncContests = async (): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${API_URL}/contests/sync`, {
      method: "POST",
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Failed to sync contests:", error);
    throw error;
  }
};
