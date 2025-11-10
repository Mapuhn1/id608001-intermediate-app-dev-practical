import { useQuizzes } from '../../hooks/useQuizzes';
import { QuizCard } from '../shared/QuizCard';

export const QuizList = ({ onPlayQuiz }) => {
  const { categorizeQuizzes } = useQuizzes();
  const { past, current, future } = categorizeQuizzes();

};