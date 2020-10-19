const inquirer = require("inquirer");
const axios = require("axios");

const url = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=boolean";

axios.get(url)
  .then(function (response) {
    let correct = 0;
    let questionsIdx = 0;

    const questions = response.data.results;
    const question = questions[questionsIdx];

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'question',
          message: question.question,
          choices: ['True', 'False']
        }
      ])
      .then(answers => {
        if (answers.question === question.correct_answer) {
          correct += 1;
          console.log("Correct!");
        } else {
          console.log("Incorrect :(");
        }
        console.log(`You've gotten ${correct} correct answers out of ${questions.length}!`);
      })
      .catch(error => {
        console.log(error)
      });
  })
  .catch(function (error) {
    console.log(error);
  });