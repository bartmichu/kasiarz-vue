<template>

  <v-dialog v-model="isOpened" :fullscreen="$vuetify.breakpoint.xs" persistent max-width="50%">

    <v-card :color="getCardColor">

      <v-card-title class="headline">{{ title }}</v-card-title>

      <v-card-text v-if="actionFailed">Usunięcie danego elementu nie jest w tej chwili możliwe, ponieważ odnoszą się do niego inne elementy bazy danych.</v-card-text>
      <v-card-text v-else>Usuwanie jest operacją nieodwracalną.</v-card-text>

      <v-card-actions v-if="actionFailed">
        <v-btn color="secondary" @click.native="closeDialog" class="mx-auto">OK</v-btn>
      </v-card-actions>
      <v-card-actions v-else>
        <span class="mx-auto">
          <v-btn color="secondary" @click.native="closeDialog">Anuluj</v-btn>
          <v-btn color="error" @click.native="deleteItem">Tak, usuń</v-btn>
        </span>
      </v-card-actions>

    </v-card>

  </v-dialog>

</template>

<script>
import { Meteor } from "meteor/meteor";

export default {
  name: "DeleteConfirmationDialog",

  props: {
    title: {
      type: String,
      required: false,
      default: "Usunąć dany element?"
    }
  },

  data() {
    return {
      actionFailed: false
    };
  },

  computed: {
    isOpened() {
      return this.$store.state.deleteConfirmationDialog;
    },
    getCardColor() {
      return this.actionFailed ? "error" : "";
    }
  },

  watch: {
    isOpened() {
      if (this.$store.state.deleteConfirmationDialog) {
        this.actionFailed = false;
      }
    }
  },

  methods: {
    closeDialog() {
      this.$store.commit("resetSelectedListItemId");
      this.$store.commit("closeDeleteConfirmationDialog");
    },
    deleteItem() {
      Meteor.call(
        this.$router.currentRoute.name.concat(".remove"),
        this.$store.state.selectedListItemId,
        error => {
          if (error) {
            this.actionFailed = true;
          } else {
            this.closeDialog();
          }
        }
      );
    }
  }
};
</script>
