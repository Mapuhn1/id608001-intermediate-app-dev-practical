import { useState } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export const QuizResults = ({ resultData, onBack }) => {
  const { addResult } = useQuiz();
  const [userName, setUserName] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!userName.trim()) {
      alert('Please enter your name');
      return;
    }

    const result = {
      ...resultData,
      userName,
      id: Date.now(),
      completedAt: new Date().toISOString()
    };

    addResult(result);
    setSaved(true);
  };
};