import { useState } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { useQuiz } from '../../context/QuizContext';
import { fetchQuiz } from '../API';
  const { categories, loading: loadingCategories } = useCategories();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    amount: 10,
    category: '',
    difficulty: '',
    type: '',
    startDate: '',
    endDate: ''
  });

