import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useState } from "react";

import { User, Clock, ExternalLink, Heart, Search } from "lucide-react";
import { fetchStoriesByType } from "./API";

const Stories = () => {
  const [searchParams] = useSearchParams();
  const storyType = searchParams.get("type") || "top";

  const [expandedStories, setExpandedStories] = useState(new Set());
  const [favourites, setFavourites] = useState(new Set());
  
  const toggleExpanded = (id) => {
    setExpandedStories((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };
const toggleFavourite = (id, story) => {
  const storedFavourites = JSON.parse(localStorage.getItem("favourites") || "[]");
  const exists = storedFavourites.some((item) => item.id === id);

  let updated;
  if (exists) {
    updated = storedFavourites.filter((item) => item.id !== id);
  } else {
    updated = [...storedFavourites, story];
  }

  localStorage.setItem("favourites", JSON.stringify(updated));

  setFavourites(new Set(updated.map((item) => item.id)));
};




  const getDomain = (url) => {
  
  };

  const { isLoading, error, data } = useQuery({
    queryKey: [storyType],
    queryFn: async () => fetchStoriesByType(storyType),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-semibold text-lg mb-2">
          Error Loading Stories
        </h3>
        <p className="text-red-600">{(error as Error).message}</p>
      </div>
    );
  }

  return (
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 capitalize">
          {storyType} Stories
        </h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {story.title}
                </h3>
      </div>
    </div>
  );
};

export default Stories;