<template>
  <v-app>
    <v-navigation-drawer app></v-navigation-drawer>

    <ApplicationToolbar></ApplicationToolbar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app></v-footer>
  </v-app>
</template>


<script>
import ApplicationToolbar from "/imports/ui/components/ApplicationToolbar.vue";

export default {
  name: "ApplicationLayout",

  components: { ApplicationToolbar }
};
</script>
