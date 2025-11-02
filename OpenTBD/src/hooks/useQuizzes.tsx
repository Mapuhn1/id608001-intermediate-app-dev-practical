import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    setQuizzes(storage.getQuizzes());
  }, []);

  const addQuiz = (quiz) => {
    storage.saveQuiz(quiz);
    setQuizzes([...quizzes, quiz]);
  };

  const categorizeQuizzes = () => {
    const today = new Date();

    return {
      past: quizzes.filter(q => new Date(q.endDate) < today),
      current: quizzes.filter(q => 
        new Date(q.startDate) <= today && new Date(q.endDate) >= today
      ),
      future: quizzes.filter(q => new Date(q.startDate) > today)
    };
  };
};