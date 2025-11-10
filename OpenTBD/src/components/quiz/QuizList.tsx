import { useQuizzes } from '../../hooks/useQuizzes';
import { QuizCard } from '../shared/QuizCard';

export const QuizList = ({ onPlayQuiz }) => {
  const { categorizeQuizzes } = useQuizzes();
  const { past, current, future } = categorizeQuizzes();

  if (past.length === 0 && current.length === 0 && future.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        No quizzes created yet.
      </div>
    );
  }
};