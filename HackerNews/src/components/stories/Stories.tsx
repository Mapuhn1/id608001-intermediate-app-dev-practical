import { useQuery } from "@tanstack/react-query";
import '../../App.css';

const Stories = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["top-stories"],
    queryFn: async () => {
      const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
      const storyIds = await response.json();
      
      const first50Ids = storyIds.slice(0, 50);
      
      const stories = await Promise.all(
        first50Ids.map(id =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
        )
      );
      
      return stories;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Top Stories</h2>
      {data?.map((story) => (
        <div key={story.id}>
          <h3>{story.title}</h3>
          <p>By: {story.by}</p>
          <p>{new Date(story.time * 1000).toLocaleString()}</p>
          <p>{story.text}</p>
          <p>{story.score}</p>
          {story.url && (
            <a href={story.url}>
              Read more
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stories;