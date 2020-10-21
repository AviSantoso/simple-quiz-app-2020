const inquirer = require("inquirer");
const axios = require("axios");

const url = "https://opentdb.com/api.php?amount=10&category=9&type=boolean";

const main = async () => {
  try {
    const response = await axios.get(url);

    let correct = 0;

    const questions = response.data.results;

    for (let i = 0; i < questions.length; i++) {
      const currentQuestion = questions[i];

      const reply = await inquirer.prompt([
        {
          type: 'list',
          name: 'answer',
          message: currentQuestion.question,
          choices: ['True', 'False']
        }
      ]);

      if (reply.answer === currentQuestion.correct_answer) {
        correct += 1;
        console.log("Correct!");
      } else {
        console.log("Incorrect!");
      }
    }

    console.log(`You got ${correct} answers correct out of ${questions.length}!`);
  } catch (err) {
    console.log(err);
  }
}

main();
