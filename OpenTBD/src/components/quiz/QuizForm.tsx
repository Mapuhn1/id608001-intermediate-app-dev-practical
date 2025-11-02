import { useState } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { useQuiz } from '../../context/QuizContext';
import { fetchQuiz } from '../API';
import { Button } from '../ui/button';
import { Spinner } from '../shared/Spinner';

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

    try {
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

      setForm({
        amount: 10,
        category: '',
        difficulty: '',
        type: '',
        startDate: '',
        endDate: ''
      });
    } catch (error) {
      alert('Failed to create quiz');
    } finally {
      setLoading(false);
    }
  };

  if (loadingCategories) return <Spinner />;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <p>Create New Quiz</p>

      <form onSubmit={handleSubmit} className="space-y-4"></form>
    </div>
  );
};