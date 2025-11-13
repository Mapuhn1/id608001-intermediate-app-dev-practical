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
      </div>
    </QuizProvider>
}

export default App
