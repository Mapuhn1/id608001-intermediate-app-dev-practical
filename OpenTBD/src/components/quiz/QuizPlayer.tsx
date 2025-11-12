import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Spinner } from '../shared/Spinner';

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

  const handleNext = () => {
    setCurrentQuestion(prev => Math.min(prev + 1, shuffledQuestions.length - 1));
  };

  const handleSubmit = () => {
    const score = shuffledQuestions.reduce((totalCorrect, q, idx) => {
      return totalCorrect + (answers[idx] === q.correct_answer ? 1 : 0);
    }, 0);

    onComplete({ quiz, answers, shuffledQuestions, score, total: shuffledQuestions.length });
  };

  if (shuffledQuestions.length === 0) return <Spinner/>;

  const question = shuffledQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / shuffledQuestions.length) * 100;
  const isAnswered = answers[currentQuestion] !== undefined;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="sp ne-y-2">
            <div className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {shuffledQuestions.length}
            </div>
            <Progress value={progress} />
          </div>
        </CardHeader>

        <CardContent>
          <h3
            className="text-xl font-semibold mb-4"
            dangerouslySetInnerHTML={{ __html: question.question }}
          />
          <div className="space-y-3">
            {question.allAnswers.map((answer, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(answer)}
                className={`w-full text-left p-4 rounded-lg border-2 transition ${
                  answers[currentQuestion] === answer
                    ? 'border-pink-600 bg-pink-50'
                    : 'border-gray-200 hover:border-pink-300'
                }`}
              >
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </button>
            ))}
          </div>
        </CardContent>    
      </Card>
    </div>
  );
};