<template>

  <v-card>

    <v-toolbar card color="grey lighten-2">
      <v-toolbar-title>Dane producenta</v-toolbar-title>
      <v-btn depressed color="secondary">edytuj</v-btn>
    </v-toolbar>

    <v-card-text v-if="!isSubscriptionReady">
      <LoadingIndicator></LoadingIndicator>
    </v-card-text>

    <v-card-text v-else>

    </v-card-text>

  </v-card>

</template>


<script>
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
import LoadingIndicator from "/imports/ui/components/LoadingIndicator.vue";
import { formatDate } from "/imports/startup/client/mixins.js";

export default {
  name: "ManufacturerPage",

  meteor: {
    // const manufacturerId = FlowRouter.getParam("_id");
    // template.subscribe("manufacturers.one", manufacturerId, () => {
    //   template.subscribe("models.manufacturer.basic", manufacturerId, () => {
    //     template.subscribe("employees.extended", () => {
    //       Tracker.afterFlush(() => {
    //         afterFlushCallback();
    //       });
    //     });
    //   });
    // });
    $subscribe: {
      "manufacturers.list": []
    },
    subscribedData() {
      return Manufacturers.find({});
    }
  },

  computed: {
    isSubscriptionReady() {
      return this.$subReady["manufacturers.list"];
    }
  },

  mixins: [formatDate],

  components: {
    LoadingIndicator
  }
};
</script>
