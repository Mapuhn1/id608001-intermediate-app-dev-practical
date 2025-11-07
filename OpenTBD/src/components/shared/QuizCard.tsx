import { Card, CardHeader, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { CategoryBadge } from './CategoryBadge';
import { Calendar, Play } from 'lucide-react' ;
import { useQuiz } from '../../context/QuizContext';

export const QuizCard = ({ quiz, status, onPlay }) => {
  const { categories } = useQuiz();
   const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === parseInt(categoryId));
    return category ? category.name : 'Unknown Category';
  };

  return (
    <Card> 
      <CardHeader>
        <div className="flex justify-between items-start">
          <CategoryBadge 
            categoryId={quiz.category} 
            categoryName={getCategoryName(quiz.category)} 
          />
          <span className={`text-xs px-2 py-1 rounded ${
            status === 'current' ? 'bg-green-100 text-green-800' :
            status === 'past' ? 'bg-gray-100 text-gray-600' :
            'bg-blue-100 text-blue-800'
          }`}>
            {status.toUpperCase()}
          </span>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date(quiz.startDate).toLocaleDateString()} - 
            {new Date(quiz.endDate).toLocaleDateString()}
          </div>
          <div>
            {quiz.amount} Questions -- {quiz.difficulty || 'Any'} --
            {quiz.type === 'multiple' ? 'Multiple Choice' : 
             quiz.type === 'boolean' ? 'True/False' : 'Any Type'}
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        {status === 'current' ? (
          <Button onClick={() => onPlay(quiz)} className="w-full">
            <Play className="w-4 h-4 mr-2" />
            Play Quiz
          </Button>
        ) : (
          <Button disabled className="w-full">
            Not Available
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};