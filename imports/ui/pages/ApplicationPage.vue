<template>
  <div>
    <!-- <v-navigation-drawer app></v-navigation-drawer> -->

    <ApplicationToolbar></ApplicationToolbar>

    <v-content>
      <v-container fluid></v-container>
    </v-content>

    <v-footer app></v-footer>
  </div>
</template>


<script>
import ApplicationToolbar from "/imports/ui/components/ApplicationToolbar.vue";

export default {
  name: "ApplicationPage",

  components: { ApplicationToolbar }
};
</script>
