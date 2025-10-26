const apiUrl = "https://opentdb.com/api.php";

export const fetchQuiz = async (
  amount: number,
  category: string,
  difficulty: string,
  type: string
) => {
  const url = `${apiUrl}?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
  const response = await fetch(url); 
  const data = await response.json();
  return data.results;
};

export const fetchCategories = async () => {
  const response = await fetch (`https://opentdb.com/api_category.php`);
  const data = await response.json();
  return data.trivia_categories;
};
