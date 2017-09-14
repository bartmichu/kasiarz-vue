import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import { FlowRouter } from "meteor/kadira:flow-router";
import { getAddingModeFromRoute, setEditMode, routeBack } from "/imports/util/client/client-functions.js";
import { manufacturerSchema } from "/imports/api/manufacturers/schema.js";
import "./item_menu_save_T.html";


Template.item_menu_save_T.onCreated(() => {
  Template.instance().isAddingMode = getAddingModeFromRoute();
});


Template.item_menu_save_T.helpers({
  buttonTextH() {
    return Template.instance().isAddingMode ? "zapisz nowy" : "zapisz zmiany";
  },
  buttonStyleH() {
    return Session.get("isDirty") ? "red" : "grey darken-3";
  },
});


Template.item_menu_save_T.events({
  "click #button-save": () => {
    const context = FlowRouter.current().route.group.name;
    let validationContext = null;
    let formData = null;
    switch (context) {
      case "manufacturers": {
        validationContext = manufacturerSchema.newContext("formularz");
        // TODO: odczytaj dane formularza i przypisz do formData
        break;
      }
      default:
        break;
    }

    validationContext.validate(formData);
    if (validationContext.isValid()) {
      if (Template.instance().isAddingMode) {
        Meteor.call(context.concat(".insert"), formData, (error) => {
          if (error) {
            $("#modal-save-error").modal("open");
          } else {
            setEditMode(false);
            routeBack();
          }
        });
      } else {
        Meteor.call(context.concat(".update"), { documentId: FlowRouter.getParam("_id"), formData }, (error) => {
          if (error) {
            $("#modal-save-error").modal("open");
          } else {
            setEditMode(false);
            // TODO: uzupelnijDaneFormularza (aktualizacja daty edycji)
          }
        });
      }
    } else {
      $("#modal-save-error").modal("open");
    }
  },
});
