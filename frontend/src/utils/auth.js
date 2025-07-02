import { useAuth } from "@clerk/clerk-react";

// Custom hook for authenticated API calls
export const useAuthenticatedFetch = () => {
  const { getToken, isSignedIn } = useAuth();

  const authenticatedFetch = async (url, options = {}) => {
    if (!isSignedIn) {
      throw new Error("User not authenticated. Please sign in.");
    }

    try {
      const token = await getToken();

      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication expired. Please sign in again.");
        } else if (response.status === 403) {
          throw new Error(
            "Access denied. You don't have permission to perform this action."
          );
        } else if (response.status === 404) {
          throw new Error("Resource not found.");
        } else if (response.status >= 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error(
            `Request failed: ${response.status} ${response.statusText}`
          );
        }
      }

      return response;
    } catch (error) {
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        throw new Error("Network error. Please check your connection.");
      }
      throw error;
    }
  };

  return { authenticatedFetch, isSignedIn };
};

// Utility function to handle API errors
export const handleApiError = (error) => {
  console.error("API Error:", error);

  if (error.message.includes("Authentication")) {
    return "Please sign in to continue.";
  } else if (error.message.includes("Network")) {
    return "Connection error. Please check your internet connection.";
  } else if (error.message.includes("Server")) {
    return "Server is temporarily unavailable. Please try again later.";
  } else {
    return error.message || "An unexpected error occurred. Please try again.";
  }
};
