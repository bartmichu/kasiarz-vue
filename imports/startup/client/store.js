import Vue from "vue";
import Vuex from "vuex";
import router from "/imports/startup/client/router.js";

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
    openDetailsDialog(state, payload) {
      router.push({
        name: payload.routeName,
        params: { mongoId: payload.mongoId, editMode: payload.editMode }
      });
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
