import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useState } from "react";

import { User, Clock, ExternalLink, Heart, Search } from "lucide-react";
import { fetchStoriesByType } from "./API";

const Stories = () => {
  const [searchParams] = useSearchParams();
  const storyType = searchParams.get("type") || "top";

  const [expandedStories, setExpandedStories] = useState(new Set());
  const toggleExpanded = (id) => {
    setExpandedStories((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const { isLoading, error, data } = useQuery({
    queryKey: [storyType],
    queryFn: async () => fetchStoriesByType(storyType),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 capitalize">
          {storyType} Stories
        </h2>
      </div>
    </div>
  );
};

export default Stories;