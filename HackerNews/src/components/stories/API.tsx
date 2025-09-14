export const fetchStoriesByType = async (type: string) => {
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/${type}stories.json`);
  const storyIds = await response.json();
  const limitedIds = storyIds.slice(0, 50);

};