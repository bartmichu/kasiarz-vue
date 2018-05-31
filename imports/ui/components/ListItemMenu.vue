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

    <v-dialog v-model="isDeleteModalVisible" :fullscreen="$vuetify.breakpoint.xs" persistent max-width="50%">
      <v-card>
        <v-card-title class="headline">Usuń</v-card-title>
        <v-card-text>Wybrany element: {{ description }}</v-card-text>
        <v-card-text>Czy chcesz go trwale usunąć? Usuwanie jest operacją nieodwracalną.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click.native="isDeleteModalVisible = false">Anuluj</v-btn>
          <v-btn color="error" @click.native="isDeleteModalVisible = false">Tak, usuń</v-btn>
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
    },
    description: {
      type: String,
      required: false,
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
