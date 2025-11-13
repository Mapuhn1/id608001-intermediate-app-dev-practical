import { useState, useEffect } from "react";
import { Calendar, ExternalLink, Award, Heart } from "lucide-react";
import { leaders } from "./leaders-data";
import { useFavourites } from "../stories/useFavourites";

const Leaders = () => {
  const [loading, setLoading] = useState(true);
  const [leadersData, setLeadersData] = useState([]);
  const { favourites, toggle } = useFavourites();

  useEffect(() => {
    Promise.all(
      leaders.map(async (leader) => {
        try {
          const res = await fetch(`https://hacker-news.firebaseio.com/v0/user/${leader.id}.json`);
          const data = await res.json();
          return { ...leader, created: data.created, about: data.about };
        } catch {
          return leader;
        }
      })
    ).then(data => {
      setLeadersData(data);
      setLoading(false);
    });
  }, []);

  const getKarmaColor = (k) => {
    if (k >= 5001) return "bg-blue-500 text-white";
    if (k >= 1001) return "bg-green-500 text-white";
    if (k >= 501) return "bg-yellow-500 text-white";
    if (k >= 101) return "bg-orange-500 text-white";
    return "bg-red-500 text-white";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Top Leaders</h2>
      <div className="space-y-6">
        {leadersData.map((leader, i) => (
          <div key={leader.id} className="bg-white rounded-lg shadow-md hover:shadow-lg p-6 border border-gray-200">
            <div className="flex justify-between gap-4 mb-3">
              <div className="flex gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center flex-shrink-0">
                  #{i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{leader.id}</h3>
                  <a href={`https://news.ycombinator.com/user?id=${leader.id}`} target="_blank" rel="noopener noreferrer"
                     className="text-sm text-gray-500 hover:text-orange-600 inline-flex items-center gap-1">
                    View Profile <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <button onClick={() => toggle(leader.id, { id: leader.id, title: leader.id, karma: leader.karma })} 
                      className="text-gray-400 hover:text-red-500">
                <Heart className={`w-6 h-6 ${favourites.has(leader.id) ? "fill-red-500 text-red-500" : ""}`} />
              </button>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getKarmaColor(leader.karma)}`}>
                <Award className="w-4 h-4" />{leader.karma.toLocaleString()} karma
              </span>
              {leader.created && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {new Date(leader.created * 1000).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                </span>
              )}
            </div>

            {leader.about && (
              <div className="text-gray-700 text-sm bg-gray-50 p-4 rounded-lg"
                   dangerouslySetInnerHTML={{ __html: leader.about.substring(0, 200) + (leader.about.length > 200 ? "..." : "") }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaders;