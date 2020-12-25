<template>
  <div class="field">
    <div class="field-head">
      <p class="title">Round: <b>1</b>/20</p>
    </div>
    <div class="field-map">
      <div
        class="letters-row row between-xs"
        v-for="(lettersList, index) in renderField"
        :key="index"
      >
        <div
          class="letter"
          v-for="(letterObj, index) in lettersList"
          :key="index"
          :class="{ isWord: letterObj.isWord }"
        >
          {{ letterObj.letter }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createField, findWord } from "../utils/WordGame";
import PublicAPI from "../utils/PublicAPI";

export default {
  name: "GameField",
  data() {
    return {
      field: null,
      renderField: null
    };
  },
  async mounted() {
    this.field = createField(20);
    this.renderField = this.field.map(lettersList => {
      return lettersList.map(letter => {
        return {
          letter: letter,
          isWord: false
        };
      });
    });
    const res = await PublicAPI.getWord();
    const WORD = res.word;
    const FINDED_WORD = findWord(this.field, WORD);
    if (FINDED_WORD) {
      this.wordFindedHandler(FINDED_WORD);
      this.$store.commit("ADD_FINDED_WORD", {
        word: WORD,
        name: res.name,
        status: true
      });
    }
    setInterval(async () => {
      const res = await PublicAPI.getWord();
      const WORD = res.word;
      const FINDED_WORD = findWord(this.field, WORD);
      if (FINDED_WORD.length) {
        this.wordFindedHandler(FINDED_WORD);
        this.$store.commit("ADD_FINDED_WORD", {
          word: WORD,
          name: res.name,
          status: true
        });
      } else {
        this.$store.commit("ADD_FINDED_WORD", {
          word: WORD,
          name: res.name,
          status: false
        });
      }
    }, 1000);
  },
  methods: {
    wordFindedHandler(findedWord) {
      findedWord.map(letterObj => {
        this.renderField = this.renderField.map(
          (lettersList, lettersListIndex) => {
            if (lettersListIndex === letterObj.y) {
              lettersList.map((letter, letterIndex) => {
                if (letterIndex === letterObj.x) {
                  letter.isWord = true;
                }
                return letter;
              });
            }
            return lettersList;
          }
        );
      });
    },
    clearFieldFromHighLights() {
      this.renderField = this.field.map(lettersList => {
        return lettersList.map(letter => {
          return {
            letter: letter,
            isWord: false
          };
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.field {
  border-radius: 20px;
  background-color: var(--purple);
  margin: 40px 20px;
  &-head {
    padding: 17px 20px;
    height: 60px;
    border-bottom: 1px solid #000;
    p.title {
      text-align: left;
      font-style: normal;
      font-weight: normal;
      font-size: 28px;
      line-height: 27px;
      color: #ffffff;
    }
  }
  &-map {
    display: flex;
    flex-direction: column;
    padding: 10px 15px;
    justify-content: space-between;
  }
}

.letter {
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  text-transform: uppercase;
  text-align: center;
  color: #ffffff;
  width: 30px;
  height: 30px;
  padding: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  &.isWord {
    background-color: var(--red);
  }
}
</style>
