<template>
  <span v-if="!editMode">
    <v-btn v-if="$vuetify.breakpoint.xs" icon @click="editHandler" :disabled="!subscriptionReady">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-btn v-else outline @click="editHandler" :disabled="!subscriptionReady">edytuj</v-btn>
  </span>
  <span v-else>
    <v-btn v-if="$vuetify.breakpoint.xs" icon @click="saveHandler" :disabled="!subscriptionReady">
      <v-icon>save</v-icon>
    </v-btn>
    <v-btn v-else outline @click="saveHandler" :disabled="!subscriptionReady">zapisz</v-btn>

    <v-btn v-if="$vuetify.breakpoint.xs" icon @click="cancelHandler" :disabled="!subscriptionReady">
      <v-icon>cancel</v-icon>
    </v-btn>
    <v-btn v-else outline @click="cancelHandler" :disabled="!subscriptionReady">anuluj</v-btn>
  </span>
</template>


<script>
export default {
  name: "ItemEditMenu",

  props: {
    subscriptionReady: {
      type: Boolean,
      required: false,
      default: true
    },
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
