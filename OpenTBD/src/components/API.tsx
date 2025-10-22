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
