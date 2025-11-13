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
      </div>
    </QuizProvider>
  );
}

export default App
