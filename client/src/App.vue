<template>
  <div id="app">
    <div class="row end-xs">
      <div class="field-box">
        <game-field />
      </div>
      <word-table />
    </div>
  </div>
</template>

<script>
import "normalize.css";
import "flexboxgrid";
import "@/assets/scss/variables.scss";
import "@/assets/scss/defaults.scss";

import GameField from "./components/GameField";
import WordTable from "./components/WordTable";
export default {
  name: "App",
  components: {
    GameField,
    WordTable
  }
};
</script>

<style lang="scss">
body {
  background-color: var(--dark);
}

.field-box {
  position: relative;
  height: 100vh;
  margin-right: 420px;
  width: calc(100% - 420px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
