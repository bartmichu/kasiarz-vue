import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    deleteConfirmationDialog: false,
    detailsDialog: false,
    selectedListItemId: ""
  },

  mutations: {
    openDeleteConfirmationDialog() {
      this.state.deleteConfirmationDialog = true;
    },
    closeDeleteConfirmationDialog() {
      this.state.deleteConfirmationDialog = false;
    },
    openDetailsDialog() {
      this.state.detailsDialog = true;
    },
    closeDetailsDialog() {
      this.state.detailsDialog = false;
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
