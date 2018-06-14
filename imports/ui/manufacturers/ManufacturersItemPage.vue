<template>

  <v-dialog :value="isVisible" :fullscreen="isFullscreen" persistent max-width="90%">

    <v-card color="grey lighten-4">

      <v-toolbar flat dark color="primary">
        <v-toolbar-title dark>Dane producenta</v-toolbar-title>
        <v-spacer/>
        <v-btn icon @click="toggleFullscreen()">
          <v-icon>check_box_outline_blank</v-icon>
        </v-btn>
        <v-btn icon @click="closeDialog" :disabled="isEditMode">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text v-if="!isSubscriptionReady">
        <LoadingIndicator/>
      </v-card-text>
      <v-card-text v-else>
        <v-container fluid grid-list-lg>

          <v-divider/>

          <v-layout row wrap>
            <v-flex xs12>
              <span class="title">Podstawowe informacje</span>
              <v-btn v-if="isDisabled" color="secondary" depressed @click="toggleEditMode()">edytuj</v-btn>
              <span v-else>
                <v-btn color="secondary" depressed @click="toggleEditMode(false)">anuluj</v-btn>
                <v-btn color="secondary" depressed @click="toggleEditMode(false)">zapisz</v-btn>
              </span>
            </v-flex>

            <v-flex xs12>
              <v-text-field label="Pełna nazwa" box flat :disabled="isDisabled" />
            </v-flex>

            <v-flex xs12 md5>
              <v-text-field label="Ulica" box flat :disabled="isDisabled" />
            </v-flex>
            <v-flex xs12 md2>
              <v-text-field label="Kod pocztowy" box flat :disabled="isDisabled" />
            </v-flex>
            <v-flex xs12 md5>
              <v-text-field label="Miejscowość" box flat :disabled="isDisabled" />
            </v-flex>

            <v-flex xs12>
              <v-text-field label="Dodatkowe informacje" box flat multi-line rows="3" :disabled="isDisabled" />
            </v-flex>
          </v-layout>

          <v-divider/>

          <v-layout row wrap>
            <v-flex xs12 md6>
              <v-text-field label="Data modyfikacji" box flat disabled/>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field label="Data utworzenia" box flat disabled/>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-btn color="secondary" @click="closeDialog" :disabled="isEditMode">zamknij</v-btn>
            <v-btn color="secondary" depressed @click="showDeleteConfirmation" :disabled="isEditMode">usuń</v-btn>
          </v-layout>
        </v-container>
      </v-card-text>

    </v-card>

    <DeleteConfirmationDialog :is-visible.sync="isDeleteConfirmationVisible" :mongo-id="mongoId" title="Usunąć producenta?" />

  </v-dialog>

</template>


<script>
import { formatDate } from "/imports/startup/client/mixins.js";
import DeleteConfirmationDialog from "/imports/ui/components/DeleteConfirmationDialog.vue";
import LoadingIndicator from "/imports/ui/components/LoadingIndicator.vue";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";

export default {
  name: "ManufacturersItemPage",

  props: {
    mongoId: {
      type: String,
      required: false,
      default: ""
    },
    editMode: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  meteor: {
    $subscribe: {
      "manufacturers.one": function subscribe() {
        return [this.mongoId];
      },
      "models.manufacturer.basic": function subscribe() {
        return [this.mongoId];
      },
      "employees.extended": []
    },
    subscribedData() {
      return Manufacturers.findOne({ _id: this.mongoId });
    }
  },

  data() {
    return {
      isVisible: true,
      isFullscreen: this.$vuetify.breakpoint.xs,
      isEditMode: this.editMode,
      isDeleteConfirmationVisible: false
    };
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
    isDisabled() {
      return !this.isEditMode;
    }
  },

  watch: {
    "$vuetify.breakpoint.xs": function setFullscreen(value) {
      if (value) {
        this.toggleFullscreen(true);
      }
    }
  },

  methods: {
    closeDialog() {
      this.isVisible = false;
      // TODO history?
      this.$router.push({
        name: "manufacturers"
      });
    },
    toggleFullscreen(state) {
      this.isFullscreen =
        typeof state === "undefined" ? !this.isFullscreen : state;
    },
    toggleEditMode(state) {
      this.isEditMode = typeof state === "undefined" ? !this.isEditMode : state;
    },
    showDeleteConfirmation() {
      this.isDeleteConfirmationVisible = true;
    }
  },

  mixins: [formatDate],

  components: {
    LoadingIndicator,
    DeleteConfirmationDialog
  }
};
</script>
