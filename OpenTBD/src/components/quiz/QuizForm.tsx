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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Number of Questions</label>
          <input
            type="number"
            min="1"
            max="50"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
        </div>

        <div>
          <label>Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="">Any Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Difficulty</label>
          <select
            value={form.difficulty}
            onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
          >
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label>Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True/False</option>
          </select>
        </div>

        <div>
          <label>Start Date</label>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            required
          />
        </div>

        <div>
          <label>End Date</label>
          <input
            type="date"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            required
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Creating Quiz...' : 'Create Quiz'}
        </Button>
      </form>
    </div>
  );
};