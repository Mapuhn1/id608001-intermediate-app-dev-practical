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

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
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

      {future.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-blue-600">Future Quizzes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {future.map(quiz => (
              <QuizCard 
                key={quiz.id} 
                quiz={quiz} 
                status="future"
                onPlay={() => {}}
              />
            ))}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-gray-600">Past Quizzes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {past.map(quiz => (
              <QuizCard 
                key={quiz.id} 
                quiz={quiz} 
                status="past"
                onPlay={() => {}}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};