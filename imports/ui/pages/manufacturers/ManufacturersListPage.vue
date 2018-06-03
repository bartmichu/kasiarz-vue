<template>

  <v-card>

    <v-toolbar card color="grey lighten-2">
      <v-toolbar-title>Lista producentów urządzeń</v-toolbar-title>
      <v-btn depressed color="secondary">dodaj</v-btn>
    </v-toolbar>

    <v-card-text v-if="!isSubscriptionReady">
      <LoadingIndicator></LoadingIndicator>
    </v-card-text>

    <v-card-text v-else>

      <EmptyListPlaceholder v-if="isEmptyCollection" message="Lista producentów jest pusta."></EmptyListPlaceholder>

      <v-data-table v-else :headers="tableHeaders" :items="subscribedData" item-key="_id" hide-actions>
        <template slot="items" slot-scope="props">
          <tr @mouseover="setActiveItem(props.item._id)" @mouseout="resetActiveItem" @click="showManufacturer">
            <td>{{ props.item.nazwa }}</td>
            <td class="text-xs-right">{{ props.item.adres.miejscowosc }}</td>
            <td class="text-xs-right">{{ formatDate(props.item.dataModyfikacji) }}</td>
            <td class="justify-center layout px-0">
              <div v-show="isActiveItem(props.item._id)">
                <ListItemMenu :id="props.item._id"></ListItemMenu>
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>

    </v-card-text>

    <DeleteConfirmationDialog title="Usunąć producenta?"></DeleteConfirmationDialog>

  </v-card>

</template>


<script>
import { formatDate } from "/imports/startup/client/mixins.js";
import DeleteConfirmationDialog from "/imports/ui/components/DeleteConfirmationDialog.vue";
import EmptyListPlaceholder from "/imports/ui/components/EmptyListPlaceholder.vue";
import ListItemMenu from "/imports/ui/components/ListItemMenu.vue";
import LoadingIndicator from "/imports/ui/components/LoadingIndicator.vue";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";

export default {
  name: "ManufacturersListPage",

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
      activeItemId: "",
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
        },
        {
          text: "",
          value: "",
          sortable: false,
          width: "100px"
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
  },

  methods: {
    setActiveItem(id) {
      this.activeItemId = id;
    },
    resetActiveItem() {
      this.activeItemId = "";
    },
    isActiveItem(id) {
      return id === this.activeItemId;
    },
    showManufacturer(event) {
      // do not change route if item menu button was clicked
      if (event.target.tagName !== "DIV") {
        this.$router.push({
          name: "manufacturer",
          params: { manufacturerId: this.activeItemId }
        });
      }
    }
  },

  mixins: [formatDate],

  components: {
    EmptyListPlaceholder,
    LoadingIndicator,
    ListItemMenu,
    DeleteConfirmationDialog
  }
};
</script>
