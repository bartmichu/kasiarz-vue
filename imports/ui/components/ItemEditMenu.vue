<template>
  <v-btn v-if="!editMode" color="secondary" depressed @click="updateEditMode(true)">edytuj</v-btn>
  <span v-else>
    <v-btn color="secondary" depressed @click="updateEditMode(false)">anuluj</v-btn>
    <v-btn color="secondary" depressed @click="updateEditMode(false)">zapisz</v-btn>
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
    updateEditMode(state) {
      this.$emit("update:editMode", state);
    }
  }
};
</script>
