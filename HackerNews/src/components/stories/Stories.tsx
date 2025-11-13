import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useState } from "react";
import LoadingSpinner from "../Spinner.tsx";

import { User, Clock, ExternalLink, Heart, Search } from "lucide-react";
import { fetchStoriesByType } from "./API";

const Stories = () => {
  const [searchParams] = useSearchParams();
  const storyType = searchParams.get("type") || "top";

  const [expandedStories, setExpandedStories] = useState(new Set());
  const [favourites, setFavourites] = useState(new Set());
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("time");


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
    const searchWords = search.toLowerCase();
    return (
      story.title?.toLowerCase().includes(searchWords) ||
      storyType.toLowerCase().includes(searchWords)
    );
  });

  const sortedStories = [...(filteredStories || [])].sort((a, b) => {
    if (sortBy === "time") {
      return b.time - a.time; 
    } else if (sortBy === "score") {
      return (b.score || 0) - (a.score || 0);
    } else if (sortBy === "type") {
      return storyType.localeCompare(storyType);
    }
    return 0;
  });

if (isLoading) {
  return <LoadingSpinner />;
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8 bg-white shadow-sm border border-gray-200 rounded-lg p-3">
        <Search className="text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search stories by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-gray-800 placeholder-gray-400"
        />
      </div>

      <div className="flex items-center gap-3 mb-6 bg-white shadow-sm border border-gray-200 rounded-lg p-3">
        <span className="text-gray-700 font-medium">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="outline-none text-gray-800 bg-transparent cursor-pointer"
        >
          <option value="time">Time (Newest)</option>
          <option value="score">Score (Highest)</option>
        </select>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 capitalize">
          {storyType} Stories
        </h2>
        <p className="text-gray-600 mt-2">
          {filteredStories?.length || 0} results found
        </p>
      </div>

      {filteredStories?.length === 0 && (
        <p className="text-center text-gray-500 italic mt-10">
          No stories found matching "{search}".
        </p>
      )}

      <div className="space-y-6">
        {filteredStories?.map((story: any) => (
          <div
            key={story.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg p-6 border border-gray-200"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
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
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
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
            </div>

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
              </div>
            )}

            <a
              href={`https://news.ycombinator.com/item?id=${story.id}`}
              className="inline-flex items-center gap-2 text-pink-600 font-medium text-sm"
            >
              View on Hacker News
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;