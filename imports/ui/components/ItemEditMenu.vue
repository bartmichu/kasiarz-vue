<template>
  <v-btn v-if="!editMode" color="secondary" depressed @click="editHandler()">edytuj</v-btn>
  <span v-else>
    <v-btn color="secondary" depressed @click="cancelHandler()">anuluj</v-btn>
    <v-btn color="secondary" depressed @click="saveHandler()">zapisz</v-btn>
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
