<template>

  <v-dialog :value="isVisible" :fullscreen="isFullscreen" no-click-animation scrollable persistent max-width="90%">

    <v-card color="grey lighten-4">

      <v-toolbar flat dark :color="getToolbarColor">
        <v-toolbar-title dark>{{ getToolbarTitle }}</v-toolbar-title>
        <v-spacer />
        <!-- TODO: re-enable when Veutify #2201 gets fixed -->
        <!-- <v-btn icon @click="toggleFullscreen()">
          <v-icon>check_box_outline_blank</v-icon>
        </v-btn> -->
        <ItemEditMenu :edit-mode.sync="isEditMode" @cancelChanges="cancelChangesHandler" @saveChanges="saveChangesHandler" />
        <v-btn v-if="$vuetify.breakpoint.xs" icon @click="showDeleteConfirmation" :disabled="isEditMode">
          <v-icon>delete</v-icon>
        </v-btn>
        <v-btn v-else outline @click="showDeleteConfirmation" :disabled="isEditMode">usuń</v-btn>

        <v-btn v-if="$vuetify.breakpoint.xs" icon @click="closeDialog" :disabled="isEditMode">
          <v-icon>close</v-icon>
        </v-btn>
        <v-btn v-else outline @click="closeDialog" :disabled="isEditMode">zamknij</v-btn>
      </v-toolbar>

      <v-card-text v-if="!isSubscriptionReady">
        <LoadingIndicator />
      </v-card-text>
      <v-card-text v-else>
        <v-container fluid grid-list-lg>

          <v-divider />

          <v-layout row wrap>
            <v-flex xs12>
              <span class="title">Podstawowe informacje</span>
            </v-flex>

            <v-flex xs12>
              <TextField :schema="getFieldSchema('nazwa')" :value="subscribedData.nazwa" :disabled="isDisabled" />
            </v-flex>

            <v-flex xs12 md5>
              <TextField :schema="getFieldSchema('ulica')" :value="subscribedData.ulica" :disabled="isDisabled" />
            </v-flex>
            <v-flex xs12 md2>
              <TextField :schema="getFieldSchema('kodPocztowy')" :value="subscribedData.kodPocztowy" :disabled="isDisabled" />
            </v-flex>
            <v-flex xs12 md5>
              <TextField :schema="getFieldSchema('miejscowosc')" :value="subscribedData.miejscowosc" :disabled="isDisabled" />
            </v-flex>

            <v-flex xs12>
              <TextArea :schema="getFieldSchema('dodatkoweInformacje')" :value="subscribedData.dodatkoweInformacje" :disabled="isDisabled" />
            </v-flex>
          </v-layout>

          <div v-if="!addingMode">
            <v-divider class="mt-5" />

            <v-layout row wrap>
              <v-flex xs12>
                <span class="title">Powiązane modele urządzeń</span>
              </v-flex>

              <v-flex v-if="hasRelatedModels" xs12>
                <v-data-table :items="relatedModels" hide-actions hide-headers item-key="_id">
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.nazwa }}</td>
                  </template>
                </v-data-table>
              </v-flex>
              <v-flex v-else>
                <RelatedItemsPlaceholder />
              </v-flex>
            </v-layout>

            <v-divider class="mt-5" />

            <v-layout row wrap>
              <v-flex xs12>
                <span class="title">Powiązani serwisanci</span>
              </v-flex>

              <v-flex v-if="hasRelatedEmployees" xs12>
                <v-data-table :items="relatedEmployees" hide-actions hide-headers item-key="_id">
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.imieNazwisko }}</td>
                  </template>
                </v-data-table>
              </v-flex>
              <v-flex v-else>
                <RelatedItemsPlaceholder />
              </v-flex>
            </v-layout>

            <v-divider class="mt-5" />

            <v-layout row wrap>
              <v-flex xs12>
                <span class="title">Metadane</span>
              </v-flex>

              <v-flex xs12 md6>
                <TextField :schema="getFieldSchema('dataUtworzenia')" :value="subscribedData.dataUtworzenia | formatDateLong" />
              </v-flex>
              <v-flex xs12 md6>
                <TextField :schema="getFieldSchema('dataModyfikacji')" :value="subscribedData.dataModyfikacji | formatDateLong " />
              </v-flex>
            </v-layout>
          </div>
        </v-container>
      </v-card-text>

    </v-card>

    <DeleteConfirmationDialog :is-visible.sync="isDeleteConfirmationVisible" :mongo-id="mongoId" title="Usunąć producenta?" @itemDeleted="closeDialog" />

    <EditErrorDialog :is-visible.sync="isErrorDialogVisible" />

  </v-dialog>

