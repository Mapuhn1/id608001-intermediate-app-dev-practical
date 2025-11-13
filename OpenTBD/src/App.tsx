import { useState } from 'react';
import { QuizProvider } from './context/QuizContext';
import { QuizBuilder } from './components/quiz/QuizForm';
import { QuizList } from './components/quiz/QuizList';
import { QuizPlayer } from './components/quiz/QuizPlayer';
import { QuizResults } from './components/quiz/QuizResults';
import { Button } from './components/ui/button';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [resultData, setResultData] = useState(null);

  const handlePlayQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setCurrentView('play');
  };

  const handleQuizComplete = (data) => {
    setResultData(data);
    setCurrentView('results');
  };

  return (
    <QuizProvider>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-md mb-6">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-pink-600">
                OpenTDB Quiz App
              </h1>
              <div className="flex gap-3">
                <Button
                  onClick={() => setCurrentView('home')}
                  variant={currentView === 'home' ? 'default' : 'outline'}
                >
                  Home
                </Button>
                <Button
                  onClick={() => setCurrentView('quizzes')}
                  variant={currentView === 'quizzes' ? 'default' : 'outline'}
                >
                  My Quizzes
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div>
          {currentView === 'home' && (
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold mb-4">
                  Welcome to OpenTDB Quiz App
                </h2>
              </div>
              <QuizBuilder />
            </div>
          )}

          {currentView === 'quizzes' && (
            <QuizList onPlayQuiz={handlePlayQuiz} />
          )}

          {currentView === 'play' && currentQuiz && (
            <QuizPlayer quiz={currentQuiz} onComplete={handleQuizComplete} />
          )}

          {currentView === 'results' && resultData && (
            <QuizResults
              resultData={resultData}
              onBack={() => {
                setCurrentView('home');
                setResultData(null);
                setCurrentQuiz(null);
              }}
            />
          )}
        </div>
      </div>
    </QuizProvider>
  );
}

export default App;
