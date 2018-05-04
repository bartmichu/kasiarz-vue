<template>
  <v-toolbar app dark color="grey darken-3">

    <v-toolbar-title>Kasiarz</v-toolbar-title>

    <v-toolbar-items>
      <v-btn flat @click="methodPlug">
        <v-icon left dark>perm_contact_calendar</v-icon>Klienci
      </v-btn>
      <v-btn flat @click="methodPlug">
        <v-icon left dark>memory</v-icon>Urządzenia
      </v-btn>
    </v-toolbar-items>

    <v-spacer/>

    <v-menu dark open-on-hover left>
      <v-btn icon slot="activator">
        <v-icon>settings</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile @click="methodPlug">
          <v-list-tile-title>Producenci urządzeń</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="methodPlug">
          <v-list-tile-title>Modele urządzeń</v-list-tile-title>
        </v-list-tile>
        <v-divider/>
        <v-list-tile @click="methodPlug">
          <v-list-tile-title>Serwisy</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="methodPlug">
          <v-list-tile-title>Serwisanci</v-list-tile-title>
        </v-list-tile>
        <v-divider/>
        <v-list-tile @click="methodPlug">
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
import router from "/imports/startup/client/route";

export default {
  name: "ApplicationToolbar",

  methods: {
    methodPlug: function methodPlug() { },
    signOut: function signOut() {
      Meteor.logout();
      router.push("login");
    }
  }
};
</script>
