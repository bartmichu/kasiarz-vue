<template>
  <v-dialog v-model="deleteModal" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Usuń element</v-card-title>
      <v-card-text>Usuwanie jest operacją nieodwracalną - czy chcesz trwale usunąć wybrany element?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click.native="deleteModal = false">Nie usuwaj</v-btn>
        <v-btn color="green darken-1" flat @click.native="deleteModal = false">Usuń</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  name: "DeleteItemModal"
};
</script>
