<template>
  <div class="word-table">
    <div class="word-table-head">
      <p class="title">Words</p>
    </div>
    <div class="words-list">
      <word-item
        v-for="(item, index) in $store.state.foundedWordsAndUsers"
        :key="index"
        :word="item.word"
        :userName="item.name"
        :status="item.status"
      />
    </div>
  </div>
</template>

<script>
import WordItem from "./WordItem";
export default {
  name: "WordTable",
  components: {
    WordItem
  }
};
</script>

<style lang="scss" scoped>
.word-table {
  position: fixed;
  width: 420px;
  background-color: var(--darkpurple);
  height: 100vh;
  overflow: auto;
  &-head {
    padding: 17px 20px;
    border-bottom: 1px solid #000;
    p.title {
      text-align: left;
      font-style: normal;
      font-size: 22px;
      line-height: 21px;
      text-transform: uppercase;
      color: #fff;
    }
  }
}

.words-list {
  padding: 10px;
}
</style>
