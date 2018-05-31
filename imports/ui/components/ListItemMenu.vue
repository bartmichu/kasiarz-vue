<template>
  <v-menu bottom left dark>
    <v-btn slot="activator" icon color="secondary">
      <v-icon>menu</v-icon>
    </v-btn>
    <v-list>
      <v-list-tile @click="">
        <v-list-tile-title>przeglądaj</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-title>edytuj</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click.stop="openDeleteDialog">
        <v-list-tile-title>usuń</v-list-tile-title>
      </v-list-tile>
    </v-list>
    <DeleteConfirmationDialog :opened="deleteDialogOpened" @close="closeDeleteDialog" title="Usunąć producenta?"></DeleteConfirmationDialog>
  </v-menu>
</template>


<script>
import DeleteConfirmationDialog from "/imports/ui/components/DeleteConfirmationDialog.vue";

export default {
  name: "ListItemMenu",

  props: {
    id: {
      type: String,
      required: true,
      default: ""
    }
  },

  data() {
    return {
      deleteDialogOpened: false
    };
  },

  methods: {
    closeDeleteDialog() {
      this.deleteDialogOpened = false;
    },
    openDeleteDialog() {
      this.deleteDialogOpened = true;
    }
  },

  components: { DeleteConfirmationDialog }
};
</script>
