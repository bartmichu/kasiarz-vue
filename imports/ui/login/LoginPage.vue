<template>

  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center row>
        <v-flex xs12 sm7 md5 lg4 xl3>
          <LoginBox/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>

</template>


<script>
import LoginBox from "/imports/ui/login/LoginBox.vue";

export default {
  name: "LoginPage",

  components: {
    LoginBox
  }
};
</script>
