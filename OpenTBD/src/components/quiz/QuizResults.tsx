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


  if (!saved) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardContent className="space-y-4">
            <p>You scored: {resultData.score} / {resultData.total}</p>
            <div>
              <Label>Enter your name to save results:</Label><br/>
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <Button onClick={handleSave} className="w-full">
              Save Results
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Results for {userName}</CardTitle>
        </CardHeader>
          <div className="text-center mb-6">
            <p className="text-4xl font-bold">
              {resultData.score} / {resultData.total}
            </p>
          </div>

          <div className="space-y-4">
            {resultData.shuffledQuestions.map((q, idx) => {
              const userAnswer = resultData.answers[idx];
              const isCorrect = userAnswer === q.correct_answer;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-lg ${
                    isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
                  }`}
                >
                  <p className="font-semibold mb-2">{`${idx + 1}. ${q.question}`}</p>
                  <p className="text-sm">
                    Your answer: <span>{userAnswer || 'Not answered' }</span>
                  </p>
                  {!isCorrect && (
                    <p className="text-sm text-green-700">
                      Correct answer: <span>{q.correct_answer }</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
      </Card>
    </div>
  );
};