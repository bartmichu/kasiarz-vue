<template>

  <v-system-bar dark status color="grey darken-4">
    <v-spacer></v-spacer>
    <span>zalogowany jako: {{ username }}</span>
  </v-system-bar>

</template>


<script>
import { Meteor } from "meteor/meteor";

export default {
  name: "StatusBar",

  computed: {
    username() {
      if (Meteor.user() && Meteor.user().username) {
        return Meteor.user().username.toUpperCase();
      }
      return "";
    }
  }
};
</script>
