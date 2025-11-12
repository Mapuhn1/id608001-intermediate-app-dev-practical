import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

export const QuizPlayer = ({ quiz, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    const shuffled = quiz.questions
      .map(q => ({
        ...q,
        allAnswers: [...q.incorrect_answers, q.correct_answer]
          .sort(() => Math.random() - 0.5)
      }))
      .sort(() => Math.random() - 0.5);

    setShuffledQuestions(shuffled);
  }, [quiz]);

  const handleAnswer = (answer) => {
    const updated = [...answers];
    updated[currentQuestion] = answer;
    setAnswers(updated);
  };
};