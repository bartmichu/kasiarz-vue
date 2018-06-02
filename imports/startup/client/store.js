import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    deleteConfirmationDialog: false,
    selectedListItemId: ""
  },

  mutations: {
    openDeleteConfirmationDialog() {
      this.state.deleteConfirmationDialog = true;
    },
    closeDeleteConfirmationDialog() {
      this.state.deleteConfirmationDialog = false;
    },
    setSelectedListItemId(state, payload) {
      this.state.selectedListItemId = payload.id;
    },
    resetSelectedListItemId() {
      this.state.selectedListItemId = "";
    }
  }
});
