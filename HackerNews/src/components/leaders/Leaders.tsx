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
};

export default Leaders;