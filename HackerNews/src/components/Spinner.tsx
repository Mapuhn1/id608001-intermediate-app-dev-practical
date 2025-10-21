const LoadingSpinner = ({ size = 16, color = "pink-500", fullScreen = true }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "min-h-screen" : ""
      }`}
    >
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-t-4 border-b-4 border-${color}`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
