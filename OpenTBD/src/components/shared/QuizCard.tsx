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
};