</template>


<script>
import DeleteConfirmationDialog from "/imports/ui/components/DeleteConfirmationDialog.vue";
import EditErrorDialog from "/imports/ui/components/EditErrorDialog.vue";
import ItemEditMenu from "/imports/ui/components/ItemEditMenu.vue";
import LoadingIndicator from "/imports/ui/components/LoadingIndicator.vue";
import manufacturerDummy from "/imports/api/manufacturers/dummy.js";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
import { Meteor } from "meteor/meteor";
import Models from "/imports/api/models/models.js";
import Employees from "/imports/api/employees/employees.js";
import RelatedItemsPlaceholder from "/imports/ui/components/RelatedItemsPlaceholder.vue";
import TextField from "/imports/ui/components/form_controls/TextField.vue";
import TextArea from "/imports/ui/components/form_controls/TextArea.vue";

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
    },
    addingMode: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  meteor: {
    subscribedData() {
      return this.addingMode
        ? manufacturerDummy
        : Manufacturers.findOne({ _id: this.mongoId });
    },
    relatedModels() {
      return Models.find();
    },
    relatedEmployees() {
      const models = Models.find({}, { fields: { _id: 1 } }).map(
        model => model._id
      );
      return Employees.find({ "uprawnienia.modele": { $in: models } });
    }
  },

  data() {
    return {
      isVisible: true,
      // TODO: re-enable when Veutify #2201 gets fixed
      // isFullscreen: this.$vuetify.breakpoint.xs,
      isFullscreen: true,
      isEditMode: this.addingMode || this.editMode,
      isDeleteConfirmationVisible: false,
      isErrorDialogVisible: false,
      collectionSchema: Manufacturers.simpleSchema()
    };
  },

  computed: {
    isSubscriptionReady() {
      if (this.addingMode) {
        return true;
      }
      return (
        // TODO: refactor
        this.$subReady["manufacturers.one"] &&
        this.$subReady["models.manufacturer.basic"] &&
        this.$subReady["employees.extended"]
      );
    },
    isDisabled() {
      return !this.isEditMode;
    },
    hasRelatedModels() {
      return this.relatedModels.length > 0;
    },
    hasRelatedEmployees() {
      return this.relatedEmployees.length > 0;
    },
    getToolbarColor() {
      return this.isEditMode === true ? "red" : "primary";
    },
    getToolbarTitle() {
      if (this.addingMode === true) {
        return this.$vuetify.breakpoint.xs === true
          ? "Nowy producent"
          : "Dane nowego producenta";
      }

      return this.$vuetify.breakpoint.xs === true
        ? "Producent"
        : "Dane producenta";
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
    },
    showEditErrorDialog() {
      this.isErrorDialogVisible = true;
    },
    getFieldSchema(fieldName) {
      return this.collectionSchema.getDefinition(fieldName);
    },
    cancelChangesHandler() {
      if (this.INITIAL_EDIT_MODE || this.addingMode) {
        this.closeDialog();
      } else {
        // TODO: reset form data
        this.toggleEditMode(false);
      }
    },
    saveChangesHandler() {
      const { methodPrefix } = this.$router.currentRoute.meta.methodPrefix;
      const validationContext = this.collectionSchema.newContext("form");
      const foo = this.collectionSchema.clean({});

      validationContext.validate(foo);
      if (validationContext.isValid()) {
        Meteor.call(
          methodPrefix.concat(".update"),
          { documentId: this.mongoId, foo },
          error => {
            if (error) {
              this.showEditErrorDialog();
            } else if (this.INITIAL_EDIT_MODE || this.addingMode) {
              this.closeDialog();
            } else {
              this.toggleEditMode(false);
            }
          }
        );
      } else {
        this.showEditErrorDialog();
      }
    }
  },

  components: {
    EditErrorDialog,
    LoadingIndicator,
    DeleteConfirmationDialog,
    ItemEditMenu,
    RelatedItemsPlaceholder,
    TextField,
    TextArea
  },

  created() {
    if (this.editMode) {
      this.INITIAL_EDIT_MODE = true;
    } else {
      this.INITIAL_EDIT_MODE = false;
    }

    if (this.addingMode === false) {
      this.$subscribe("manufacturers.one", this.mongoId);
      this.$subscribe("models.manufacturer.basic", this.mongoId);
      this.$subscribe("employees.extended");
    }
  }
};
</script>
