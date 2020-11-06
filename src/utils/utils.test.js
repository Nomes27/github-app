const { formatQuestions } = require("./utils");
const axios = require("axios");

describe("formatQuestions", () => {
  it("returns an array of questions objects", () => {
    const data = [];

    const expected = [];
    expect(formatQuestions(data)).toEqual(expected);
  });
});
/*
axios
      .get("https://opentdb.com/api.php?amount=10&type=multiple")
      .then((questions) => {*/
