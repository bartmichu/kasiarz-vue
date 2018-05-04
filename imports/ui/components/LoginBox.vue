<template>

  <v-card tile color="grey lighten-4">

    <v-toolbar card dark color="grey darken-3">
      <v-toolbar-title>Kasiarz</v-toolbar-title>
    </v-toolbar>

    <v-card-title></v-card-title>

    <v-card-text>
      <v-text-field v-model="username" type="text" solo flat clearable label="użytkownik" prepend-icon="face" @input="clearFailedLogin" @keyup.enter="signIn" @change="trimUsername" />
    </v-card-text>

    <v-card-text>
      <v-text-field v-model="password" type="password" solo flat clearable label="hasło" prepend-icon="lock_outline" @input="clearFailedLogin" @keyup.enter="signIn" />
    </v-card-text>

    <v-card-actions>
      <v-btn :color="loginButtonColor" large block depressed @click="signIn">{{ loginButtonText }}</v-btn>
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

  computed: {
    loginButtonText: function loginButtonText() {
      return this.failedLogin ? "nieprawidłowe dane" : "zaloguj mnie";
    },
    loginButtonColor: function loginButtonColor() {
      return this.failedLogin ? "error" : "info";
    }
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
