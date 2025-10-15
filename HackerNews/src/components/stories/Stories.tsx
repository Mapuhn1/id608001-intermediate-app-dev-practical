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
  const [search, setSearch] = useState("");

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
    if (!url) return null;
    try {
      const domain = url.split("//")[1]?.split("/")[0];
      return domain?.replace("www.", "");
    } catch {
      return null;
    }
  };
  const getTypeBadgeColor = (type) => {
    const colors: Record<string, string> = {
      ask: "bg-blue-100 text-blue-700 border-blue-200",
      best: "bg-green-100 text-green-700 border-green-200",
      job: "bg-yellow-100 text-yellow-700 border-yellow-200",
      new: "bg-purple-100 text-purple-700 border-purple-200",
      show: "bg-orange-100 text-orange-700 border-orange-200",
      top: "bg-red-100 text-red-700 border-red-200",
    };
    return colors[type] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getScoreBadgeColor = (score) => {
    if (score >= 5001) return "bg-blue-500 text-white";
    if (score >= 1001) return "bg-green-500 text-white";
    if (score >= 501) return "bg-yellow-500 text-white";
    if (score >= 101) return "bg-orange-500 text-white";
    return "bg-red-500 text-white";
  };

  const { isLoading, error, data } = useQuery({
    queryKey: [storyType],
    queryFn: async () => fetchStoriesByType(storyType),
  });


  const filteredStories = data?.filter((story: any) => {
 
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

                {story.url && (
                  <a
                    href={story.url}
                    className="text-sm text-gray-500 hover:text-pink-600 inline-flex items-center gap-1"
                  >
                    {getDomain(story.url)}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
             <button
  onClick={() => toggleFavourite(story.id, story)}
  className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
>
                <Heart
                  className={`w-6 h-6 ${favourites.has(story.id)
                      ? "fill-red-500 text-red-500"
                      : ""
                    }`}
                />
              </button>
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {story.by}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {new Date(story.time * 1000).toLocaleString()}
              </span>

              {story.score && (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${getScoreBadgeColor(
                    story.score
                  )}`}
                >
                  {story.score} points
                </span>
              )}

              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold border ${getTypeBadgeColor(
                  storyType
                )}`}
              >
                {storyType}
              </span>
            {story.text && (
              <div className="mb-4">
                <div
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: expandedStories.has(story.id)
                      ? story.text
                      : story.text.substring(0, 100) +
                      (story.text.length > 100 ? "..." : ""),
                  }}
                />
                {story.text.length > 100 && (
                  <button
                    onClick={() => toggleExpanded(story.id)}
                    className="text-pink-600 hover:text-pink-700 font-medium text-sm mt-2"
                  >
                    {expandedStories.has(story.id)
                      ? "Show less"
                      : "Read more"}
                  </button>
                )}
            <a
              href={`https://news.ycombinator.com/item?id=${story.id}`}
              className="inline-flex items-center gap-2 text-pink-600 font-medium text-sm"
            >
              View on Hacker News
              <ExternalLink className="w-4 h-4" />
            </a>
      </div>
    </div>
  );
};

export default Stories;