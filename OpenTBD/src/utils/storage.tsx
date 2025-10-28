export const storage = {
  // Get all quizzes
  getQuizzes: () => {
    return JSON.parse(localStorage.getItem('quizzes') || '[]');
  },
  
  // Save a new quiz
  saveQuiz: (quiz) => {
    const quizzes = storage.getQuizzes();
    quizzes.push(quiz);
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
  },
  
  // Get all results
  getResults: () => {
    return JSON.parse(localStorage.getItem('results') || '[]');
  },
  
  // Save a quiz result
  saveResult: (result) => {
    const results = storage.getResults();
    results.push(result);
    localStorage.setItem('results', JSON.stringify(results));
  },
};