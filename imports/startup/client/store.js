import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false
  },

  mutations: {},

  actions: {
    signIn() {
      this.loggedIn = true;
      console.log("signed in");
    },
    signOut() {
      this.loggedIn = false;
      console.log("signed out");
    }
  }
});
