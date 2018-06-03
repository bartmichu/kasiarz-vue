<template>

  <div>

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

export default {
  name: "ApplicationPage",

  components: { ApplicationToolbar }
};
</script>
