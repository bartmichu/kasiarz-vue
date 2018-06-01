<template>
  <v-dialog v-model="isOpened" :fullscreen="$vuetify.breakpoint.xs" persistent max-width="50%">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>Usuwanie jest operacją nieodwracalną.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click.native="closeDialog">Anuluj</v-btn>
        <v-btn color="error" @click.native="deleteItem">Tak, usuń</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DeleteConfirmationDialog",

  props: {
    title: {
      type: String,
      required: false,
      default: "Usunąć dany element?"
    },
    id: {
      type: String,
      required: true,
      default: ""
    }
  },

  computed: {
    isOpened() {
      return this.$store.state.deleteConfirmationDialog;
    }
  },

  methods: {
    closeDialog() {
      this.$store.commit("closeDeleteConfirmationDialog");
    },
    deleteItem() {
      this.$store.commit("closeDeleteConfirmationDialog");
    }
  }
};
</script>
