import { wordfind } from "../plugins/wordfind";

const HIDDEN_WORDS = [
  "hello",
  "world",
  "burger",
  "drive",
  "girls",
  "goverment",
  "kimono",
  "man",
  "black",
  "alphabet"
];

function createField(size) {
  const RESULT = wordfind.newPuzzle(HIDDEN_WORDS, {
    height: size,
    width: size,
    orientations: ["horizontal", "vertical", "diagonal"],
    fillBlanks: true,
    preferOverlap: false
  });

  return RESULT;
}

function findWord(field, word) {
  const RESULT = [];
  if (!word) return;
  const WORD_LETTERS = word.split("");
  let checkCoordinates = [];
  field.map((lettersList, fieldY) => {
    lettersList.map((letter, fieldX) => {
      if (letter === WORD_LETTERS[0]) {
        checkCoordinates.push({
          x: fieldX,
          y: fieldY
        });
      }
    });
  });
  checkCoordinates = checkCoordinates.reduce((result, pos) => {
    const DIRECTION = wordHasDirection(field, pos, WORD_LETTERS[1]);
    if (DIRECTION) {
      pos.direction = DIRECTION;
      result.push(pos);
    }
    return result;
  }, []);
  for (let i = 0; i < checkCoordinates.length; i++) {
    const pos = checkCoordinates[i];

    const wordCoordinates = checkWord(field, pos, pos.direction, WORD_LETTERS);
    if (wordCoordinates.length === WORD_LETTERS.length) {
      RESULT.push(...wordCoordinates);
      break;
    }
  }
  return RESULT;
}

function wordHasDirection(field, pos, letter) {
  let result;
  if (field[pos.y] && field[pos.y][pos.x + 1] === letter) {
    result = "horizontal";
  } else if (field[pos.y + 1] && field[pos.y + 1][pos.x] === letter) {
    result = "vertical";
  } else if (field[pos.y + 1] && field[pos.y + 1][pos.x + 1] === letter) {
    result = "diagonal";
  } else {
    return false;
  }
  return result;
}

function checkWord(field, pos, direction, wordLettersList) {
  let beginCheckIndex = 2;
  let findWordCoordinats = [
    {
      x: pos.x,
      y: pos.y
    }
  ];

  switch (direction) {
    case "horizontal":
      findWordCoordinats.push({
        x: pos.x + 1,
        y: pos.y
      });

      for (let i = beginCheckIndex; i < wordLettersList.length; i++) {
        if (field[pos.y][pos.x + i] === wordLettersList[i]) {
          findWordCoordinats.push({
            x: pos.x + i,
            y: pos.y
          });
        }
      }

      break;
    case "vertical":
      findWordCoordinats.push({
        x: pos.x,
        y: pos.y + 1
      });

      for (let i = beginCheckIndex; i < wordLettersList.length; i++) {
        if (
          field[pos.y + i] &&
          field[pos.y + i][pos.x] === wordLettersList[i]
        ) {
          findWordCoordinats.push({
            x: pos.x,
            y: pos.y + i
          });
        }
      }

      break;
    case "diagonal":
      findWordCoordinats.push({
        x: pos.x + 1,
        y: pos.y + 1
      });

      for (let i = beginCheckIndex; i < wordLettersList.length; i++) {
        if (
          field[pos.y + i] &&
          field[pos.y + i][pos.x + i] &&
          field[pos.y + i][pos.x + i] === wordLettersList[i]
        ) {
          findWordCoordinats.push({
            x: pos.x + i,
            y: pos.y + i
          });
        }
      }

      break;
  }
  return findWordCoordinats;
}

export { createField, findWord };
