import { Outlet } from 'react-router';

function App() {

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[1280px] px-8 text-center">
        <header className="bg-gradient-to-r from-pink-500 to-pink-200">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-white">
              HackerNews Application
            </h1>
          </div>
        </header>
      </div>
    </div>
  );
}

export default App
