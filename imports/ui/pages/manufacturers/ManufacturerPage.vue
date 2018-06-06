<template>

  <v-dialog v-model="isOpened" :fullscreen="$vuetify.breakpoint.xs" persistent max-width="90%">

    <v-card>

      <v-toolbar card color="grey lighten-2">
        <v-toolbar-title>Dane producenta</v-toolbar-title>
        <v-btn depressed color="secondary" @click="closeDialog">zamknij</v-btn>
      </v-toolbar>

      <v-card-text v-if="!isSubscriptionReady">
        <LoadingIndicator></LoadingIndicator>
      </v-card-text>
      <v-card-text v-else>

      </v-card-text>

    </v-card>

  </v-dialog>

</template>


<script>
import { formatDate } from "/imports/startup/client/mixins.js";
import LoadingIndicator from "/imports/ui/components/LoadingIndicator.vue";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";

export default {
  name: "ManufacturerPage",

  meteor: {
    $subscribe: {
      "manufacturers.one": function subscribe() {
        return [this.$route.params.manufacturerId];
      },
      "models.manufacturer.basic": function subscribe() {
        return [this.$route.params.manufacturerId];
      },
      "employees.extended": []
    },
    subscribedData() {
      return Manufacturers.findOne({ _id: this.$route.params.manufacturerId });
    }
  },

  computed: {
    isSubscriptionReady() {
      // TODO: refactor
      return (
        this.$subReady["manufacturers.one"] &&
        this.$subReady["models.manufacturer.basic"] &&
        this.$subReady["employees.extended"]
      );
    },
    isOpened() {
      return this.$store.state.detailsDialog;
    }
  },

  methods: {
    closeDialog() {
      this.$store.commit("closeDetailsDialog");
      // TODO history?
      this.$router.push({
        name: "manufacturers"
      });
    }
  },

  mixins: [formatDate],

  components: {
    LoadingIndicator
  }
};
</script>
