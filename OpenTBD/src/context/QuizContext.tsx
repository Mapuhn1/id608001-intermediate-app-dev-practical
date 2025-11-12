import { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { useCategories } from '../hooks/useCategories';

const QuizContext = createContext(undefined);

export const QuizProvider = ({ children }) => {
    const [quizzes, setQuizzes] = useState([]);
    const [results, setResults] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setQuizzes(storage.getQuizzes());
        setResults(storage.getResults());
    }, []);

    const addQuiz = (quiz) => {
        storage.saveQuiz(quiz);
        setQuizzes((prev) => [...prev, quiz]);
    };

  const addResult = (result) => {
    storage.saveResult(result);
    setResults((prev) => [...prev, result]);
  };

  return (
    <QuizContext.Provider
      value=
      {{ 
        quizzes, 
        results, 
        categories, 
        setCategories, 
        addQuiz, 
        addResult 
    }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error('useQuiz must be used within QuizProvider');
  return context;
};