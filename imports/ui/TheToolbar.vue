<template>

  <v-toolbar dark color="secondary">

    <!-- <v-toolbar-title></v-toolbar-title> -->

    <v-toolbar-items>
      <v-btn flat :to="{name: 'clients'}">
        <v-icon left dark>perm_contact_calendar</v-icon>Klienci
      </v-btn>
      <v-btn flat :to="{name: 'devices'}">
        <v-icon left dark>memory</v-icon>Urządzenia
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-menu dark open-on-hover left>
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
        <v-divider></v-divider>
        <v-list-tile :to="{name: 'shops'}">
          <v-list-tile-title>Serwisy</v-list-tile-title>
        </v-list-tile>
        <v-list-tile :to="{name: 'employees'}">
          <v-list-tile-title>Serwisanci</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile :to="{name: 'offices'}">
          <v-list-tile-title>Urzędy skarbowe</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-menu dark open-on-hover left>
      <v-btn slot="activator" icon>
        <v-icon>face</v-icon>
      </v-btn>
      <v-list>
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

  methods: {
    signOut: function signOut() {
      Meteor.logout();
    }
  }
};
</script>
