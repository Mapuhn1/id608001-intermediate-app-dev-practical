import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

export const QuizPlayer = ({ quiz, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
};