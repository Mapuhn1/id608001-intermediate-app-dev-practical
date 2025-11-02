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
};