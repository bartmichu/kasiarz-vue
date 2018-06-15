<template>

  <v-card>

    <v-toolbar card color="grey lighten-2">
      <v-toolbar-title>Lista producentów urządzeń</v-toolbar-title>
      <v-btn depressed color="secondary">dodaj</v-btn>
    </v-toolbar>

    <v-card-text v-if="!isSubscriptionReady">
      <LoadingIndicator/>
    </v-card-text>

    <v-card-text v-else>

      <EmptyListPlaceholder v-if="isEmptyCollection" message="Lista producentów jest pusta." />

      <v-data-table v-else :headers="tableHeaders" :items="subscribedData" item-key="_id" hide-actions>
        <template slot="items" slot-scope="props">
          <tr @mouseover="setActiveItem(props.item._id)" @mouseout="resetActiveItem" @click="showManufacturer(props.item._id, false, $event)">
            <td>{{ props.item.nazwa }}</td>
            <td class="text-xs-right">{{ props.item.adres.miejscowosc }}</td>
            <td class="text-xs-right">{{ $_formatDate_long(props.item.dataModyfikacji) }}</td>
            <td class="justify-center layout px-0">
              <v-menu v-show="isActiveItem(props.item._id)" bottom left dark>
                <v-btn slot="activator" icon color="secondary">
                  <v-icon>more_vert</v-icon>
                </v-btn>

                <v-list>
                  <v-list-tile @click="showManufacturer(props.item._id, false, $event)">
                    <v-list-tile-title>przeglądaj</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="showManufacturer(props.item._id, true, $event)">
                    <v-list-tile-title>edytuj</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click.stop="showDeleteConfirmation(props.item._id)">
                    <v-list-tile-title>usuń</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </template>
      </v-data-table>

    </v-card-text>

    <router-view/>

    <DeleteConfirmationDialog :is-visible.sync="isDeleteConfirmationVisible" :mongo-id="selectedItemId" title="Usunąć producenta?" />

  </v-card>

</template>


<script>
import { formatDate } from "/imports/startup/client/mixins.js";
import DeleteConfirmationDialog from "/imports/ui/components/DeleteConfirmationDialog.vue";
import EmptyListPlaceholder from "/imports/ui/components/EmptyListPlaceholder.vue";
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
      selectedItemId: "",
      isDeleteConfirmationVisible: false,
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
    showManufacturer(mongoId, editMode, event) {
      // do not change route if item menu button was clicked
      if (event.target.classList.contains("btn__content")) {
        return;
      }

      this.$store.commit("openDetailsDialog", {
        routeName: "manufacturer",
        mongoId,
        editMode
      });
    },
    showDeleteConfirmation(mongoId) {
      this.selectedItemId = mongoId;
      this.isDeleteConfirmationVisible = true;
    }
  },

  mixins: [formatDate],

  components: {
    EmptyListPlaceholder,
    LoadingIndicator,
    DeleteConfirmationDialog
  }
};
</script>