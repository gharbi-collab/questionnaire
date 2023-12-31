const Passed_Quiz = require("../models/Passed_Quiz");
const Quizz = require("../models/Quizz");

async function getUserQuiz(id) {
  const data = await Passed_Quiz.find({ user_id: id });
    console.log({data});
  const response = {};
  
  for(let i = 0; i < data.length; ++i) {
      const quizzes = data[i].quiz;
      const ID = data[i].id;
      for(let j = 0; j < quizzes.length; ++j) {
          
          const id = quizzes[j].quiz_id;
          const answer = quizzes[j].answer;

          const quiz = await Quizz.findById(id);
          
          const responseObject = {
              user_answer    : answer,
              correct_answer : quiz.correct_answer,
              answers        : quiz.answers,
              quiz           : quiz.question,
              explanation    : quiz.explanation,
              is_correct     : quiz.correct_answer === answer,
              passed_at      : data[i].createdAt
          }
          if(!(quiz.language in response)){
              response[quiz.language] = {};
          } 
          if (!(ID in response [ quiz.language ])) {
            response[quiz.language][ID] = [];
          }
          response[quiz.language][ID].push(responseObject);
        }
    }
    
    console.log({ response });

    return response;
}

module.exports = getUserQuiz