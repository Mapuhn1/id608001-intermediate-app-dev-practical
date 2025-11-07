import { Card, CardHeader, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { CategoryBadge } from './CategoryBadge';
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
        </div>
      </CardHeader>
    </Card>
  );
};