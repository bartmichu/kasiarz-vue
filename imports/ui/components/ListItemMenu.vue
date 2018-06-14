<template>

  <v-menu bottom left dark>

    <v-btn slot="activator" icon color="secondary" @click="notifyParent">
      <v-icon>menu</v-icon>
    </v-btn>

    <v-list>
      <v-list-tile @click="showItem(false)">
        <v-list-tile-title>przeglądaj</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="showItem(true)">
        <v-list-tile-title>edytuj</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click.stop="showDeleteConfirmation">
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
    showDeleteConfirmation() {
      this.$emit("deleteItemEvent");
    },
    showItem(editMode) {
      this.$store.commit("openDetailsDialog", {
        routeName: this.routeName,
        mongoId: this.mongoId,
        editMode
      });
    },
    notifyParent() {
      this.$emit("showMenuEvent");
    }
  }
};
</script>
