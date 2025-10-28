export const storage = {
  // Get all quizzes
  getQuizzes: () => {
    return JSON.parse(localStorage.getItem('quizzes') || '[]');
  },

};