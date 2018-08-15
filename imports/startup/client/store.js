import Vue from "vue";
import Vuex from "vuex";
import router from "/imports/startup/client/router.js";

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {
    // TODO move to mixin?
    openDetailsDialog(state, payload) {
      router.push({
        name: payload.routeName,
        params: {
          mongoId: payload.mongoId,
          editMode: payload.editMode,
          addingMode: payload.addingMode
        }
      });
    }
  }
});
