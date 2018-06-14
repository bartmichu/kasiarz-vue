import Vue from "vue";
import Vuex from "vuex";
import router from "/imports/startup/client/router.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedListItemId: ""
  },

  mutations: {
    openDetailsDialog(state, payload) {
      router.push({
        name: payload.routeName,
        params: { mongoId: payload.mongoId, editMode: payload.editMode }
      });
    },
    // TODO: get rid of?
    setSelectedListItemId(state, payload) {
      this.state.selectedListItemId = payload.id;
    },
    resetSelectedListItemId() {
      this.state.selectedListItemId = "";
    }
  }
});
