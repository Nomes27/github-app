const formatQuestions = (data) => {
  const formattedQuestions = [];
  data.forEach((item) => {
    const question = {};
    question.question = item.question;
    question.all_answers = [...item.incorrect_answers];
    const position = Math.floor(Math.random() * 4);
    question.all_answers.splice(position, 0, item.correct_answer);
    question.correct_answer = item.correct_answer;
    formattedQuestions.push(question);
  });

  return formattedQuestions;
};

export default formatQuestions;
