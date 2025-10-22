const apiUrl = "https://opentdb.com/api.php";

export const fetchQuiz = async (
  amount: number,
  category: string,
  difficulty: string,
  type: string
) => {
  const url = `${apiUrl}?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
  
};
