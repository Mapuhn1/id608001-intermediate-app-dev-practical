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
      {current.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-green-600">Current Quizzes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {current.map(quiz => (
              <QuizCard 
                key={quiz.id} 
                quiz={quiz} 
                status="current"
                onPlay={onPlayQuiz}
              />
            ))}
          </div>
        </div>
      )}

};