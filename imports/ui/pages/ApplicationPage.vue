<template>

  <div>

    <StatusBar></StatusBar>

    <ApplicationToolbar></ApplicationToolbar>

    <v-content class="mt-4">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app></v-footer>

  </div>

</template>


<script>
import ApplicationToolbar from "/imports/ui/components/ApplicationToolbar.vue";
import StatusBar from "/imports/ui/components/StatusBar.vue";

export default {
  name: "ApplicationPage",

  components: { ApplicationToolbar, StatusBar }
};
</script>
