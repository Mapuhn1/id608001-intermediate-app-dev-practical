import Stories from './Stories';

const storyTypes = ["top", "ask","best", "job", "new", "show", ];

const AllStories = () => {
  return (
    <div className="all-stories">
      {storyTypes.map((type) => (
        <Stories key={type} storyType={type} />
      ))}
    </div>
  );
};
