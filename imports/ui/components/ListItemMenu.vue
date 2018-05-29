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
      <v-list-tile @click.stop="isDeleteModalVisible = true">
        <v-list-tile-title>usuń</v-list-tile-title>
      </v-list-tile>
    </v-list>

    <v-dialog v-model="isDeleteModalVisible" persistent max-width="60%">
      <v-card>
        <v-card-title class="headline">Usuń element</v-card-title>
        <v-card-text>Usuwanie jest operacją nieodwracalną - czy chcesz trwale usunąć wybrany element?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="isDeleteModalVisible = false">Nie usuwaj</v-btn>
          <v-btn color="green darken-1" flat @click.native="isDeleteModalVisible = false">Usuń</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-menu>
</template>


<script>
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
      isDeleteModalVisible: false
    };
  },

  components: {}
};
</script>
