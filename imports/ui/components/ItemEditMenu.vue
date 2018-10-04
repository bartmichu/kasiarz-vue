<template>
  <span v-if="!editMode">
    <v-btn v-if="$vuetify.breakpoint.xs" icon @click="editHandler">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-btn v-else outline @click="editHandler">edytuj</v-btn>
  </span>
  <span v-else>
    <v-btn v-if="$vuetify.breakpoint.xs" icon @click="saveHandler">
      <v-icon>save</v-icon>
    </v-btn>
    <v-btn v-else outline @click="saveHandler">zapisz</v-btn>

    <v-btn v-if="$vuetify.breakpoint.xs" icon @click="cancelHandler">
      <v-icon>cancel</v-icon>
    </v-btn>
    <v-btn v-else outline @click="cancelHandler">anuluj</v-btn>
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
