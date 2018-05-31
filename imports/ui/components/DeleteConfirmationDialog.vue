<template>
  <v-dialog v-model="isOpened" :fullscreen="$vuetify.breakpoint.xs" persistent max-width="50%">
    <v-card>
      <v-card-title class="headline">Usuń</v-card-title>
      <v-card-text>Wybrany element: {{ description }}</v-card-text>
      <v-card-text>Czy chcesz go trwale usunąć? Usuwanie jest operacją nieodwracalną.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click.native="closeDialog">Anuluj</v-btn>
        <v-btn color="error" @click.native="closeDialog">Tak, usuń</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DeleteConfirmationDialog",

  props: {
    description: {
      type: String,
      required: false,
      default: ""
    },
    opened: {
      type: Boolean,
      required: true,
      detault: false
    }
  },

  computed: {
    isOpened() {
      return this.opened;
    }
  },

  methods: {
    closeDialog() {
      this.$emit("close");
    }
  }
};
</script>
