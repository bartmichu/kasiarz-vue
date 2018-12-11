<template>
  <v-dialog v-model="isVisible" persistent max-width="50%">
    <v-card color="error">
      <v-card-title class="headline">Bąd walidacji</v-card-title>
      <v-card-text>Niepoprawny format danych. Upewnij się, że wszystkie wymagane pola są wypełnione.</v-card-text>
      <v-card-actions> <v-btn color="secondary" @click.native="closeHandler" class="mx-auto">OK</v-btn> </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EditErrorDialog",

  props: {
    isVisible: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  methods: {
    closeHandler() {
      this.$emit("update:isVisible", false);
    }
  }
};
</script>
