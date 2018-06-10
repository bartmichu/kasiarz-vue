<template>

  <div>
    <ApplicationStatusBar></ApplicationStatusBar>
    <ApplicationToolbar></ApplicationToolbar>
    <v-content class="mt-4">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </div>

</template>


<script>
import ApplicationToolbar from "/imports/ui/ApplicationToolbar.vue";
import ApplicationStatusBar from "/imports/ui/ApplicationStatusBar.vue";

export default {
  name: "ApplicationPage",

  components: { ApplicationToolbar, ApplicationStatusBar }
};
</script>
