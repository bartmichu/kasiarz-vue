<template>

  <v-menu bottom left dark>

    <v-btn slot="activator" icon color="secondary">
      <v-icon>menu</v-icon>
    </v-btn>

    <v-list>
      <v-list-tile @click="showItem(false)">
        <v-list-tile-title>przeglądaj</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="showItem(true)">
        <v-list-tile-title>edytuj</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click.stop="openDeleteDialog">
        <v-list-tile-title>usuń</v-list-tile-title>
      </v-list-tile>
    </v-list>

  </v-menu>

</template>


<script>
export default {
  name: "ListItemMenu",

  props: {
    mongoId: {
      type: String,
      required: true,
      default: ""
    },
    routeName: {
      type: String,
      required: true,
      default: ""
    }
  },

  methods: {
    openDeleteDialog() {
      this.$store.commit("setSelectedListItemId", { id: this.mongoId });
      this.$store.commit("openDeleteConfirmationDialog");
    },
    showItem(editMode) {
      this.$store.commit("openDetailsDialog", {
        routeName: this.routeName,
        mongoId: this.mongoId,
        editMode
      });
    }
  }
};
</script>
