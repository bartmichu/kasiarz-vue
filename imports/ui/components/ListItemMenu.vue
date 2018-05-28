<template>
  <v-menu bottom left dark>
    <v-btn slot="activator" icon color="secondary">
      <v-icon>menu</v-icon>
    </v-btn>
    <v-list>
      <v-list-tile @click="">
        <v-list-tile-title>przeglądaj</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-title>edytuj</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click.native.stop="deleteModal = true">
        <v-list-tile-title>usuń</v-list-tile-title>
        <DeleteItemModal></DeleteItemModal>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>


<script>
import DeleteItemModal from "/imports/ui/components/DeleteItemModal.vue";

export default {
  name: "ListItemMenu",

  props: {
    "item-id": {
      type: String,
      required: true,
      default: ""
    }
  },

  data() {
    return {
      deleteModal: false
    };
  },

  components: {
    DeleteItemModal
  }
};
</script>
