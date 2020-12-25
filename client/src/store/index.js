import Vue from "vue";
import Vuex from "vuex";

import { ADD_FINDED_WORD } from "./mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    foundedWordsAndUsers: []
  },
  mutations: {
    [ADD_FINDED_WORD](state, data) {
      let wordExist = true;
      state.foundedWordsAndUsers.map(item => {
        if (item.word === data.word) {
          wordExist = false;
        }
      });
      if (wordExist) {
        state.foundedWordsAndUsers.push(data);
      }
    }
  },
  actions: {},
  modules: {}
});
