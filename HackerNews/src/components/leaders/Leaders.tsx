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
};

export default Leaders;