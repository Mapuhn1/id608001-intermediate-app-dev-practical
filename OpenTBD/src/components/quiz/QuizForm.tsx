import { useState } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { useQuiz } from '../../context/QuizContext';
import { fetchQuiz } from '../API';
export const QuizBuilder = () => {
  const { categories, loading: loadingCategories } = useCategories();
  const { addQuiz } = useQuiz();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    amount: 10,
    category: '',
    difficulty: '',
    type: '',
    startDate: '',
    endDate: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.startDate || !form.endDate) {
      alert('Please select dates');
      return;
    }

    setLoading(true);

      const questions = await fetchQuiz(
        form.amount,
        form.category,
        form.difficulty,
        form.type
      );

      const newQuiz = {
        id: Date.now(),
        ...form,
        questions,
        createdAt: new Date().toISOString()
      };

      addQuiz(newQuiz);
      alert('Quiz created successfully!');
