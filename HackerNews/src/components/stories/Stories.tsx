import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useState } from "react";
import LoadingSpinner from "../Spinner.tsx";
import { User, Clock, ExternalLink, Heart, Search } from "lucide-react";
import { fetchStoriesByType } from "./API";
import { useFavourites, getDomain } from "./useFavourites.tsx";

const Stories = () => {
  const [searchParams] = useSearchParams();
  const storyType = searchParams.get("type") || "top";
  const [expandedStories, setExpandedStories] = useState(new Set());
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("time");
  const { favourites, toggle } = useFavourites();

  const { isLoading, error, data } = useQuery({
    queryKey: [storyType],
    queryFn: async () => fetchStoriesByType(storyType),
  });

  const filteredStories = data?.filter((story) =>
    story.title?.toLowerCase().includes(search.toLowerCase())
  );

  const sortedStories = [...(filteredStories || [])].sort((a, b) =>
    sortBy === "score" ? (b.score || 0) - (a.score || 0) : b.time - a.time
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="max-w-2xl mx-auto mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">Error: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8 bg-white shadow-sm border border-gray-200 rounded-lg p-3">
        <Search className="text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search stories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none"
        />
      </div>

      <div className="flex items-center gap-3 mb-6 bg-white shadow-sm border border-gray-200 rounded-lg p-3">
        <span className="text-gray-700 font-medium">Sort by:</span>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="outline-none cursor-pointer">
          <option value="time">Time (Newest)</option>
          <option value="score">Score (Highest)</option>
        </select>
      </div>

      <h2 className="text-3xl font-bold text-center mb-2 capitalize">{storyType} Stories</h2>
      <p className="text-center text-gray-600 mb-8">{sortedStories?.length || 0} results</p>

      <div className="space-y-6">
        {sortedStories?.map((story) => (
          <div key={story.id} className="bg-white rounded-lg shadow-md hover:shadow-lg p-6 border border-gray-200">
            <div className="flex justify-between gap-4 mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                {story.url && (
                  <a href={story.url} className="text-sm text-gray-500 hover:text-pink-600 inline-flex items-center gap-1">
                    {getDomain(story.url)} <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <button onClick={() => toggle(story.id, story)} className="text-gray-400 hover:text-red-500">
                <Heart className={`w-6 h-6 ${favourites.has(story.id) ? "fill-red-500 text-red-500" : ""}`} />
              </button>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
              <span className="flex items-center gap-1"><User className="w-4 h-4" />{story.by}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{new Date(story.time * 1000).toLocaleString()}</span>
              {story.score && <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-500 text-white">{story.score} points</span>}
            </div>

            {story.text && (
              <div className="mb-4">
                <div className="text-gray-700" dangerouslySetInnerHTML={{
                  __html: expandedStories.has(story.id) ? story.text : story.text.substring(0, 100) + (story.text.length > 100 ? "..." : "")
                }} />
                {story.text.length > 100 && (
                  <button onClick={() => setExpandedStories(prev => {
                    const next = new Set(prev);
                    next.has(story.id) ? next.delete(story.id) : next.add(story.id);
                    return next;
                  })} className="text-pink-600 hover:text-pink-700 font-medium text-sm mt-2">
                    {expandedStories.has(story.id) ? "Show less" : "Read more"}
                  </button>
                )}
              </div>
            )}

            <a href={`https://news.ycombinator.com/item?id=${story.id}`} className="inline-flex items-center gap-2 text-pink-600 font-medium text-sm">
              View on Hacker News <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;