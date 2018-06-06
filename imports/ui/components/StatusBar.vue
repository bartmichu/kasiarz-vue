<template>

  <v-system-bar dark status color="grey darken-4">
    <v-spacer></v-spacer>
    <span>{{ user }}</span>
  </v-system-bar>

</template>


<script>
import { Meteor } from "meteor/meteor";

export default {
  name: "StatusBar",

  computed: {
    user() {
      let username = "";
      let firstName = "";
      let lastName = "";

      if (Meteor.user()) {
        if (Meteor.user().username) {
          username = Meteor.user().username.toUpperCase();
        }

        if (Meteor.user().profile && Meteor.user().profile.daneOsobowe) {
          firstName = Meteor.user().profile.daneOsobowe.imie || firstName;
          lastName = Meteor.user().profile.daneOsobowe.nazwisko || lastName;
        }
      }

      return `${firstName} ${lastName} (${username})`.trim();
    }
  }
};
</script>
