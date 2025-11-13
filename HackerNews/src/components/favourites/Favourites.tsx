import { Heart, ExternalLink, User, Clock, Trash2 } from "lucide-react";
import { useFavourites, getDomain } from "../stories/useFavourites";

const Favourites = () => {
  const { getAll, toggle } = useFavourites();
  const favourites = getAll();

  if (!favourites.length) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">You don't have any favourites yet.</p>
        <p className="text-gray-400 text-sm mt-2">Click the heart icon on any story to save it here!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Favourites</h1>
      <div className="space-y-6">
        {favourites.map(story => (
          <div key={story.id} className="bg-white rounded-lg shadow-md hover:shadow-lg p-6 border border-gray-200">
            <div className="flex justify-between gap-4 mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{story.title}</h3>
                {story.url && (
                  <a href={story.url} target="_blank" rel="noopener noreferrer" 
                     className="text-sm text-gray-500 hover:text-pink-600 inline-flex items-center gap-1">
                    {getDomain(story.url)} <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <button onClick={() => toggle(story.id, story)} className="text-red-500 hover:text-red-600 flex-shrink-0" title="Remove">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
              {story.by && <span className="flex items-center gap-1"><User className="w-4 h-4" />{story.by}</span>}
              {story.time && <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{new Date(story.time * 1000).toLocaleString()}</span>}
              {story.score && <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-500 text-white">{story.score} points</span>}
            </div>

            <a href={`https://news.ycombinator.com/item?id=${story.id}`}
               className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium text-sm">
              View on Hacker News <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;