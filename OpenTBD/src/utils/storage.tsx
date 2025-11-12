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
  
  // Get categories from cache
  getCategories: () => {
    const cached = localStorage.getItem('categories');
    const timestamp = localStorage.getItem('categoriesTimestamp');
    
    if (!cached || !timestamp) return null;
    
    // Check if cache is less than 24 hours old
    const age = Date.now() - parseInt(timestamp);
    const oneDay = 24 * 60 * 60 * 1000;
    
    if (age > oneDay) return null;
    
    return JSON.parse(cached);
  },
  
  // Save categories to cache
  saveCategories: (categories) => {
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('categoriesTimestamp', Date.now().toString());
  }
};