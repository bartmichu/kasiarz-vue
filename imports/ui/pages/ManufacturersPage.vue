<template>
  <v-card>

    <v-toolbar card color="grey lighten-2">
      <v-toolbar-title>Lista producentów urządzeń</v-toolbar-title>
    </v-toolbar>

    <v-card-text v-if="!isSubscriptionReady">
      <LoadingIndicator></LoadingIndicator>
    </v-card-text>

    <v-card-text v-else>
      <EmptyListPlaceholder v-if="isEmptyCollection" message="Lista producentów jest pusta."></EmptyListPlaceholder>

      <v-data-table v-else :headers="tableHeaders" :items="subscribedData" hide-actions>
        <template slot="items" slot-scope="props">
          <td>{{ props.item.nazwa }}</td>
          <td class="text-xs-right">{{ props.item.adres.miejscowosc }}</td>
          <td class="text-xs-right">{{ props.item.dataModyfikacji }}</td>
        </template>
      </v-data-table>
    </v-card-text>

  </v-card>
</template>


<script>
import EmptyListPlaceholder from "/imports/ui/components/EmptyListPlaceholder.vue";
import LoadingIndicator from "/imports/ui/components/LoadingIndicator.vue";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";

export default {
  name: "ManufacturersPage",

  components: {
    EmptyListPlaceholder,
    LoadingIndicator
  },

  meteor: {
    $subscribe: {
      "manufacturers.list": []
    },
    subscribedData() {
      return Manufacturers.find({});
    }
  },

  data() {
    return {
      tableHeaders: [
        {
          text: "Pełna nazwa",
          align: "left",
          value: "nazwa"
        },
        {
          text: "Miejscowość",
          align: "right",
          value: "adres.miejscowosc"
        },
        {
          text: "Data modyfikacji",
          align: "right",
          value: "dataModyfikacji"
        }
      ],
      items: []
    };
  },

  computed: {
    isSubscriptionReady() {
      return this.$subReady["manufacturers.list"];
    },
    isEmptyCollection() {
      return this.subscribedData.length === 0;
    }
  }
};
</script>
