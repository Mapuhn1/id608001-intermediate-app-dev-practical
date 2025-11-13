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
};