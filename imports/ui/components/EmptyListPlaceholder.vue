<template>
  <v-alert value="true" color="success" icon="info">
    {{ message }} Użyj przycisku "dodaj" aby utworzyć nowy element.
  </v-alert>
</template>


<script>
export default {
  name: "EmptyListPlaceholder",
  props: {
    message: {
      type: String,
      required: false,
      default: "Lista jest pusta."
    }
  }
};
</script>
