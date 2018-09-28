<template>

  <div>
    <TheToolbar/>
    <v-content class="mt-4">
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
  </div>

</template>


<script>
import TheToolbar from "/imports/ui/TheToolbar.vue";

export default {
  name: "ThePage",

  components: { TheToolbar }
};
</script>
