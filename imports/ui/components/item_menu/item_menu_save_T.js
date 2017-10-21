import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import { FlowRouter } from "meteor/kadira:flow-router";
import { getAddingModeFromRoute, setEditMode, routeBack, getFormValues, setFormValues } from "/imports/util/client/client-functions.js";
import Manufacturers from "/imports/api/manufacturers/manufacturers.js";
import Models from "/imports/api/models/models.js";
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
    let collection = null;
    let formData = null;
    switch (context) {
      case "manufacturers": {
        collection = Manufacturers;
        break;
      }
      case "models": {
        collection = Models;
        break;
      }
      default:
        break;
    }

    validationContext = collection.simpleSchema().newContext("formularz");
    formData = getFormValues(collection.simpleSchema());

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
            setFormValues(collection.simpleSchema(), collection.findOne({ _id: FlowRouter.getParam("_id") }));
          }
        });
      }
    } else {
      $("#modal-save-error").modal("open");
    }
  },
});
