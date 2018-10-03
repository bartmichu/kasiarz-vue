<template>
  <v-btn v-if="!editMode" outline @click="editHandler()">edytuj</v-btn>
  <span v-else>
    <v-btn outline @click="saveHandler()">zapisz</v-btn>
    <v-btn outline @click="cancelHandler()">anuluj</v-btn>
  </span>
</template>


<script>
export default {
  name: "ItemEditMenu",

  props: {
    editMode: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  methods: {
    editHandler() {
      this.$emit("update:editMode", true);
    },
    cancelHandler() {
      this.$emit("cancelChanges");
    },
    saveHandler() {
      this.$emit("saveChanges");
    }
  }
};
</script>
