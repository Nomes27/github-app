const formatQuestions = require("./utils/formatQuestions");
const roomCodeGenerator = require("./utils/roomCodeGenerator");
const axios = require("axios");

let data = {};

describe("formatQuestions", () => {
  it("returns an array of questions objects", () => {
    return axios
      .get("https://opentdb.com/api.php?amount=10&type=multiple")
      .then((response) => {
        data = response.data.results;
        expect(formatQuestions(data).length).toBe(10);
      });
  });

  it("the first item the array has keys of question, all_answers and correct_answer", () => {
    return axios
      .get("https://opentdb.com/api.php?amount=10&type=multiple")
      .then((response) => {
        data = response.data.results;
        expect(formatQuestions(data)[0].hasOwnProperty("question")).toBe(true);
        expect(formatQuestions(data)[0].hasOwnProperty("all_answers")).toBe(
          true
        );
        expect(formatQuestions(data)[0].hasOwnProperty("correct_answer")).toBe(
          true
        );
      });
  });

  it("returns an array of objects with correct key value pairs for question and answer", () => {
    const data = [
      {
        question: "what is 2+2",
        correct_answer: "4",
        incorrect_answers: ["1", "2", "3"],
      },
    ];
    expect(formatQuestions(data)[0].question).toBe("what is 2+2");
    expect(formatQuestions(data)[0].correct_answer).toBe("4");
  });

  it("the all answers key is an array of length 4", () => {
    const data = [
      {
        question: "what is 2+2",
        correct_answer: "4",
        incorrect_answers: ["1", "2", "3"],
      },
    ];
    expect(formatQuestions(data)[0].all_answers.length).toBe(4);
  });
});

describe("roomCodeGenerator", () => {
  it("returns a string", () => {
    expect(typeof roomCodeGenerator()).toBe("string");
  });
  it("returns a random for letter code", () => {
    expect(roomCodeGenerator(4).length).toBe(4);
  });
});
