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
};