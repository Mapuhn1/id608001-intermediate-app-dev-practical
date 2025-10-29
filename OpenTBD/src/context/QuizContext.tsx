import { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';

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

};
