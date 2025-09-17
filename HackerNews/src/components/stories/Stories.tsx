import { useQuery } from "@tanstack/react-query";
import '../../App.css';
import { useSearchParams } from "react-router";


const Stories = () => {
  const [searchParams] = useSearchParams();
  const storyType = searchParams.get("type") || "top";

  const { isLoading, error, data } = useQuery({
    queryKey: [storyType],
    queryFn: async () => fetchStoriesByType(storyType),
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