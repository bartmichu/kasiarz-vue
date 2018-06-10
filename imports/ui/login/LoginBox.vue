<template>

  <v-card tile color="grey lighten-4">

    <v-toolbar card dark color="primary">
      <v-toolbar-title>Kasiarz</v-toolbar-title>
    </v-toolbar>

    <v-card-title></v-card-title>

    <v-card-text>
      <v-text-field v-model="username" type="text" solo flat clearable label="użytkownik" prepend-icon="face" @input="clearFailedLogin" @keyup.enter="signIn" @change="trimUsername"></v-text-field>
    </v-card-text>

    <v-card-text>
      <v-text-field v-model="password" type="password" solo flat clearable label="hasło" prepend-icon="lock_outline" @input="clearFailedLogin" @keyup.enter="signIn"></v-text-field>
    </v-card-text>

    <v-alert v-if="failedLogin" value="true" color="error" class="text-xs-center">
      Nieprawidłowe dane logowania. Spróbuj ponownie.
    </v-alert>
    <v-card-actions v-else>
      <v-btn color="secondary" large block depressed @click="signIn">zaloguj mnie</v-btn>
    </v-card-actions>

  </v-card>

</template>


<script>
import { Meteor } from "meteor/meteor";

export default {
  name: "LoginBox",

  data() {
    return {
      username: "",
      password: "",
      failedLogin: false
    };
  },

  methods: {
    clearFailedLogin: function clearFailedLogin() {
      this.failedLogin = false;
    },
    trimUsername: function trimUsername() {
      this.username =
        typeof this.username === "string" ? this.username.trim() : "";
    },
    signIn: function signIn() {
      if (!this.failedLogin) {
        this.trimUsername();
        if (
          this.username !== null &&
          this.username.length > 0 &&
          this.password !== null &&
          this.password.length > 0
        ) {
          Meteor.loginWithPassword(this.username, this.password, error => {
            if (error) {
              this.failedLogin = true;
            } else {
              // success - user logged in
              this.failedLogin = false;
            }
          });
        } else {
          this.failedLogin = true;
        }
      }
    }
  }
};
</script>
