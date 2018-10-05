<template>

  <v-toolbar dark dense>

    <!-- <v-toolbar-title></v-toolbar-title> -->

    <v-toolbar-items>
      <v-btn v-if="$vuetify.breakpoint.xs" icon :to="{name: 'clients'}">
        <v-icon dark>perm_contact_calendar</v-icon>
      </v-btn>
      <v-btn v-else flat :to="{name: 'clients'}">
        <v-icon left dark>perm_contact_calendar</v-icon>Klienci
      </v-btn>

      <v-btn v-if="$vuetify.breakpoint.xs" icon :to="{name: 'devices'}">
        <v-icon dark>memory</v-icon>
      </v-btn>
      <v-btn v-else flat :to="{name: 'devices'}">
        <v-icon left dark>memory</v-icon>Urządzenia
      </v-btn>
    </v-toolbar-items>

    <v-divider vertical inset />
    <v-spacer />
    <v-divider vertical inset />

    <v-menu dark left>
      <v-btn icon slot="activator">
        <v-icon>settings</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile :to="{name: 'manufacturers'}">
          <v-list-tile-title>Producenci urządzeń</v-list-tile-title>
        </v-list-tile>
        <v-list-tile :to="{name: 'models'}">
          <v-list-tile-title>Modele urządzeń</v-list-tile-title>
        </v-list-tile>
        <v-divider />
        <v-list-tile :to="{name: 'shops'}">
          <v-list-tile-title>Serwisy</v-list-tile-title>
        </v-list-tile>
        <v-list-tile :to="{name: 'employees'}">
          <v-list-tile-title>Serwisanci</v-list-tile-title>
        </v-list-tile>
        <v-divider />
        <v-list-tile :to="{name: 'offices'}">
          <v-list-tile-title>Urzędy skarbowe</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-menu dark left>
      <v-btn slot="activator" icon>
        <v-icon>face</v-icon>
      </v-btn>
      <v-list>
        <v-subheader>{{ user }}</v-subheader>
        <v-list-tile @click="">
          <v-list-tile-title>Profil</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="signOut">
          <v-list-tile-title>Wyloguj się</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

  </v-toolbar>

</template>


<script>
import { Meteor } from "meteor/meteor";

export default {
  name: "TheToolbar",

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
  },

  methods: {
    signOut: function signOut() {
      Meteor.logout();
    }
  }
};
</script>
